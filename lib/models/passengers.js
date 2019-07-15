const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
  PassengerId: Number,
  Survived: Boolean,
  Pclass: Number,
  Name: String,
  Sex: String,
  Age: Number,
  SibSp: Number,
  Parch: Number,
  Ticket: String,
  Fare: Number,
  Cabin: String,
  Embarked: String
});

module.exports = mongoose.model("passengers", passengerSchema);
