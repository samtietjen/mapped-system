export const arr = n => Array.isArray(n) ? n : [n];

export const funcOrSplit = (a, b) => typeof(a) === 'function' ? [a(b)] : [a, b];

export const isObject = value => value 
  && typeof value === 'object' 
  && value.constructor === Object;

export const join = (items, separator = ' ') => {
  const next = items.filter(Boolean);
  return next.length ? next.join(separator) : null;
};

export const truncate = num => Math.trunc(Math.round(num));