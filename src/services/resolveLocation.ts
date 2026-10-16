import type { Place, SearchPlaceInputParams } from "../types.js";
import { scoringService } from "./scoringService/ScoringService.js";

export type FetchPlacesFunction = (
  params: SearchPlaceInputParams,
) => Promise<Place[]>;

export async function resolveLocation(
  params: SearchPlaceInputParams,
  fetchPlaces: FetchPlacesFunction,
) {
  const places = await fetchPlaces(params);

  return scoringService.getMostProbableLocation(places);
}
