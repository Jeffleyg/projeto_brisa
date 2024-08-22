import { config } from "dotenv";

export interface Config {
  serverPort: number;
}

export function loadConfig(): Config {
  config();

  return {
    serverPort: parseInt(process.env.SERVER_PORT) || 3_000,
  };
}
