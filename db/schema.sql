DROP DATABASE IF EXISTS e,ployee_db;
CREATE DATABASE employee_db;

\c employee_db

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

