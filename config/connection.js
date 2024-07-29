const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    database: 'employee_db',
    password: 'Bootcamp!',
    port: 5432,
});

client.connect();

module.exports = client;