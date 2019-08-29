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

  const Comp = props => {
    const { cssProps } = Comp;
    const next = mergeObjFunc(props, callback)

    return cssProps
      ? emotion(next, mapper, cssProps, config.breakpoints)
      : mapped(next, mapper)
  };

  Comp.isMappedComponent = true;

  return Comp;
};

export default createUseMapper;