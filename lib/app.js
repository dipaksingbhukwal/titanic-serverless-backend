// ./lib/app.js
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");

const routes = require("./routes/passengers");
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// Database connection
mongoose.connect(process.env.DB, { useNewUrlParser: true });

// Use routes
app.use("/api", routes);

module.exports = app;
