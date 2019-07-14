// ./lib/routes/notes/notes.controller.js
const express = require("express");
const router = express.Router();
const fs = require("fs");
const csv = require("csv-parser");

const passengers = require("../models/passengers");

router.get("/seeder", (req, res, next) => {
  passengers.remove([]);
  fs.createReadStream("lib/public/data/train.csv")
    .pipe(csv())
    .on("data", row => {
      const Passengers = new passengers();
      Passengers.PassengerId = row.PassengerId;
      Passengers.Name = row.Name;
      Passengers.Survived = row.Survived;
      Passengers.Sex = row.Sex;
      Passengers.Age = row.Age;
      Passengers.Pclass = row.Pclass;
      Passengers.Parch = row.Parch;
      Passengers.Ticket = row.Ticket;
      Passengers.Fare = row.Fare;

      Passengers.save().then(d => {});
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
      passengers.find().then(data => {
        console.log(data.length);
        res.send(data);
      });
    });
});

router.get("/", (req, res, next) => {
  passengers.find().then(data => {
    console.log(data.length);
    res.setHeader("passenger-count", data.length);
    res.send(data);
  });
});

router.get("/:id", (req, res, next) => {
  passengers.findById(req.params.id).then(data => {
    res.send(data);
  });
});

router.post("/", (req, res, next) => {
  console.log(req.body);

  const Passengers = {
    PassengerId: req.body.PassengerId,
    Name: req.body.Name,
    Survived: req.body.Survived,
    Sex: req.body.Sex,
    Age: req.body.Age,
    Pclass: req.body.Pclass,
    Parch: req.body.Parch,
    Ticket: req.body.Ticket,
    Fare: req.body.Fare
  };
  new passengers(Passengers).save().then(d => {
    res.send(d);
  });
});

router.delete("/:id", async (req, res, next) => {
  const data = await passengers.deleteOne({ _id: req.params.id });
  res.status(200).send(data);
});

module.exports = router;
