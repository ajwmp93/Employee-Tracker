const express = require('express');
const inquirer = require('inquirer');
const {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
} = require('./config/queries.js');

const app = express();
const port = 3000;

app.use(express.json());

