import { SearchResultView } from './ResultView.js';

export function renderSearchResult(container) {
  return (state) => {
    container.replaceChildren(SearchResultView(state));
  };
}

export function updateSubmitButton(button) {
  const defaultLabel = button.textContent;

  return (state) => {
    const isLoading = state.status === 'loading';
    button.disabled = isLoading;
    button.textContent = isLoading ? 'Searching...' : defaultLabel;
  };
}