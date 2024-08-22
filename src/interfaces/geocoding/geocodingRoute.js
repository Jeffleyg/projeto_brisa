const { translateGeolocations } = require("./geocodingController.js");

module.exports = (api) => {
  api.put("/translate_geolocations", translateGeolocations);

  return api;
};
