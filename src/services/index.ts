import { MESSAGES } from "../constants/messages.js";
import { Subject, type Observer } from "../core/Subject.js";
import type { SearchState } from "../types.js";
import { parseCoordinates } from "../utils/coordinates.js";
import {
  resolveLocation,
  type FetchPlacesFunction,
} from "./resolveLocation.js";

export class LocationSearch extends Subject<SearchState> {
  private state: SearchState = { status: "idle" };

  constructor(private readonly fetchPlaces: FetchPlacesFunction) {
    super();
  }

  public override subscribe(observer: Observer<SearchState>) {
    super.subscribe(observer);
    observer(this.state);
  }

  public async search(
    rawLatitude?: string,
    rawLongitude?: string,
  ): Promise<void> {
    const coordinates = parseCoordinates(rawLatitude, rawLongitude);

    if (!coordinates) {
      this.setState({ status: "error", message: MESSAGES.invalidCoordinates });
      return;
    }

    this.setState({ status: "loading" });

    try {
      const place = await resolveLocation(coordinates, this.fetchPlaces);
      this.setState(place ? { status: "success", place } : { status: "empty" });
    } catch (error) {
      console.error(error);
      this.setState({ status: "error", message: MESSAGES.requestFailed });
    }
  }

  private setState(nextState: SearchState) {
    this.state = nextState;
    this.notify(nextState);
  }
}
