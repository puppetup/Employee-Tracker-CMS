const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer');


// connection.query();

// Function that stores inquirer questions
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'function',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
        },

    ])
    .then((answer) => {
        switch (answer.choice) {
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Quit':
                break;
                
        }
    });
};



// create connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'employee_db',
// });



//init function
const init = () => {
    promptUser()
};

init()