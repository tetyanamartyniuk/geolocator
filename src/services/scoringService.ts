import { DISTANCE_NORMALIZER } from "../config/scoring.js";
import type { FoursquarePlace, ScoreCalculator } from "../types.js";

type ScoreStrategy = {
  calculate: (place: FoursquarePlace) => number;
  weight: number;
};

//Ваги
//відстань - 0.6
//популярність - 0.3
//час роботи закладу - 0.1

function getDistanceImportance(distance?: number) {
  if (distance === undefined || distance < 0) {
    return 0.1;
  }
  return 1 / (distance / DISTANCE_NORMALIZER + 1);
}

function getPopularityImportance(popularity?: number) {
  if (popularity === undefined) return 0.5;
  return popularity;
}

function getHoursImportance(hours?: { open_now?: boolean }) {
  if (!hours || hours.open_now === undefined) {
    return 0.5;
  }
  return hours.open_now ? 0.8 : 0.2;
}

export const scoringStrategies: ScoreStrategy[] = [
  {
    calculate: (place) => getDistanceImportance(place.distance),
    weight: 0.6,
  },
  {
    calculate: (place) => getPopularityImportance(place.popularity),
    weight: 0.3,
  },
  {
    calculate: (place) => getHoursImportance(place.hours),
    weight: 0.1,
  },
];

export function calculateLocationProbability(place: FoursquarePlace): number {
  return scoringStrategies.reduce((totalScore, strategy) => {
    const rawScore = strategy.calculate(place);
    return totalScore + rawScore * strategy.weight;
  }, 0);
}
