const { login } = require("./loginController.js");

module.exports = (api) => {
  api.post("/login", login);

  return api;
};
