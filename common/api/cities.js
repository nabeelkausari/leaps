import { fetchJson } from "./helpers";
import { BASE_URI } from "./constants";
export const cities = {
  get: query => fetchJson(`${BASE_URI}cities/${query ? `?query=${query}` : ""}`)
};
