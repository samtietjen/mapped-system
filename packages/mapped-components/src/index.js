import React from 'react';
import useMappedClasses from 'mapped-classes';
import mapped from './mapped';
import emotion from './emotion';
import { mergeObjFunc } from './utilities';

const createUseMapper = config => (mappings, callback) => {
  const { breakpoints } = config;

  const mapper = useMappedClasses({ 
    ...config,
    mappings,
    breakpoints,
    output: 'object'
  });

  const MappedComponent = React.forwardRef((props, ref) => {
    const { cssProps } = MappedComponent;
    const propsWithCallback = { ...mergeObjFunc(props, callback), ref }
    const constructor = cssProps ? emotion : mapped;
    return constructor(propsWithCallback, mapper, breakpoints, cssProps);
  });

  MappedComponent.isMappedComponent = true;
  MappedComponent.mappings = mappings;
  MappedComponent.breakpoints = breakpoints;

  return MappedComponent;
};

export default createUseMapper;