import React from 'react';
import useMappedClasses from 'mapped-classes';

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

const getAttributes = (props, mapper) => {
  const { 
    base = '', 
    blacklist = [], 
    className = '', 
    component,
    ...otherProps 
  } = props;

  // Omit blacklisted, utility, and mapping props.
  const mappingKeys = Object.keys(mapper.mappings);
  const omissions = [...blacklist, ...mappingKeys, 'tag'];
  const attributes = omit(otherProps, omissions);
  
  // Join the base, mapped, and element class names.
  const mappedClassString = mapper(otherProps);
  attributes.className = joinStrings(base, mappedClassString, className);

  return attributes;
}

const createUseMapper = config => (mappings, callback) => {
  const { breakpoints } = config;

  const mapper = useMappedClasses({ ...config, mappings, breakpoints });

  const MappedComponent = React.forwardRef((props, ref) => {
    const { tag = 'div' } = props;
    const propsWithCallback = { ...mergeObjFunc(props, callback), ref }
    const attributes = getAttributes(propsWithCallback, mapper);
    return React.createElement(tag, attributes);;
  });

  MappedComponent.isMappedComponent = true;
  MappedComponent.mapper = mapper;
  MappedComponent.mappings = mappings;
  MappedComponent.breakpoints = breakpoints;

  return MappedComponent;
};

export default createUseMapper;