import axios from "axios";
import { STATUS_LOG_MESSAGES } from "../errors/statusMessages.js";
import { FOURSQUARE_CONFIG } from "./config.js";
import { env } from "../../env/env.js";
export const foursquareClient = axios.create({
  baseURL: FOURSQUARE_CONFIG.baseURL,
  headers: {
    "X-Places-Api-Version": FOURSQUARE_CONFIG.apiVersion,
    accept: "application/json",
    authorization: `Bearer ${env.FOURSQUARE_API_KEY}`,
  },
});

foursquareClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      console.error("Unable to connect to the Foursquare server");
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    const message =
      STATUS_LOG_MESSAGES[status] ?? `Foursquare API Error: ${status}`;

    console.error(message, data);
    return Promise.reject(error);
  },
);
