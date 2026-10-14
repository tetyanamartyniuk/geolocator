import type { FoursquarePlace, ScoredPlace } from "../types.js";
import { calculateLocationProbability } from "./scoringService.js";

// src/services/scoringService.ts
export function findWinnerLocation(
  places: FoursquarePlace[],
): ScoredPlace | null {
  if (places.length === 0) return null;

  const probablePlaces: ScoredPlace[] = places.map((place) => {
    const score = calculateLocationProbability(place);
    return { ...place, probabilityScore: score };
  });

  probablePlaces.sort(
    (place1, place2) => place2.probabilityScore - place1.probabilityScore,
  );

  console.log("Your probbale location: ", probablePlaces[0]);
  return probablePlaces[0] || null;
}
