//Datenbankverbindung
const mysql = require("mysql");

var con = mysql.createConnection({
  //host muss für App mit der lokalen IP angelegt werden
  //host: "192.168.0.176",
  //host: "localhost",
  host: "192.168.178.23",
  user: "admin",
  password: "admin",
  database: "Webmo",
});

con.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});
module.exports = con;
