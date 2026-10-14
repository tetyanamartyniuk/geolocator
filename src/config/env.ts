import "dotenv/config";

const FOURSQUARE_API_KEY = process.env.FOURSQUARE_API_KEY; //окремий шар для взаємодії з .env
if (!FOURSQUARE_API_KEY) throw new Error("FOURSQUARE_API_KEY wasn`t provided");

const FOURSQUARE_API_URL = process.env.FOURSQUARE_API_URL;
if (!FOURSQUARE_API_URL) throw new Error("FOURSQUARE_API_URL wasn`t provided");

export { FOURSQUARE_API_KEY, FOURSQUARE_API_URL };
