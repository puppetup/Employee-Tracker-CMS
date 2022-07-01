const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer');
const { default: test } = require('node:test');

connection.query();

// Function that stores inquirer questions
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'function',
            choices: ['View all Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
        }
    ]);
};

// create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: test
});



//init function
const init = () => {
    promptUser()
};

init()