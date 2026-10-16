import type { AxiosInstance } from "axios";
import type {
  FoursquarePlace,
  Place,
  SearchPlaceInputParams,
} from "../../types.js";
import { foursquareMocks } from "./mocks.js";
import { foursquareClient } from "./client.js";
import { FOURSQUARE_CONFIG } from "./config.js";

class FoursquareEndpoints {
  constructor(private client: AxiosInstance) {}

  public searchPlaces = async (
    rawSearchPlacesParams: SearchPlaceInputParams,
  ): Promise<Place[]> => {
    const { path, defaultParams } = FOURSQUARE_CONFIG.endpoints.searchPlaces;

    const searchPlacesQueryParams = this.transformToQueryParams(
      rawSearchPlacesParams,
    );

    const placesResponse = await this.client.get(path, {
      params: { ...defaultParams, ...searchPlacesQueryParams },
    });
    const rawPlaces = placesResponse.data.results ?? [];

    return this.transformToPlaces(
      rawPlaces.map(foursquareMocks.enrichSearchPlace),
    );
  };

  private transformToQueryParams(
    rawSearchPlacesParams: SearchPlaceInputParams,
  ) {
    const { lat, long, ...restParams } = rawSearchPlacesParams;
    return {
      ll: `${lat},${long}`,
      ...restParams,
    };
  }

  private transformToPlaces(rawPlaces: FoursquarePlace[]): Place[] {
    return rawPlaces.map((rawPlace) => ({
      id: rawPlace.fsq_place_id,
      latitude: rawPlace.latitude,
      longitude: rawPlace.longitude,
      distance: rawPlace.distance,
      name: rawPlace.name,
      location: { address: rawPlace.location?.address },
      popularity: rawPlace.popularity,
      hours: { openNow: rawPlace.hours?.open_now },
    }));
  }
}

const foursquareEndpoints = new FoursquareEndpoints(foursquareClient);
export default foursquareEndpoints;
