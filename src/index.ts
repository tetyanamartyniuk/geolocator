import { fetchPlacesFromAPI } from "./api.js";
import { enrichWithMockData } from "./mocks.js";
import { scoringStrategies, calculateLocationProbability } from "./scoring.js";
import type { ScoredPlace } from "./types.js";

async function determineLikelyLocation(lat: string, long: string) {
  try {
    const places = await fetchPlacesFromAPI(lat, long);

    if (places.length === 0) {
      console.log("No locations were found nearby.");
      return null;
    }

    const MAX_DISTANCE_METERS = 500;
    const nearbyPlaces = places.filter(
      (place) => place.distance <= MAX_DISTANCE_METERS,
    );

    if (nearbyPlaces.length === 0) {
      console.log(`No commercial places found within ${MAX_DISTANCE_METERS}m.`);
      return null;
    }
    const probablePlaces: ScoredPlace[] = places.map((place) => {
      const enrichedPlace = enrichWithMockData(place);
      const score = calculateLocationProbability(
        scoringStrategies,
        enrichedPlace,
      );

      return {
        ...enrichedPlace,
        probabilityScore: score,
      };
    });

    probablePlaces.sort((a, b) => b.probabilityScore - a.probabilityScore);

    const winner = probablePlaces[0];
    console.log("Probable locations: ", probablePlaces);
    console.log("Your probable location: ", winner);

    return winner;
  } catch (error) {
    console.error(error);
  }
}

determineLikelyLocation("49.843949", "24.026219");
