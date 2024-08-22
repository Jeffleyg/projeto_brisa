const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const api = express();

api.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header('Access-Control-Allow-Origin', 'GET, PUT, POST, DELETE')
  api.use(cors());
  next();
});

api.use(
  bodyParser.raw({
    type: "application/json",
  }),
);

module.exports = api;
