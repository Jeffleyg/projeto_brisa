const { badRequest } = require("../../lib/errorResponses.js");
const statisticsService = require("./statisticsService");
const statisticsSchema = require("./statisticsSchema");

module.exports.getStatistics = async (req, res, _next) => {
  const { query } = req;

  const { error } = statisticsSchema.validate(query);

  if (error) {
    return badRequest({ res, joiError: error });
  }

  const statiscts = await statisticsService.getClientStatistics(
    query.clientId,
    query.initialDate,
    query.finalDate,
  );

  return res.send(statiscts);
};
