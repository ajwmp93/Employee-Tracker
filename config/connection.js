const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    database: 'employee_db',
    password: 'Bootcamp!',
    port: 5432,
});

client.connect();

const viewAllDepartments = () => {
    return client.query('SELECT * FROM departments');
};

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

