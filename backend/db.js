//Datenbankverbindung
const mysql = require("mysql");

var con = mysql.createConnection({
  //hier muss die individuelle IP des Laptops, mit dem der Server gestartet wurde, angegeben werden
  host: "192.168.178.23",
  user: "admin",
  password: "admin",
  database: "WebmoMobile",
});

con.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});
module.exports = con;
