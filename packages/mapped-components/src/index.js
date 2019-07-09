import React from 'react';
import createMapper from 'mapped-classes';

export const joinStrings = (...args) => {
  const next = args.filter(v => v);
  return next.length ? next.join(' ') : null;
}

export const mergeObjFunc = (obj, func) => (
  typeof(func) === 'function' 
    ? { ...obj, ...func(obj) } 
    : obj
);

export const omit = (obj, keys) => {
  const next = {}
  for (let key in obj) {
    if (keys.indexOf(key) > -1) continue;
    next[key] = obj[key];
  }
  return next;
}

// Get the attributes for creating a React element.
export const getElementAttributes = (props, mapper, callback) => {
  const { 
    tag = 'div', 
    base = '', 
    blacklist = [], 
    className = '', 
    ...rest 
  } = mergeObjFunc(props, callback);

  // Omit blacklisted, utility, and mapping props.
  const mappingKeys = Object.keys(mapper.mappings);
  const omissions = blacklist.concat(mappingKeys);
  const attributes = omit(rest, omissions);
  
  // Join the base, mapped, and element class names.
  const classNameString = joinStrings(base, mapper(rest), className);
  return { ...attributes, className: classNameString, tag  };
}

// Return a component with a built-in class name mapper.
export default config => (mappings, callback) => {
  const mapper = createMapper({ ...config, mappings });
  
  const Comp = props => {
    const { tag, ...attributes } = getElementAttributes(props, mapper, callback);
    return React.createElement(tag, attributes);
  }

  Comp.mappedComponent = 'true';
  Comp.mappings = mappings;

  return Comp;
}



