const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer');
const cTable = require('console.table');
const e = require('express');

// create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db',
});

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
        `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ' ,m.last_name) AS Manager
        FROM employee e 
        LEFT JOIN employee m 
        ON e.manager_id = m.id
        JOIN role
        ON e.role_id = role.id
        JOIN department
        ON role.department_id = department.id;`,
        function(err, results){
            console.table(results)
            promptUser()
        }
    )
};

// add employee prompts
function addEmployee() {
    let roleChoices = []
    let roleChoicesId = []

    let managerChoices = []
    let managerChoicesId = []
    connection.query(
        `SELECT employee.id, first_name, last_name, title, role.id FROM employee
        JOIN role ON employee.role_id = role.id; `,
        (err, results) => {
            if(err) {
                console.log(err)
            } 
            managerChoices = results
            managerChoicesId = managerChoices.map(element=> {
                return {name: `${element.first_name} ${element.last_name}`, value: element.id}
            })
            managerChoicesId.unshift({name:"none", value:null});
            connection.query(
            `SELECT id, title
            FROM role;`, 
            (err,results) => {
                if(err) {
                    console.log(err)
                }
                roleChoices = results
                roleChoicesId = roleChoices.map(element => {
                    return {name: element.title, value: element.id}
                })
        
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
                    type: 'list',
                    name: 'roleChoice',
                    message: 'What is the employees role?',
                    choices: roleChoicesId
                },
                {
                    type: 'list',
                    name: 'managerChoice',
                    message: 'Who is the employees manager?',
                    choices: managerChoicesId
                },
            ])
            .then((answers) => {
                addEmployeeDb(answers.first, answers.last, answers.roleChoice, answers.managerChoice)
            })
            .then(() => {
                promptUser()
            }) 
        })
    })
};

//add employee to database
function addEmployeeDb(firstName, lastName, employeeRole, employeeManager) {
    connection.promise().query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)', [firstName, lastName, employeeRole, employeeManager], 
        function(err, results){
            console.log(results)
        }
    )
};

//updates employee
function updateRole() {
    let roleChoices = []
    let roleChoicesId = []

    let employeeChoices = []
    let employeeChoicesId = []

    connection.query(
        `SELECT employee.id, first_name, last_name, title, role.id 
        FROM employee
        JOIN role ON employee.role_id = role.id;`,
        (err,results) => {
            if (err) {
                console.log(err);
            }
            employeeChoices = results
            employeeChoicesId = employeeChoices.map(element => {
                return {name: `${element.first_name} ${element.last_name}`,
                    value: element.id}
            })
            connection.query(
                `SELECT id, title
                FROM role;`, 
                (err,results) => {
                    if(err) {
                        console.log(err)
                    }
                    roleChoices = results
                    roleChoicesId = roleChoices.map(element => {
                        return {name: element.title, value: element.id}
                    })
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeName',
                    message: 'What is the namke of the employee?',
                    choices: employeeChoicesId
                },
                {
                    type: 'list',
                    name: 'roleChoice',
                    message: 'What is the employees new role?',
                    choices: roleChoicesId
                },
            ])
            .then((answers) => { 
                updateEmployeeDb(answers.roleChoice, answers.employeeName)
            })
            .then(() => {
                promptUser()
            })
        })    
        }
    )
};

// add updated info to database
function updateEmployeeDb(newRole, employeeName) {
    connection.promise().query(`UPDATE employee SET role_id = ? WHERE id = ?`, [newRole, employeeName],
    function(err,results){
        console.log(results)
        }
    )
};

//init function
const init = () => {
    promptUser()
};

init()