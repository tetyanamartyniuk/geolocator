import foursquareEndpoints from "./api/foursquare/index.js";
import { LocationSearch } from "./services/index.js";
import { AppView } from "./view/AppView.js";

const appContainer = document.getElementById("app");
if (!appContainer) throw new Error("App element not found");

const locationSearch = new LocationSearch(foursquareEndpoints.searchPlaces);

const appView = AppView({
  onSearch: (latitude: string, longitude: string) =>
    locationSearch.search(latitude, longitude),
});

appView.observers.forEach((observer) => locationSearch.subscribe(observer));
appContainer.replaceChildren(...appView.elements);
