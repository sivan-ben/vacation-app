const express = require("express")
const router = express.Router();
const pool = require('../database/pool');
const jwt = require('jsonwebtoken')

router.use(async (req, res, next) => {
    try {
        const { authorization } = req.headers
        const verifayToken = await jwt.verify(authorization, process.env.SECRET)
        if (!verifayToken.admin) throw new Error('user is not admin')
        req.param = verifayToken
    } catch (error) {
        res.status(500).json({ err: error.message, message: "error" })
    }
    next()
})

router.get('/admin', async (req, res, next) => {
    try {
        const { param } = req
        const [result] = await pool.execute(getVacations());
        if (!result) {
            throw new Error('error')
        }
        res.json({ err: null, message: "vacations from dataBase", result, param })
    } catch (error) {
        res.status(500).json({ err: error.message, message: "error" })
    }
})


router.post('/saveVacation', async (req, res, next) => {
    try {
        const { destination, description, depart, returnn, price, picture } = req.body
        if (!destination || !description || !depart || !returnn || !price || !picture) throw new Error
        const addVacation = await AddVacation(req.body)
        res.json({ message: "vacation save", redirect: true })
    } catch (error) {
        res.json({ err: error.message, message: "vacation not save" })
    }
})

router.put('/editVacation', async (req, res, next) => {
    try {
        const userId = req.param
        const { destination, description, depart, returnn, price, followers, picture } = req.body
        await editVacation(req.body)
        const [vacations] = await pool.execute(getVacationsEdit(), [userId.id])
        res.json({ message: "vacation save", redirect: true, vacations })
    } catch (error) {
        res.json({ err: error.message, message: "vacation not save" })
    }
})


router.delete('/deleteVacation', async (req, res, next) => {
    try {
        const { vacationId } = req.body
        const result = await pool.execute(deleteVacation(), [vacationId]);
        if (!result) {
            throw new Error('error')
        }
        const [vacations] = await pool.execute(getVacations())
        res.json({ err: null, message: "vacation delete", result, redirect: true, vacations })
    } catch (error) {
        res.json({ err: error.message, message: "error" })
    }
})


module.exports = router;

function getVacations() {
    return "SELECT * FROM  vacations.vacation ";
}

function getVacationsEdit() {
    return ` SELECT  *   FROM vacations.vacation
left join vacations.followers 
on  followers.vacation_id = vacation.id and followers.user_id = ?
Order by user_id desc`;
}
async function AddVacation(payload) {
    const { destination, description, depart, returnn, price, picture } = payload
    await pool.execute(getVacationInsertionQuery(), [destination, description, depart, returnn, price, picture])

}

async function editVacation(payload) {
    const { destination, description, depart, returnn, price, picture, id } = payload
    await pool.execute(getEditVacation(), [destination, description, new Date(depart), new Date(returnn), price, picture, id])

}

function getEditVacation() {
    return "UPDATE `vacations`.`vacation` SET `destination` = ?, `description` = ?, `depart` = ?, `return` = ?, price = ? , `picture` = ? WHERE (`id` = ?)"
}

function getVacationInsertionQuery() {
    return "INSERT INTO `vacations`.`vacation` (`destination`, `description`, `depart`, `return`, `price`, `followers`, `picture`) VALUES (?,?,?,?,?,0,?)"
}

function deleteVacation() {
    return " DELETE FROM `vacations`.`vacation` WHERE id= ?"
}

