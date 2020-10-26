const express = require("express")
const vacationRoute = express.Router();
const pool = require('../database/pool');
const jwt = require('jsonwebtoken')

vacationRoute.use(async (req, res, next) => {
    try {
        const { authorization } = req.headers
        const verifayToken = await jwt.verify(authorization, process.env.SECRET)
        if (!verifayToken) throw new Error('user is not admin')
        req.user = verifayToken
    } catch (error) {
        res.status(500).json({ err: error.message, message: "error" })
    }
    next()
})

vacationRoute.get('/vacations', async (req, res, next) => {
    try {
        const { user } = req
        const [result] = await pool.execute(getVacations(), [user.id]);
        if (!result) {
            throw new Error('error')
        }
        res.json({ err: null, message: "vacations from dataBase", result })
    } catch (error) {
        res.json({ err: error.message, message: "error" })
    }
});

vacationRoute.post('/addFolow', async (req, res, next) => {
    try {
        const { user } = req
        const { vacationId } = req.body
        const result = await addFolow(vacationId, user.id)
        if (!result) {
            throw new Error
        }
        const [vacations] = await pool.execute(getVacations(), [user.id])
        res.json({ err: null, message: "add followe", result, redirect: true, vacations })
    } catch (error) {
        res.json({ err: error.message, message: "error" })
    }
});


module.exports = vacationRoute;

function getVacations() {
    return ` SELECT  *   FROM vacations.vacation
left join vacations.followers 
on  followers.vacation_id = vacation.id and followers.user_id = ?
Order by user_id desc`;
}

async function addFolow(vacationId, verifyTOken) {
    const [isFallowe] = await pool.execute(isFollowe(), [verifyTOken, vacationId])
    const [first] = isFallowe
    if (!first) {
        await pool.execute(addRowFolloweTable(), [verifyTOken, vacationId])
        return await pool.execute(onePluse(), [vacationId])

    } else {
        const delRow = await pool.execute(deleteVacationFollowe(), [verifyTOken, vacationId])
        return await pool.execute(oneMinus(), [vacationId])
    }
}

function onePluse() {
    return `UPDATE vacations.vacation 
    SET followers = followers + 1
    WHERE id = ?`;
}
function oneMinus() {
    return `UPDATE vacations.vacation 
    SET followers = followers - 1
    WHERE id = ?`;
}
function addRowFolloweTable() {
    return "INSERT INTO `vacations`.`followers` (`user_id`, `vacation_id`) VALUES (?, ?)"
}


function isFollowe() {
    return "SELECT * FROM vacations.followers where user_id= ? and vacation_id=?"
}

function deleteVacationFollowe() {
    return "DELETE FROM `vacations`.`followers` where user_id= ? and vacation_id=?"
}