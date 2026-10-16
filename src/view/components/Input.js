import { createElement } from '../createElement.js';

export function Input({ label, ...attrs }) {
  const input = createElement('input', { class: 'form-control', type: 'text', ...attrs });
  return label ? createElement('label', { class: 'field' }, createElement('span', {}, label), input) : input;
}