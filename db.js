var mysql = require("mysql");
const util = require("util")
const { pid } = require("process");


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Hotdog88",
    database: "employee_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // call function
});

connection.query = util.promisify(connection.query);

module.exports = connection;