const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employees_db'
});


connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    Questions();
});

const Questions = () => {
    inquirer
        .prompt({
            name: "first-question",
            type: "list",
            message: "What would you like to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add employee", "Update employee role", "Remove employee", "exit"]
        }).then(answer => {
            switch (answer["first-question"]) {
                case "View all departments":
                    viewAllDepartments();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "Update employee role":
                    updateEmployeeRole();
                    break;
                case "Remove employee":
                    removeEmployee();
                    break;
                case "exit":
                    connection.end();
                    break;
                default:
                    break;
            }
        })
};

const viewAllDepartments = () => {
    connection.query("SELECT id, name FROM department", (err, res) => {
      if (err) throw err;
      console.table(res);
      Questions();
    });
  };

const viewAllRoles = () => {
    connection.query("SELECT id, title, salary FROM role", (err, res) => {
      if (err) throw err;
      console.table(res);
      Questions();
    });
  };

const viewAllEmployees = () => {
    connection.query("SELECT id, first_name, last_name, role_id, manager_id FROM employee", (err, res) => {
      if (err) throw err;
      console.table(res);
      Questions();
    });
  };

const addEmployee = () => {

    connection.query("SELECT * FROM role;", (err, res) => {

        if (err) throw err;
        const roles = [];

        res.forEach(r => {
            roles.push(`${r.id} ${r.title}`)
        });

        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "Enter first name"
            },
            {
                name: "last_name",
                type: "input",
                message: "Enter last name"

            },
            {
                name: "roles",
                type: "list",
                message: "Choose their role",
                choices: roles
            },
            {
                name: "role_id",
                type: "input",
                message: "Enter role ID (# listed before name of role)"
            },
            {
                name: "manager_id",
                type: "input",
                message: "Enter manager ID"
            }
        ]).then(answer => {

            const { first_name, last_name, role_id, manager_id } = answer;

            const query = "INSERT INTO employee (`first_name`,`last_name`, `role_id` ) VALUES (?, ?, ?);"
            connection.query(query, [first_name, last_name, role_id], (err, res) => {
                if (err) throw err;
                console.log("Employee sucessfully added")
                Questions();
            })
        });
    })

};

const updateEmployeeRole = () => {

    const employeeQuery = "SELECT * FROM `employee`;";
    const roleQuery = "SELECT * FROM `role`;";
    const updateQuery = "UPDATE employee SET `role_id` = ? WHERE `id` = ?;"
    const employees = [];
    const roles = [];

    connection.query(employeeQuery, (err, res) => {

        res.forEach(r => {
            employees.push(`${r.id} ${r.first_name} ${r.last_name}`)
        });

        if (err) throw err;

        connection.query(roleQuery, (err, res) => {

            res.forEach(r => {
                roles.push(`${r.id} ${r.title} ${r.salary}`)
            });

            inquirer.prompt([
                {
                    name: "remove",
                    type: "list",
                    message: "Who's role would you like to update?",
                    choices: employees
                },
                {
                    name: "employeeId",
                    type: "input",
                    message: "Enter their ID number (# listed before name)"
                },
                {
                    name: "roles",
                    type: "list",
                    choices: roles,
                    message: "Choose their new role"
                },
                {
                    name: "roleId",
                    type: "input",
                    message: "Enter ID number of role (# listed before name)"
                }
            ]).then(answer => {

                connection.query(updateQuery, [answer.roleId, answer.employeeId], (err, res) => {
                    if (err) throw err;
                    console.log("Employee role updated!");
                    Questions();
                })
            });

        });
    });
};

const removeEmployee = () => {
    const query = "SELECT * FROM `employee`;";

    connection.query(query, (err, res) => {

        const employees = [];

        res.forEach(r => {
            employees.push(`${r.id} ${r.first_name} ${r.last_name}`)
        })

        if (err) throw err;
        inquirer.prompt([
            {
                name: "remove",
                type: "list",
                message: "Who would you like to remove?",
                choices: employees
            },
            {
                name: "id",
                type: "input",
                message: "Enter ID number (# listed before name)"
            }
        ]).then(answer => {
            const query = "DELETE FROM employee WHERE id=?;";
            connection.query(query, [answer.id], (err, res) => {
                if (err) throw err;
                console.log("Employee succesfully deleted");
                Questions();
            })
        })
    });

};