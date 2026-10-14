import type { FoursquarePlace } from "./types.js";

export function enrichWithMockData(originalPlace: any): FoursquarePlace {
  const randomPopularity = Number(Math.random().toFixed(2));

  return {
    ...originalPlace,
    hours: {
      open_now: true,
    },
    popularity: randomPopularity,
  };
}
