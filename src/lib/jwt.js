const jwt = require("jsonwebtoken");

require("dotenv").config();
const { JWT_SECRET: secret } = process.env;

module.exports = {
  signToken: (payload) => {
    return jwt.sign(payload, secret);
  },

  decodeToken: (token) => {
    return jwt.verify(token, secret);
  },
};
