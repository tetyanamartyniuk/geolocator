import "dotenv/config";
import type { FoursquarePlace } from "./types.js";

const API_URL = "https://places-api.foursquare.com/places/search";
const API_KEY = process.env.FOURSQUARE_API_KEY;

export async function fetchPlacesFromAPI(
  lat: string,
  long: string,
): Promise<FoursquarePlace[]> {
  if (!API_KEY) throw new Error("API_KEY wasn`t provided");

  const params = new URLSearchParams({
    ll: `${lat},${long}`,
    sort: "DISTANCE",
  });

  const options = {
    method: "GET",
    headers: {
      "X-Places-Api-Version": "2025-06-17",
      accept: "application/json",
      authorization: (`Bearer ` + API_KEY) as string,
    },
  };
  const response = await fetch(`${API_URL}?${params.toString()}`, options);

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(
      `API Error ${response.status} (${response.statusText}). Details: ${errorDetails}`,
    );
  }

  const data = await response.json();
  return data.results || [];
}
