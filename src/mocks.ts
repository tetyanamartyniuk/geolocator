import type { FoursquarePlace } from "./types.js";

export function enrichWithMockData(originalPlace: any): FoursquarePlace {
  const randomPopularity = Number(
    (Math.random() * (0.99 - 0.3) + 0.3).toFixed(2),
  );

  return {
    ...originalPlace,
    hours: {
      display: "Mon-Fri 08:00-20:00; Sat-Sun 09:00-21:00",
      is_local_holiday: false,
      open_now: true,
    },
    popularity: randomPopularity,
  };
}
