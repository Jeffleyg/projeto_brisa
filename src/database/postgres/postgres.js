const Logger = require("../../lib/Logger.js");
const { Pool } = require("pg");

require("dotenv").config();
const {
  POSTGRES_USER,
  POSTGRES_HOST,
  POSTGRES_DATABASE,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
} = process.env;

const connectionPool = {
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: POSTGRES_DATABASE,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT,
};

if (
  [
    POSTGRES_HOST,
    POSTGRES_PASSWORD,
    POSTGRES_DATABASE,
    POSTGRES_USER,
    POSTGRES_PORT,
  ].some(
    (v) => !v,
  )
) {
  throw new Error("Missing database environment variables");
}

const pool = new Pool(connectionPool);

const global = {};

module.exports.connect = async () => {
  if (global.connection) {
    return global.connection.connect();
  }
  try {
    const conn = await pool.connect();
    global.connection = pool;
    return conn;
  } catch (error) {
    Logger.error({
      ...error,
      type: "database-error",
      local: "postgre-connect",
    });

    return null;
  }
};

module.exports.close = () => {
  try {
    delete global.connect;
    return "desconectado";
  } catch (error) {
    Logger.error({
      ...error,
      type: "database-error",
      local: "postgre-disconnect",
    });
  }
};
