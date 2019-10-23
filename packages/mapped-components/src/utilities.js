export const joinStrings = (...args) => {
  const next = args.filter(v => v);
  return next.length ? next.join(" ") : null;
};

export const mergeObjFunc = (obj, func) =>
  typeof func === "function" 
    ? { ...obj, ...func(obj) } 
    : obj;

export const omit = (obj, keys) => {
  const next = {};
  for (let key in obj) {
    if (keys.indexOf(key) > -1) continue;
    next[key] = obj[key];
  }
  return next;
};

export const toArray = n => Array.isArray(n) ? n : [n];

export const objectToString = obj => Object.values(obj).join(' ') || '';

export const camelCaseToDash = str => str
  .replace(/[^a-zA-Z0-9]+/g, '-')
  .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/([0-9])([^0-9])/g, '$1-$2')
  .replace(/([^0-9])([0-9])/g, '$1-$2')
  .replace(/-+/g, '-')
  .toLowerCase();