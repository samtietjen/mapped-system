import React from 'react';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { joinStrings, objectToString, toArray, camelCaseToDash } from './utilities';

const mxShorthands = {
  m: 'margin',
  mt: 'margin-top',
  mr: 'margin-right',
  mb: 'margin-bottom',
  ml: 'margin-left',
  mx: ['margin-left', 'margin-right'],
  my: ['margin-top', 'margin-bottom'],
  p: 'padding',
  pt: 'padding-top',
  pr: 'padding-right',
  pb: 'padding-bottom',
  pl: 'padding-left',
  px: ['padding-left', 'padding-right'],
  py: ['padding-top', 'padding-bottom']
}

const normalizeStyles = (props, cssProps, mx) => {
  let result = [];

  if(cssProps) {
    for (const prop in cssProps) {
      const values = toArray(props[prop]);
      const properties = toArray(cssProps[prop]);
      if(!values || !properties) continue;
      result.push({ values, properties });
    }
  }

  if(mx) {
    const shorthandKeys = Object.keys(mxShorthands);
    for (const property in mx) {
      const p = shorthandKeys.includes(property) ? mxShorthands[property] : property;
      const values = toArray(mx[property]);
      const properties = toArray(camelCaseToDash(p));
      result.push({properties, values});
    }
  }

  return result;
}

const createStyles = (props, cssProps, breakpoints) => {
  const { mx } = props;
  const styles = normalizeStyles(props, cssProps, mx);
  
  return styles.reduce((acc, obj) => {
    const { properties, values } = obj;

    values.forEach((value, index) => {
      let css = '';
      const { minWidth } = breakpoints[index];
      properties.forEach(property => css += ` ${property}: ${value};`);
      acc += minWidth ? ` @media(min-width: ${minWidth}) {${css}}` : css;
    });

    return acc
  }, '');
}

export default (props, mapper, breakpoints, cssProps) => {
  const { base, className, tag = 'div' } = props;
  const { mappings } = mapper;

  const classes = objectToString(mapper(props));
  const cx = joinStrings(base, classes, className);
  const styles = createStyles(props, cssProps, breakpoints);

  const MappedComponent = styled(tag, {
    shouldForwardProp: prop =>
      isPropValid(prop) 
      && !cssProps[prop] 
      && !mappings[prop]
  })`${styles}`;

  return <MappedComponent {...props} className={cx} />;
}