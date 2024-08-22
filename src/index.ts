import { loadConfig } from "./config";
import express from "express";

function start() {
  const config = loadConfig();
  const app = express();

  app.get("/", (_req, res) => {
    res.send("Hello World!");
  });

  app.listen(config.serverPort, () => {
    console.log(`Example app listening on port ${config.serverPort}`);
  });
}

start();
