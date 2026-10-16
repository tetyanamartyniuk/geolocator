import { createElement } from '../createElement.js';
import { Input } from './Input.js';
import { Button } from './Button.js';

export function Form({ title, fields, submitLabel, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    onSubmit(data);
  };

  return createElement('form', { class: 'form', onSubmit: handleSubmit },
    title && createElement('h3', { class: 'form-title' }, title),
    fields.map(Input),
    Button({ type: 'submit', label: submitLabel }),
  );
}