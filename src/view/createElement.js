function setProp(el, key, value) {
  if (value == null || value === false) return;

  if (key.startsWith('on')) {
    el.addEventListener(key.slice(2).toLowerCase(), value);
  } else if (key in el) {
    el[key] = value;
  } else {
    el.setAttribute(key, value);
  }
}

export function createElement(tag, attributes = {}, ...children) {
  const el = document.createElement(tag);

  for (const [key, value] of Object.entries(attributes)) {
    setProp(el, key, value);
  }

  el.append(...children.flat().filter((child) => child != null && child !== false));
  return el;
}