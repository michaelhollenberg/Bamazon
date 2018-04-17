var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazondb",
  // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
  start();
 
  });
  
  function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }

  function start() {
    inquirer
        .prompt({
            name: "buyOrQuit",
            type: "rawlist",
            message: "Would you like to buy an item or quit",
            choices: ["BUY", "Quit"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.buyOrQuit.toUpperCase() === "BUY") {
                afterConnection();
            }
            else {
                console.log("You have Quit Bamazon")
            }
        });
}