const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer');
const { default: test } = require('node:test');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: test
})

connection.query()

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'is this working?'
        }
    ]);
};

const init = () => {
    promptUser()
};

init()

