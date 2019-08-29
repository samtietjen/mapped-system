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