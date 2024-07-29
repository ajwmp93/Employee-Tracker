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

app.post('/departments', async (req, res) => {
    try {
        const { name } = req.body;
        const result = await addDepartment(name);
        res.json({
            message: 'Department added successfully',
            data: result.rows[0]
        });
    }catch (error) {
        console.error('Error adding department:', error);
    }
});

app.post('/employees', async (req, res) => {
    try {
        const { firstName, lastName, roleId, managerId } = req.body;
        const result = await addEmployee(firstName, lastName, roleId, managerId);
        res.json({
            message: 'Employee added successfully',
            data: result.rows[0]
        });
    }catch (error) {
        console.error('Error adding employee:', error);
    }
});

app.put('/employees/:id/role', async (req, res) => {
    try {
        const employeeId = parseInt(req.params.id, 10);
        const { roleId } = req.body;
        await updateEmployeeRole(employeeId, roleId);
        res.json({
            message: 'Employee role updated successfully'
        });
    } catch (error) {
        console.error('Error updating employee role', error);
    }
});

