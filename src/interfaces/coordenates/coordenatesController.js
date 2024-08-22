const mongoOperator = require("../../database/mongo/mongoOperator.js");
const { connect, disconnect } = require("../../database/mongo/mongoose.js");
const { badRequest } = require("../../lib/errorResponses.js");
const coordenatesSchema = require("./coordenatesSchema.js");
const { formatFilters } = require("./coordenatesService.js");

module.exports.getCoordenates = async (req, res, _next) => {
  const { query } = req;
  const { value, error: joiError } = coordenatesSchema.validate(
    query,
  );

  const filter = formatFilters(value);

  if (joiError) {
    return badRequest({ res, joiError });
  }

  await connect();

  const coordenates = await mongoOperator.get("peoples", filter);

  await disconnect();

  return res.send({
    pointsCounter: coordenates.length,
    points: coordenates,
  });
};

module.exports.importCoordenates = async (_req, _res, _next) => {
};
