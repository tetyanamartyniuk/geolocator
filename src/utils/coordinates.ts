import type { SearchPlaceInputParams } from "../types.js";

export const MIN_COORDINATE_DECIMALS = 4;
export const COORDINATE_PATTERN = `-?\\d{1,3}\\.\\d{${MIN_COORDINATE_DECIMALS},}`;

const COORDINATE_REGEX = new RegExp(`^${COORDINATE_PATTERN}$`);

export function parseCoordinates(
  rawLatitude?: string,
  rawLongitude?: string,
): SearchPlaceInputParams | null {
  const latitude = rawLatitude?.trim() ?? "";
  const longitude = rawLongitude?.trim() ?? "";

  if (!COORDINATE_REGEX.test(latitude) || !COORDINATE_REGEX.test(longitude))
    return null;

  const lat = Number(latitude);
  const long = Number(longitude);
  const isInRange = Math.abs(lat) <= 90 && Math.abs(long) <= 180;

  return isInRange ? { lat, long } : null;
}
