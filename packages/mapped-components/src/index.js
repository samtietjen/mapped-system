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

  const Component = ({ blacklist, ...rest }) => (
    React.createElement(rest.tag || 'div', { 
      className: classNames(rest), 
      ...omit(rest, [
        ...Object.keys(mappings),
        ...['base', 'blacklist', 'className', 'tag'],
        ...blacklist || []
      ])
    })
  );

  Component.mappings = mappings;
  Component.classNames = classNames;
  Component.mappedComponent = true;

  return Component;
}