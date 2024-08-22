const { getCoordenates, importCoordenates } = require(
  "./coordenatesController.js",
);

module.exports = (api) => {
  api.get("/coordenates", getCoordenates);

  api.post("/coordenates/import", importCoordenates);

  return api;
};
