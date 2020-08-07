const db = require("./db");
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
const connection = require("./db");

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


function addDepartment() {
  inquirer
    .prompt({
      name: "department_name",
      type: "input",
      message: "What department would you like to add"
    })
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          department_name: answer.department_name
        },
        function (err) {
          if (err) throw err;
          console.log("department added!");
          // re-prompt the user 
          init();
        }
      );
    });
  }
  function addRole() {
    inquirer
      .prompt([{
        name: "title",
        type: "input",
        message: "What is the title of role you would like to add?"
      }, {
        name: "salary",
        type: "decimal",
        message: "What is the salary for the role?"
      }])
      .then(function (answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.title,
            salary: answer.salary
          },
          function (err) {
            if (err) throw err;
            console.log("Role added!");
            // re-prompt the user 
            init();
          }
        );
      });

  };

  function addEmployee() {
    // prompt for info about the employee they are adding
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employees first name?"
        }, {
          name: "last_name",
          type: "input",
          message: "What is the employees last name??"
        }

      ])
      .then(function (answer) {
        // when finished prompting, insert a new employee into the db with their info
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name
          },
          function (err) {
            if (err) throw err;
            console.log("Employee added!");
            // re-prompt the user 
            init();
          }
        );
      });
  }
  function viewDepartment() {
    connection.query(
      "SELECT * FROM department",
      function (err, res) {
        if (err) throw err;
        console.table(res)
        // re-prompt the user 
        init();
      }
    );
  };
  function viewRole() {
    connection.query(
      "SELECT * FROM role",
      function (err, res) {
        if (err) throw err;
        console.table(res)
        // re-prompt the user 
        init();
      }
    );
  };
  function viewEmployee() {
    connection.query(
      "SELECT * FROM employee",
      function (err, res) {
        if (err) throw err;
        console.table(res)
        // re-prompt the user 
        init();
      }
    );
  };
  function exitApplication(){
    connection.end();
  }
  init();