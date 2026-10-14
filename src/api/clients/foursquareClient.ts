import axios from "axios";
import { FOURSQUARE_API_KEY, FOURSQUARE_API_URL } from "../../config/env.js";

export const foursquareClient = axios.create({
  baseURL: FOURSQUARE_API_URL as string,
  headers: {
    "X-Places-Api-Version": "2025-06-17",
    accept: "application/json",
    authorization: `Bearer ${FOURSQUARE_API_KEY}`,
  },
});

foursquareClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized error");
      } else if (error.response.status === 429) {
        console.error("Too many requests");
      } else {
        console.error(
          `Foursquare API Error: ${error.response.status}`,
          error.response.data,
        );
      }
    } else if (error.request) {
      console.error("Unable to connect to the Foursquare server");
    }
    return Promise.reject(error);
  },
);
