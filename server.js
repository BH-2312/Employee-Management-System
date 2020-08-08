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
        "View departments",
        "View roles",
        "View employees",
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

        case "View departments":
          viewDepartment();
          break;

        case "View roles":
          viewRole();
          break;

        case "View employees":
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

  var departments = [];
  var departInfo = [];

  connection.query(`SELECT * FROM department`, function (err, res) {
    if (err) throw err;

    for (let i = 0; i < res.length; i++) {
      const department = res[i];

      departments.push(department.department_name);
      console.log(departments);
      departInfo.push(department);
      console.log(departInfo);

    }
    inquirer.prompt([
      {
        name: "department_select",
        type: "list",
        message: "What is the department the role is in?",
        choices: departments
      }, {
        name: "salary",
        type: "number",
        message: "What is the salary of the role?"
      }, {
        name: "title",
        type: "input",
        message: "What is the title of role you would like to add?"
      }
    ])
      .then(function (answer) {
        var departmentId = "";
        for (let i = 0; i < departInfo.length; i++) {
          if (answer.department_select === departInfo[i].department_name) {
            departmentId = departInfo[i].id
            console.log(45, departmentId)
          }
        }
        // when finished prompting, insert a new role into the db
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            department_id: departmentId
          },
          function (err) {
            if (err) throw err;
            console.log("Role added!");
            // re-prompt the user 
            init();
          }
        )
      })
  }
  )
}

function addEmployee() {

  var roles = [];
  var roleInfo = [];

  connection.query(`SELECT * FROM role`, function (err, res) {
    if (err) throw err;

    for (let i = 0; i < res.length; i++) {
      const role = res[i];

      roles.push(role.title);
      console.log(roles);
      roleInfo.push(role);
      console.log(roleInfo);
    }
    // prompt for info about the employee they are adding
    inquirer
      .prompt([
        {
          name: "role_select",
          type: "list",
          message: "What is the role of the employee?",
          choices: roles
        },
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
        var roleId = "";
        for (let i = 0; i < roleInfo.length; i++) {
          if (answer.role_select === roleInfo[i].title) {
            roleId = roleInfo[i].id
            console.log(47, roleId)
          }
        }
        // when finished prompting, insert a new employee into the db with their info
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: roleId
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
  )
};
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
  var createTable = "select role.id, role.title, department.department_name, role.salary from role inner join department on role.department_id = department.id"
  connection.query(
    createTable,
    function (err, res) {
      if (err) throw err;
      console.log("------------------------------------")
      console.table(res)
      console.log("------------------------------------")
      // re-prompt the user 
      init();
    }
  );
};
function viewEmployee() {
  var createTable = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id"
  connection.query(
    createTable,
    function (err, res) {
      if (err) throw err;
      console.log("------------------------------------")
      console.table(res)
      console.log("------------------------------------")
      // re-prompt the user 
      init();
    }
  );
};
function exitApplication() {
  connection.end();
}

// function updateRole(){
//   inquirer
//   .prompt(
//     {

//   }
//     ,{
//     name: "department_name",
//     type: "input",
//     message: "What department would you like to add"
//   })
//   .then(function (answer) {
//     // when finished prompting, insert a new item into the db with that info
//     connection.query(
//       "INSERT INTO department SET ?",
//       {
//         department_name: answer.department_name
//       },
//       function (err) {
//         if (err) throw err;
//         console.log("department added!");
//         // re-prompt the user 
//         init();
//       }
//     );
//   });


//   UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;


// }
init();