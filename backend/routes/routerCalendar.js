const express = require("express");
const db = require("../db.js");
const routerCalendar = express.Router();

//Creating GET Router to fetch all the learner details from the MySQL Database

//Creating GET Router to fetch all the events from Database for the Calendar (Agenda)
routerCalendar.get("/fitnessevents", (req, res) => {
  db.query("SELECT * from agenda", (err, rows) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//For English: Creating GET Router to fetch all the events from Database for the Calendar (Agenda)
routerCalendar.get("/fitnessevents/en", (req, res) => {
  db.query("SELECT * from agenda_en", (err, rows) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//update table agenda
routerCalendar.put("/fitnessevent/:id", function (req, res) {
  let data = {
    date: req.body.date,
    name: req.body.name,
  };
  console.log("Put received");
  db.query("UPDATE agenda SET ? WHERE id = ?", [data, req.params.id], (err) => {
    if (err) {
      console.log(err.message);
      throw err;
    }
    res.send(data);
  });
});

//English: update table agenda_en
routerCalendar.put("/fitnessevent/en/:id", function (req, res) {
  let data = {
    date: req.body.date,
    name: req.body.name,
  };
  console.log("Put received");
  db.query(
    "UPDATE agenda_en SET ? WHERE id = ?",
    [data, req.params.id],
    (err) => {
      if (err) {
        console.log(err.message);
        throw err;
      }
      res.send(data);
    }
  );
});

//delete from agenda
routerCalendar.delete("/fitnessevents/:id", (req, res) => {
  db.query(
    "DELETE FROM agenda WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        console.log("Fitness deleted successfully.");
        res.redirect("/api/fitnessevents");
      } else console.log(err);
    }
  );
});

//For English: delete from agenda_en
routerCalendar.delete("/fitnessevents/en/:id", (req, res) => {
  db.query(
    "DELETE FROM agenda_en WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        console.log("Fitness deleted successfully.");
        res.redirect("/api/fitnessevents");
      } else console.log(err);
    }
  );
});

//For DropDownMenu
routerCalendar.get("/dropdown", (req, res) => {
  db.query("SELECT * from dropdown", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//For English: For DropDownMenu
routerCalendar.get("/dropdown/en", (req, res) => {
  db.query("SELECT * from dropdown_en", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//route for insert data into agenda
routerCalendar.post("/addFitnessevent", (req, res) => {
  let data = {
    name: req.body.name,
    date: req.body.date,
    //note: req.body.note,
  };
  let sql = "INSERT INTO agenda SET ?";
  db.query(sql, data, (err, results) => {
    if (err) throw err;
    console.log(data);
    //res.redirect("/api/fitness");
  });
});

//For English: route for insert data into agenda
routerCalendar.post("/addFitnessevent/en", (req, res) => {
  let data = {
    name: req.body.name,
    date: req.body.date,
    //note: req.body.note,
  };
  let sql = "INSERT INTO agenda_en SET ?";
  db.query(sql, data, (err, results) => {
    if (err) throw err;
    console.log(data);
    //res.redirect("/api/fitness");
  });
});

module.exports = routerCalendar;
