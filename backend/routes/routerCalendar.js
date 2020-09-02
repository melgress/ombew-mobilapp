const express = require("express");
const db = require("../db.js");
const routerCalendar = express.Router();

//Creating GET Router to fetch all the learner details from the MySQL Database

//Creating GET Router to fetch all the events from Database for the Calendar
routerCalendar.get("/fitnessevents", (req, res) => {
  db.query("SELECT name from events", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//route for insert data into event
routerCalendar.post("/addEvent", (req, res) => {
  let data = {
    title: req.body.name,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
  };
  let sql = "INSERT INTO events SET ?";
  db.query(sql, data, (err, results) => {
    if (err) throw err;
    console.log(data);
    res.redirect("/api/fitness");
  });
});

module.exports = routerCalendar;
