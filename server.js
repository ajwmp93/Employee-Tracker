const express = require('express');
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

app.post('/roles', async (req, res) => {
    try {
        const { title, salary, departmentId } = req.body;
        const result = await addRole(title, salary, departmentId);
        res.json({
            message: 'Role added successfully',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error adding role:', error);
    }
})

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

app.get('/departments', async (req, res) => {
    try {
        const result = await viewAllDepartments();
        res.json({
            message: 'Success',
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching departments:', error);
    }
});

app.get('/roles', async (req, res) => {
    try {
        const result = await viewAllRoles();
        res.json({
            message: 'Success',
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching roles:', error);
    }
});

app.get('/employees', async (req, res) => {
    try {
        const result = await viewAllEmployees();
        res.json({
            message: 'Success',
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching emplyees:', error);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});