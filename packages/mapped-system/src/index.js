import mapper from '@samtietjen/mapped-components';
import { arr, funcOrSplit, isObject, join, truncate } from './utilities';

const breakpoints = [null, 'md', 'lg'];

const getClassNameString = s => String(s).replace(/%/g, 'p');
const getClassNameNumber = n => (n > 0 && n < 1) ? truncate(n*100)+'p' : truncate(n);
const getClassNameValue = v => {
  const type = typeof(v);
  if (type === 'string') return getClassNameString(v);
  if (type === 'number') return getClassNameNumber(v);
  return null;
}

const getClassName = (breakpoint, root, value) => [breakpoint]
  .concat(funcOrSplit(root, getClassNameValue(value)))
  .filter(x => x || x === 0)
  .join('-');

const handleObject = (obj, root) => {
  let result = [];

  for (const key in obj) {
    const values = arr(obj[key]);
    
    values.forEach(value => {
      if(value === false) return;
      const breakpoint = breakpoints[values.indexOf(value)];
      result.push(getClassName(breakpoint, `${root}-${key}`, value));
    });
  }
  
  return join(result);
}

const getter = ({breakpoint, root, value}) => {
  if(value === false) return false;
  if(isObject(value)) return handleObject(value, root);
  return getClassName(breakpoint, root, value);
}

export default mapper({ breakpoints, getter });