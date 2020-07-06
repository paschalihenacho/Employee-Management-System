CREATE DATABASE IF NOT exists employees_db;

USE employees_db;

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL, 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL, 
    title VARCHAR(30),
    salary DECIMAL(7,2),
    department_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL, 
    name VARCHAR(30),
    PRIMARY KEY(id)
);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Paschal", "Ihenacho", 11, 22);

INSERT INTO department (name) VALUES ("Technology");

INSERT INTO role (title, salary, department_id) VALUES ("Jr. Developer", 100000.00, 33);
SELECT * FROM employee LIMIT 0, 1000
