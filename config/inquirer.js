const inquirer = require('inquirer');
const {
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees
} = require('./config/queries.js');

const mainMenu = async () => {
    const { action } = await inquirer.createPromptModule({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Exit'
        ]
    });

    switch (action) {
        case 'View All Departments':
            const departments = await viewAllDepartments();
            console.log('Departments:');
            departments.rows.forEach(dept => console.log(`${dept.id}: ${dept.name}`));
            break;

        case 'View All Roles':
            const roles = await viewAllRoles();
            console.log('Roles:');
            roles.rows.forEach(role =>(`${role.id}: ${role.title} - ${role.salary} - ${role.department}`));
            break;
        
        case 'View All Employees':
            const employees = await viewAllEmployees();
            console.log('Employees:');
            employees.rows.forEach(emp => console.log(`${emp.id}: ${emp.first_name} ${emp.last_name} - ${emp.title} - ${emp.department} - ${emp.salary} - ${emp.manager || 'None'}`));
            break;

        case 'Add Department':
            const { name } = await inquirer.prompt({
                type: 'input',
                name: 'name',
                message: 'Enter the name of the department:',
            });
            const addDeptResult = await addDepartment(name);
            console.log('Department added successfully:', addDeptResult.rows[0]);
            break;

        case 'Add Role':
            const departmentsList = (await viewAllDepartments()).rows.map(dept => ({
                name: dept.name,
                value: dept.id
            }));
            const { title, salary, departmentId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the title of the role:',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary for this role:',
                },
                {
                    type: 'list',
                    name: 'departmentId',
                    message: 'Selct the department for this role:',
                    choices: departmentsList,
                },
            ]);
            const addROleResult = await addRole(title, salary, departmentId);
            console.log('Role added successfully:', addRoleResult.rows[0]);
            break;

        case
    }
}