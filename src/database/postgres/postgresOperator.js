const Logger = require("../../lib/Logger.js");
const pg = require("./postgres.js");

module.exports = {
  getByCursor: async (query, params = []) => {
    const client = await pg.connect();
    if (!client) {
      Logger.error("pg client is null");
      return null;
    }

    let res = null;

    try {
      res = await client.query(query, params);
    } catch (error) {
      Logger.error(error.message);

      return;
    } finally {
      await client.release();
      pg.close();
    }

    if (res.rowCount >= 1) {
      return res.rows;
    }

    return null;
  },
};
