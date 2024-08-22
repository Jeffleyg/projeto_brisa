let api = require("./apiConfiguration.js");
const Logger = require("../lib/Logger.js");
const path = require("path");
const { readdirSync, statSync } = require("fs");

Logger.trace("initing routes...", "init");
const directory = "src/interfaces";

const loadingResourse = (path) => {
  const resourse = require(`../../${path}`);
  api = resourse(api);
};

const loadingRouteFiles = () => {
  function currentDirectory(routesDirectory) {
    const listFiles = readdirSync(routesDirectory);
    for (const file of listFiles) {
      const caminhoCompleto = path.join(routesDirectory, file);
      const estatisticas = statSync(caminhoCompleto);

      if (estatisticas.isDirectory()) {
        currentDirectory(caminhoCompleto);
      } else if (estatisticas.isFile() && file.includes("Route")) {
        loadingResourse(caminhoCompleto);
      }
    }
  }
  currentDirectory(directory);
};

loadingRouteFiles();

module.exports = api;
