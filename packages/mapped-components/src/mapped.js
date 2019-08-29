import React from 'react';
import { omit, joinStrings, objectToString } from './utilities';

const getAttributes = (props, mapper, mcObject) => {
  const { 
    base = '', 
    blacklist = [], 
    className = '', 
    component,
    ...otherProps 
  } = props;

  // Omit blacklisted, utility, and mapping props.
  const mappingKeys = Object.keys(mapper.mappings);
  const omissions = blacklist.concat(mappingKeys);
  const attributes = omit(otherProps, omissions);
  
  // Join the base, mapped, and element class names.
  const mappedClassString = objectToString(mcObject);
  attributes.className = joinStrings(base, mappedClassString, className);

  return attributes;
}

export default (props, mapper) => {  
  const { tag = 'div', ...otherProps } = props;
  const mcObject = mapper(otherProps);
  const attributes = getAttributes(otherProps, mapper, mcObject);
  return React.createElement(tag, attributes);;
};