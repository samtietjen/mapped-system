import mapper from 'mapped-components';

const toArray = n => Array.isArray(n) ? n : [n];
const truncate = num => Math.trunc(Math.round(num));
const isObject = value => value 
  && typeof value === 'object' 
  && value.constructor === Object;
  
const formatValue = (value, type) => 
  type === 'string'
    // If the value is a string
    // convert % characters to p.
    // Else check if it's a number.
    ? String(value).replace(/%/g, 'p') 
    : type === 'number'
      // If a number is a fraction
      // convert it to a percentage.
      // Else round to the nearest integer.
      ? value > 0 && value < 1 
        ? truncate(value*100)+'p' 
        : truncate(value) 
      // If a value is a function
      // execute that function.
      // Else return null.
      : type === 'function'
        ? value() 
        : null

        
// If a root is a function pass the value to it.
// Keep any defined values and zeros.
// Separate each segment with a dash.
const joinSegments = (breakpoint, root, value) => [breakpoint]
  .concat(typeof(root) === 'function' ? [root(value)] : [root, value])
  .filter(x => x || x === 0)
  .join('-');

const breakpoints = [null, 'md', 'lg'];

const getter = ({breakpoint, root, value}) => {
  if(value === false) return false;

  // Objects recursively call the getter.
  // This means { height: { large: 1 } }
  // will become height-large-1.
  if(isObject(value)) {
    let result = [];

    for (const key in value) {     
      const responsiveValues = toArray(value[key])
      responsiveValues.forEach((value, index) => {
        const nB = breakpoints[index];
        const nR = root + '-' + key;
        result.push(getter({ breakpoint: nB, root: nR, value }));
      });
    }

    return result.filter(Boolean).join(' ');
  }

  const type = typeof(value);
  const next = formatValue(value, type);
  return joinSegments(breakpoint, root, next);
}

export const createUseMapper = config => mapper({breakpoints, getter, ...config });
export default mapper({ breakpoints, getter });