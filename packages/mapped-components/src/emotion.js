import React from 'react';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { joinStrings, objectToString, toArray } from './utilities';

const createStyles = (props, cssProps, breakpoints) => {
  let result = '';

  for (const prop in props) {
    const p = cssProps[prop];
    const v = props[prop];
    if(!p || !v) continue;

    const properties = toArray(p);
    const values = toArray(v);
    
    values.forEach((value, index) => {
      let css = '';
      const { minWidth } = breakpoints[index];

      properties.forEach(property => {
        css = css + ` ${property}: ${value};`
      });

      result = minWidth
        ? result + ` @media(min-width: ${minWidth}) {${css}}`
        : result + css
    });
  }

  return result;
}

export default (props, mapper, cssProps, breakpoints) => {
  const { mappings } = mapper;
  const { base, className, tag = 'div' } = props;

  const mcObject = mapper(props);
  const mcClasses = objectToString(mcObject);
  const styles = createStyles(props, cssProps, breakpoints)
  const cx = joinStrings(base, mcClasses, className);

  const MappedComponent = styled(tag, {
    shouldForwardProp: prop =>
      isPropValid(prop) 
      && !cssProps[prop] 
      && !mappings[prop]
  })`${styles}`;

  return <MappedComponent {...props} className={cx} />;
}