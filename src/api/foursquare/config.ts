export const FOURSQUARE_CONFIG = {
  baseURL: "/foursquare-api",
  apiVersion: "2025-06-17",
  endpoints: {
    searchPlaces: {
      path: "/places/search",
      defaultParams: { radius: 200, sort: "DISTANCE", limit: 20 },
    },
  },
} as const;
