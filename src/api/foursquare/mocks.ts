import type { FoursquarePlace } from "../../types.js";

export const foursquareMocks = {
  enrichSearchPlace(originalPlace: any): FoursquarePlace {
    const randomPopularity = Number(Math.random().toFixed(2));

    return {
      ...originalPlace,
      hours: {
        open_now: true,
      },
      popularity: randomPopularity,
    };
  },
};
