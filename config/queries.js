const client = require('./config/connection.js');

const viewAllRoles = () => {
    return client.query(`
        SELECT roles.id, roles.title, roles.salary, departments.name AS department
        FROM roles
        JOIN departments ON roles.department_id = departments.id
        `);
};

const viewAllEmployees = () => {
    return client.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary,
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager
         FROM employees
         JOIN roles ON employees.role_id = roles.id
         JOIN departments ON roles.department_id = departments.id
         LEFT JOIN employees manager ON employees.manager_id = manager.id
    `);
    
};

const addDepartment = (name) => {
    return client.query('INSERT INTO departments (name) VALUES ($1) RETURNING *', [name]);
};

const addRole = (title, salary, departmentId) => {
    return client.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, departmentId]);
};

const addEmployee = (firstName, lastName, roleId, managerId) => {
    return client.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [firstName, lastName, roleId, managerId]);
};

const updateEmployeeRole = (employeeId, roleId) => {
    return client.query('UPDATE employees SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
};

const viewAllDepartments = () => {
    return client.query('SELECT * FROM departments');
};

module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};
