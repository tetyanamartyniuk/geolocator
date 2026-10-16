export interface PlaceHours {
  open_now?: boolean;
  display?: string;
  is_local_holiday?: boolean;
}
//розділити логіку типів(необов'язково)
export interface FoursquarePlace {
  fsq_place_id: string;
  latitude: number;
  longitude: number;
  name: string;
  distance: number;
  popularity?: number;
  hours?: PlaceHours;
  location: {
    address: string;
  };
  [key: string]: any;
}

export type ScoredPlace = Place & {
  probabilityScore: number;
};

export type ScoreCalculator = (value: any) => number;

export type searchPlaceParams = {
  ll: string;
  sort?: string;
  radius?: string;
};

export type SearchPlaceInputParams = {
  lat: number;
  long: number;
  sort?: string;
  radius?: string;
};

export type Place = {
  id: string;
  latitude: number;
  longitude: number;
  distance: number;
  location: {
    address: string;
  };
  name: string;
  popularity?: number | undefined;
  hours?: {
    openNow?: boolean | undefined;
  };
};

export type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "empty" }
  | { status: "success"; place: ScoredPlace }
  | { status: "error"; message: string };
