import { CoordinatesForm } from './CoordinatesForm.js';
import { createElement } from './createElement.js';
import { renderSearchResult, updateSubmitButton } from './searchObservers.js';

export function AppView({onSearch}){
    const resultContainer = createElement('div', { class: 'result-container' });
    const formElement = CoordinatesForm({
    onSubmit: (formData) => onSearch(formData.latitude, formData.longitude),
  });
  
  const submitButton = formElement.querySelector('button[type="submit"]');

  const observers = [renderSearchResult(resultContainer)];
  if (submitButton) observers.push(updateSubmitButton(submitButton));

  return {
    elements: [formElement, resultContainer],
    observers,
  };
}