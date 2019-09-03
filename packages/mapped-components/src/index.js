import React from 'react';
import useMappedClasses from 'mapped-classes';
import mapped from './mapped';
import emotion from './emotion';
import { mergeObjFunc } from './utilities';

const createUseMapper = config => (mappings, callback) => {

  const breakpoints = config.breakpoints
    .map(b => b.label);

  const mapper = useMappedClasses({ 
    ...config,
    mappings,
    breakpoints,
    output: 'object'
  });

  const MappedComponent = React.forwardRef((props, ref) => {
    const { cssProps } = MappedComponent;
    const next = { ...mergeObjFunc(props, callback), ref }

    return cssProps
      ? emotion(next, mapper, cssProps, config.breakpoints)
      : mapped(next, mapper);
  });

  MappedComponent.isMappedComponent = true;

  return MappedComponent;
};

export default createUseMapper;