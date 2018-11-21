import React from 'react';
import createMapper from '@samtietjen/mapped-classes';

export const join = (items, separator = ' ') => {
  const next = items.filter(Boolean);
  return next.length ? next.join(separator) : null;
};

export const omit = (obj, keys) => {
  const next = {};
  for (let key in obj) {
    if (keys.indexOf(key) > -1) continue;
    next[key] = obj[key];
  }
  return next;
}

export default config => mappings => {
  const mapped = createMapper({ ...config, mappings })

  const classNames = ({ base, className, ...obj }) => {
    const values = {}
    for (let key in obj) {
      if (mappings[key] === undefined) continue;
      values[key] = obj[key];
    }
    return join([base, mapped(values), className]);
  }

  const Component = props => React.createElement(props.tag || 'div', { 
    className: classNames(props), 
    ...omit(props, Object.keys(mappings).concat(['className', 'base', 'tag'])) 
  });

  Component.mappings = mappings;
  Component.classNames = classNames;
  Component.mappedComponent = true;

  return Component;
}