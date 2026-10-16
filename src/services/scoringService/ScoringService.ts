import { MAX_PLACE_DISTANCE } from "../../constants/scoring.js";
import type { FoursquarePlace, Place, ScoredPlace } from "../../types.js";
import {
  distanceStrategy,
  hoursStrategy,
  popularityStrategy,
  type ScoreStrategy,
} from "./scoringStrategies.js";

class ScoringService {
  constructor(private readonly scoringStrategies: ScoreStrategy[]) {}

  public getMostProbableLocation(places: Place[]): ScoredPlace | null {
    let mostProbableLocation: ScoredPlace | null = null;

    for (const place of places) {
      if (place.distance > MAX_PLACE_DISTANCE) continue;

      const probabilityScore = this.calculateLocationScore(place);

      if (
        !mostProbableLocation ||
        probabilityScore > mostProbableLocation.probabilityScore
      ) {
        mostProbableLocation = { ...place, probabilityScore };
      }
    }

    return mostProbableLocation;
  }

  private calculateLocationScore(place: Place): number {
    return this.scoringStrategies.reduce(
      (totalScore, strategy) =>
        totalScore + strategy.calculate(place) * strategy.weight,
      0,
    );
  }
}

export const scoringService = new ScoringService([
  distanceStrategy,
  popularityStrategy,
  hoursStrategy,
]);
