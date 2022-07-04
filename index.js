const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer');
const cTable = require('console.table');

// Function that stores inquirer questions
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
        },

    ])
    .then((answer) => {
        switch (answer.choice) {
            case 'View All Employees': // completed
                viewEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            case 'View All Roles': //completed
                viewRoles();
                break;
            case 'Add Role': 
                addRole();
                break;
            case 'View All Departments': //completed
                viewDepartments();
                break;
            case 'Add Department': //completed
                addDepartment();
                break;
            case 'Quit':
                break;
                
        }
    });
};

// create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db',
});

// show all dept
function viewDepartments() {
    connection.query(
        'SELECT * FROM department',
        function(err, results){
            console.table(results)
            promptUser()
        }
    )
    
};

// prompt user to enter name of dept.
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
        },
    ])
    .then((department) => {
        addDepartDb(department.name)
    })
    .then(() => {
        promptUser()
    })    
};

// query to add dpt to sql 
function addDepartDb(dpName) {
    connection.promise().query(
        'INSERT INTO department (name) VALUE (?)', dpName, 
        function(err, results){
            console.log(results)
        }
    )
};

// show all roles
function viewRoles() {
    connection.query(
        'SELECT * FROM role',
        function(err, results){
            console.table(results)
            promptUser()
        }
    )
};

// prompt user to enter  title, salary, and dept for new role
function addRole() {
    let departmentNames = [];
    let departmentNamesId = [];

    connection.query(
        'SELECT id, name FROM department',
        (err, results) => {
            if(err) {
                console.log(err)
            } 
            departmentNames = results
            departmentNamesId = departmentNames.map(element => {
                return {name: element.name, value: element.id}
            });   

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is the name of the role?',
                },
                {
                    type: 'number',
                    name: 'salary',
                    message: 'What is the salary for this role?',
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'What department does this role belong to?',
                    choices: departmentNamesId
                },
            ])
            .then((answers) => {
                addRoleDb(answers.title, answers.salary, answers.department)
            })
            .then(() => {
                promptUser()
            }) 

        }
    )
};

// // add the role to sql
function addRoleDb(roleName, roleSalary, dptId) {
    connection.promise().query(
        'INSERT INTO role (title, salary, department_id) VALUE (?, ?, ?)', [roleName, roleSalary, dptId],
        function(err, results){
            console.log(results)
        }
    )
};

// view all employees
function viewEmployees() {
    connection.query(
        'SELECT * FROM employee',
        function(err, results){
            console.table(results)
            promptUser()
        }
    )
};

// add employee prompts
function addEmployee() {
    let departmentNames = []

    connection.query(
        'SELECT name FROM department',
        (err, results) => {
            if(err) {
                console.log(err)
            } 
            departmentNames = results.map( a => a.name )

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first',
                    message: 'What is the first name of the employee?',
                },
                {
                    type: 'input',
                    name: 'last',
                    message: 'What is the last name of the employee?',
                },
                {
                    type: 'number',
                    name: 'role',
                    message: 'What is the employees role?',
                },
                {
                    type: 'list',
                    name: 'Manager',
                    message: 'Who is the employees manager?',
                    choices: departmentNames,
                },
            ])
            .then((answers) => {
                addRoleDb(answers.title, answers.salary, answers.department)
            })
            .then(() => {
                promptUser()
            }) 

        }
    )
};

//init function
const init = () => {
    promptUser()
};

init()