const express = require("express");
const db = require("../db.js");
const routerFitness = express.Router();

//Creating GET Router to fetch all the learner details from the MySQL Database
routerFitness.get("/fitness", (req, res) => {
  db.query("SELECT * FROM fitness", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get all courses
routerFitness.get("/fitness/:id", (req, res) => {
  db.query(
    "SELECT * FROM fitness WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});
//add a course
routerFitness.post("/addCourse", (req, res) => {
  let data = {
    date: req.body.date,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };
  let sql = "INSERT INTO fitness SET ?";
  db.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/api/fitness");
  });
});

//update a course
routerFitness.put("/fitness/:id", function (req, res) {
  let data = {
    date: req.body.date,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };
  console.log("Put received");
  db.query(
    "UPDATE fitness SET ? WHERE id = ?",
    [data, req.params.id],
    (err, result) => {
      if (err) {
        console.log(err.message);
        throw err;
      }
      res.send(data);
    }
  );
});

//delete a course
routerFitness.delete("/fitness/:id", (req, res) => {
  db.query(
    "DELETE FROM fitness WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        console.log("Fitness deleted successfully.");
        res.redirect("/api/fitness");
      } else console.log(err);
    }
  );
});

module.exports = routerFitness;
