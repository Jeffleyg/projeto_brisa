const { getStatistics } = require("./statisticsController");

module.exports = (api) => {
  api.get("/statistics", getStatistics);

  return api;
};
