import { DISTANCE_NORMALIZER, NEUTRAL_SCORE } from "../../constants/scoring.js";
import type { Place } from "../../types.js";

export interface ScoreStrategy {
  readonly weight: number;
  calculate(place: Place): number;
}

class DistanceStrategy implements ScoreStrategy {
  constructor(public readonly weight: number) {}

  calculate(place: Place): number {
    if (!Number.isFinite(place.distance) || place.distance < 0) return 0.1;

    return 1 / (place.distance / DISTANCE_NORMALIZER + 1);
  }
}

class PopularityStrategy implements ScoreStrategy {
  constructor(public readonly weight: number) {}

  calculate(place: Place): number {
    return place.popularity ?? NEUTRAL_SCORE;
  }
}

class HoursStrategy implements ScoreStrategy {
  constructor(public readonly weight: number) {}

  calculate(place: Place): number {
    const openNow = place.hours?.openNow;
    if (openNow === undefined) return NEUTRAL_SCORE;
    return openNow ? 0.8 : 0.2;
  }
}

export const distanceStrategy = new DistanceStrategy(0.7);
export const popularityStrategy = new PopularityStrategy(0.2);
export const hoursStrategy = new HoursStrategy(0.1);
