import type {
  FoursquarePlace,
  inputParams,
  searchPlaceParams,
} from "../../types.js";
import { foursquareClient } from "../clients/foursquareClient.js";

export async function searchPlaces(
  placeParams: inputParams,
): Promise<FoursquarePlace[]> {
  const { lat, long, ...restParams } = placeParams;
  const response = await foursquareClient.get("/places/search", {
    params: {
      ll: `${lat},${long}`,
      ...restParams,
    },
  });
  return response.data.results || [];
}

export async function getGeotaggingCandidates(params: inputParams) {
  const response = await foursquareClient.get("/geotagging/candidates", {
    params,
  });
  return response.data.results || [];
}
