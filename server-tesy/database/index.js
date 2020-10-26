const mysql2 = require('mysql2')
const { HOST, DB_PORT, USER, PASSWORD, DATABASE } = process.env

console.log(HOST,DB_PORT,USER,PASSWORD,DATABASE);

const connaction = mysql2.createConnection({
    host: HOST,
    port: DB_PORT,
    user: USER,
    password: PASSWORD,
    database: DATABASE
})

module.exports = connaction;