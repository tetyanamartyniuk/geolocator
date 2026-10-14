export interface PlaceHours {
  open_now?: boolean;
  display?: string;
  is_local_holiday?: boolean;
}

export interface FoursquarePlace {
  fsq_id: string;
  name: string;
  distance: number;
  popularity?: number;
  hours?: PlaceHours;
  [key: string]: any;
}

export type ScoredPlace = FoursquarePlace & {
  probabilityScore: number;
};

export type ScoreCalculator = (value: any) => number;

export type searchPlaceParams = {
  ll: string;
  sort?: string;
  radius?: string;
};

export type inputParams = {
  lat: string;
  long: string;
  sort?: string;
  radius?: string;
};
