const express = require("express");
const db = require("../db.js");
const routerFitness = express.Router();

//Get all courses
routerFitness.get("/fitness", (req, res) => {
  db.query("SELECT * FROM fitness", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//For English: Get all courses
routerFitness.get("/fitness/en", (req, res) => {
  db.query("SELECT * FROM fitness_en", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get course by id
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

//For English: Get course by id
routerFitness.get("/fitness/en/:id", (req, res) => {
  db.query(
    "SELECT * FROM fitness_en WHERE id = ?",
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

//For English: add a course
routerFitness.post("/addCourse/en", (req, res) => {
  let data = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };
  let sql = "INSERT INTO fitness_en SET ?";
  db.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/api/fitness/en");
  });
});

//update a course
routerFitness.put("/fitness/:id", function (req, res) {
  let data = {
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

//For English: update a course
routerFitness.put("/fitness/en/:id", function (req, res) {
  let data = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };
  console.log("Put received");
  db.query(
    "UPDATE fitness_en SET ? WHERE id = ?",
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
  db.query("DELETE FROM fitness WHERE id = ?", [req.params.id], (err) => {
    if (!err) {
      console.log("Fitness deleted successfully.");
      res.redirect("/api/fitness");
    } else console.log(err);
  });
});

//For English: delete a course
routerFitness.delete("/fitness/en/:id", (req, res) => {
  db.query("DELETE FROM fitness_en WHERE id = ?", [req.params.id], (err) => {
    if (!err) {
      console.log("Fitness deleted successfully.");
      res.redirect("/api/fitness/en");
    } else console.log(err);
  });
});

module.exports = routerFitness;
