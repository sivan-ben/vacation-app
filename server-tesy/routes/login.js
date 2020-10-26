const express = require("express")
const router = express.Router();
const pool = require('../database/pool');
const bcrypt = require('bcryptjs');
const salt = "$2a$08$rqcFcjwJ2cmaXxHsGBz3Hu";
const jwt = require('jsonwebtoken')




router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await isUserExist(username, password)
        if (!user) return res.json("err")
        const jwtToken = await getJwt({ ...user, password: null })
        return res.json({ message: "redirect", token: jwtToken, redirect: true, user: { ...user, password: null } })
    } catch (error) {
        return res.json("err")
    }
})


router.post('/register', async (req, res, next) => {
    const { first_name, last_name, username, password } = req.body
    if (!first_name, !last_name, !username, !password) throw new Error
    const user = await isUserExist(username, password)
    if (user) return res.json({ message: "user already exist" })
    const insertUser = await saveUser(req.body)
    if (insertUser) return res.json({ message: "user saved!", redirect: true, user })
})



router.get('/getuser', async (req, res) => {
    try {
        const { authorization } = req.headers;
        const verifyTOken = await jwt.verify(authorization, process.env.SECRET);
        const [result] = await pool.execute(getUserByIdQuery(), [verifyTOken.id]);
        const [vacations] = await pool.execute(getVacations());
        const [user] = result;
        return res.json({ user, vacations })
    } catch (err) {
        console.log('getuser err', err.message)
        return res.status(500).json("err")
    }
})

module.exports = router;


async function isUserExist(username, password) {
    const payload = password ? [username, bcrypt.hashSync(password, salt)] : [username]
    const query = password ? getUserPasswordExistQuery() : getUserExistQuery()
    const [result] = await pool.execute(query, payload)
    const [firstUser] = result;
    return firstUser;
}



function getVacations() {
    return "SELECT * FROM vacations.vacation"
}

function getUserExistQuery() {
    return "SELECT * FROM vacations.users where username = ?";
}

function getUserPasswordExistQuery() {
    return "SELECT * FROM vacations.users where username = ? and password = ?";
}

function getUserByIdQuery() {
    return "SELECT * FROM vacations.users where id = ?";
}

async function saveUser(payload) {
    const { username, password, first_name, last_name } = payload
    const [result] = await pool.execute(getUserInsertionQuery(), [username, bcrypt.hashSync(password, salt), first_name, last_name])
    return result.insertId
}

function getUserInsertionQuery() {
    return "INSERT INTO vacations.users (`username`, `password`, `first_name`, `last_name`) VALUES (?,?,?,?)"

}

function getJwt(p) {
    return new Promise((resolve, reject) => {
        jwt.sign(p, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) reject("error")
            resolve(token)
        })
    })
}