import React from 'react';
import useMappedClasses from 'mapped-classes';

export const omit = (obj, keys) => {
  const next = {};
  for (let key in obj) {
    if (keys.indexOf(key) > -1) continue;
    next[key] = obj[key];
  }
  return next;
};

const createUseMapper = config => mappings => {
  const mapper = useMappedClasses({...config, mappings});

  const MappedComponent = React.forwardRef((props, ref) => {
    const { base, blacklist = [], className, tag = 'div' } = props;

    // Block unwanted html attributes.
    const mappingProps = Object.keys(mappings);
    const utilityProps = ['base', 'blacklist', 'tag'];
    const omissions = [...blacklist, ...mappingProps, ...utilityProps];
    const attributes = omit(props, omissions);

    // Join and attach the new class name string.
    const cx = [base, mapper(props), className].filter(Boolean).join(' ');
    return React.createElement(tag, { ...attributes, className: cx, ref });;
  });

  MappedComponent.isMappedComponent = true;
  MappedComponent.mapper = mapper;
  MappedComponent.mappings = mappings;

  return MappedComponent;
};

export default createUseMapper;