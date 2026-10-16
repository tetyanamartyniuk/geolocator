import { MESSAGES } from '../constants/messages.js';
import { createElement } from './createElement.js';

const viewsByStatus = {
  idle: () => IdleView(),
  loading: () => LoadingView(),
  empty: () => EmptyView(),
  error: (state) => ErrorView(state.message),
  success: (state) => PlaceView(state.place),
}


export function SearchResultView(state) {
  const renderView = viewsByStatus[state.status] ?? viewsByStatus.idle;
  return renderView(state);
}

function LoadingView() {
  return createElement('p', { class: 'result result--loading' }, MESSAGES.loading);
}

function ErrorView(message) {
  return createElement('p', { class: 'result result--error', role: 'alert' }, message);
}

function EmptyView() {
  return createElement('p', { class: 'result result--empty' }, MESSAGES.empty);
}

function IdleView(){
  return createElement('div')
}

function PlaceView(place) {
  return createElement('article', { class: 'result place-card' },
    createElement('h3', {}, place.name),
    place.location?.address && createElement('p', {}, `Address: ${place.location.address}`),
    createElement('p', {}, `Distance: ${Math.round(place.distance)} m`),
    place.hours?.openNow !== undefined && createElement('p', {}, place.hours.openNow ? 'Open now' : 'Closed now'),
    createElement('p', {}, `Probability score: ${Math.round(place.probabilityScore * 100)}%`),
  );
}


