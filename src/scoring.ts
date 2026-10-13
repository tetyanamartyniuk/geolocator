import type { FoursquarePlace, ScoreCalculator } from "./types.js";

//probScore = 1 / (distance^(1/2) + 1) * popularity * open_hours(0.8 or 0.2)

export const scoringStrategies: Record<string, ScoreCalculator> = {
  distance: getDistanceImportance,
  popularity: getPopularityImportance,
  hours: getHoursImportance,
};

function getDistanceImportance(distance: number) {
  return 1 / (Math.sqrt(distance) + 1);
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

export function calculateLocationProbability(
  parametersObj: Record<string, ScoreCalculator>,
  object: FoursquarePlace,
): number {
  let probableLocationScore = 0;
  const parameteres = Object.keys(parametersObj);

  parameteres.forEach((parameter, index) => {
    const calculateFn = parametersObj[parameter];
    if (!calculateFn) return;
    const result = calculateFn(object[parameter]);

    if (index === 0) {
      probableLocationScore = result;
    } else {
      probableLocationScore *= result;
    }
  });

  return probableLocationScore;
}
