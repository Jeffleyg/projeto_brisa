const mongoose = require("mongoose");
const Logger = require("../../lib/Logger.js");

require("dotenv").config();
const { MONGO_ADDRESS } = process.env;
const options = {
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
};

module.exports.connect = async () => {
  await mongoose.connect(MONGO_ADDRESS, options)
    .then(() => Logger.trace("Conectado ao MongoDB!"))
    .catch((err) =>
      Logger.error("Não foi possível conectar ao MongoDB...", err)
    );
};

module.exports.disconnect = async () => {
  await mongoose.disconnect()
    .then(() => Logger.trace("Desconectado do MongoDB!"))
    .catch((err) =>
      Logger.error("Não foi possível desconectar do MongoDB...", err)
    );
};
