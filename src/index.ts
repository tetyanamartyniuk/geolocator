import { searchPlaces } from "./api/services/endpoints.js";
import { enrichWithMockData } from "./mocks.js";
import { findWinnerLocation } from "./services/locationService.js";

import type {
  FoursquarePlace,
  inputParams,
  ScoredPlace,
  searchPlaceParams,
} from "./types.js";

//lat: string, long: string

type FetchPlacesFunction = (params: inputParams) => Promise<FoursquarePlace[]>;

async function getMostProbableLocation(
  params: inputParams,
  fetchData: FetchPlacesFunction,
) {
  try {
    const rawPlaces = await fetchData(params);

    if (rawPlaces.length === 0) {
      console.log("No locations were found nearby.");
      return null;
    }

    const enrichedPlaces = rawPlaces.map((rawPlace) =>
      enrichWithMockData(rawPlace),
    );

    return findWinnerLocation(enrichedPlaces);
  } catch (error) {
    console.error(error);
    return null;
  }
}

getMostProbableLocation({ lat: "49.843949", long: "24.026219" }, searchPlaces);
