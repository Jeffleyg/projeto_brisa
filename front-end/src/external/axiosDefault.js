import axios from "axios";
import { HOST } from "../../dev.env.js";

export function createApi() {
  return axios.create({
    baseURL: HOST,
  });
}
