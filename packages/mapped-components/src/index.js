import React from 'react';
import createMapper from '@samtietjen/mapped-classes';

export const omit = (obj, keys) => {
  const next = {};
  for (let key in obj) {
    if (keys.indexOf(key) > -1) continue;
    next[key] = obj[key];
  }
  return next;
}

export default config => (mappings, cb) => {
  const mapped = createMapper({ ...config, mappings })

  const classNames = ({ base, className, ...obj }) => {
    const values = {}
    for (let key in obj) {
      if (mappings[key] === undefined) continue;
      values[key] = obj[key];
    }

    const result = [base, mapped(values), className].filter(x => x);
    return result.length ? result.join(' ') : null;
  }

  const Component = props => {
    const { blacklist, tag, ...rest } = typeof(cb) === 'function' 
      ? { ...props, ...cb(props) } 
      : props;

    return React.createElement(tag || 'div', { 
      className: classNames(rest), 
      ...omit(rest, [
        ...Object.keys(mappings),
        ...['base', 'blacklist', 'className', 'tag'],
        ...blacklist || []
      ])
    })
  }

  Component.mappings = mappings;
  Component.classNames = classNames;
  Component.mappedComponent = true;

  return Component;
}