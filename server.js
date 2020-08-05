const db = require("./db");
var mysql = require("mysql");
var inquirer = require("inquirer");

function init() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add a department",
                "Add a role",
                "Add an employee",
                "View a department",
                "View a role",
                "View an employee",
                "Update an employee role",
                "Exit Application"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add a department":
                    addDepartment();
                    break;

                case "Add a role":
                    addRole();
                    break;

                case "Add an employee":
                    addEmployee();
                    break;

                case "View a department":
                    viewDepartment();
                    break;

                case "View a role":
                    viewRole();
                    break;

                case "View an employee":
                    viewEmployee();
                    break;

                case "Update an employee role":
                    updateRole();
                    break;

                case "Exit application":
                    exitApplication();
                    break;
            }
        });
}
