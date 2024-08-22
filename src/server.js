const api = require("./config/loadingRoutes.js");
const Logger = require("./lib/Logger.js");

require("dotenv").config();
const { PORT } = process.env;

api.listen(PORT, () => {
  Logger.trace(`Api rodando na porta: ${PORT}`);
});
