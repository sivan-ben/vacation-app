const express = require("express");
const api = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require('cors')
const db = require('./database/index');
const checkEnvParams = require('./validations/checkEnvParams')
const route = require('./routes/login')
const vacationRoute = require('./routes/vacation')
const admin = require('./routes/admin')


api.use(cors())
api.use(bodyParser.json());
checkEnvParams()

db.connect(() => {
    console.log("connected to database");
})

api.use(route)
api.use(vacationRoute)
api.use(admin)


api.listen(process.env.PORT, err => {
    if (err) console.log(err.message);
    console.log(`Api listening to porth: ${process.env.PORT} `);
});