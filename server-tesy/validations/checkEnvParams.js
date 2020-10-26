
const express = require("express");

function checkEnvParams() {

    const { PORT } = process.env;
    if (!PORT) {
        console.log('\x1b[33m%s\x1b[0m', "missing env params");

    }

}

module.exports = checkEnvParams 