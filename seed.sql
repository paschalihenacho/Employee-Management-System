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
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL, 
    name VARCHAR(30),
    PRIMARY KEY(id)
);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
("Paschal", "Ihenacho", 11, 0), 
("Nancy", "Ward", 12, 23), 
("Frank", "Perez", 13, 24), 
("Susan", "More", 14, 0),
("John", "Doe", 15, 0);

INSERT INTO department (name) VALUES 
("Technology"),
("Sales"),
("Finance"),
("Technology"),
("HR");

INSERT INTO role (title, salary, department_id) VALUES 
("Jr. Developer", 86000.00, 1),
("Lead Salesman", 65000.00, 2),
("Manager", 88000.00, 3),
("QA", 70000.00, 4),
("HR Associate", 65000.00, 5);
SELECT * FROM employee LIMIT 0, 1000
