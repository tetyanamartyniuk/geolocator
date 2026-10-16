import { createElement } from '../createElement.js';

export function Button({ label, type = 'button' }) {
  return createElement('button', { class: 'btn btn-primary', type }, label);
}