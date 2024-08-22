const Peoples = require("./models/Peoples.js");
const RemainsPeoples = require("./models/RemainsPeoples.js");

module.exports = {
  "peoples": Peoples,
  "remainsPeoples": RemainsPeoples,

  undefined: new Error("typed redirect adapter non exists"),
};
