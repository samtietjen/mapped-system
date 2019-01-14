import mapper from '@samtietjen/mapped-components';

const arr = n => Array.isArray(n) ? n : [n];

const isObject = value => value 
  && typeof value === 'object' 
  && value.constructor === Object;

const truncate = num => Math.trunc(Math.round(num));

const breakpoints = [null, 'md', 'lg'];

const getter = ({breakpoint, root, value}) => {
  if(value === false) return false;

  if(isObject(value)) {
    let result = [];
    
    for (const key in value) {      
      arr(value[key]).forEach((value, index) => {
        result.push(getter({
          breakpoint: breakpoints[index], 
          root: root + '-' + key,
          value
        }));
      });
    }
    
    return result.filter(x => x).join(' ');
  }

  const next = typeof(value) === 'string'
    ? String(value).replace(/%/g, 'p')
    : typeof(value) === 'number'
      ? (value > 0 && value < 1) 
        ? truncate(value*100)+'p' 
        : truncate(value)
      : null

  return [breakpoint]
    .concat(typeof(root) === 'function' ? [root(next)] : [root, next])
    .filter(x => x || x === 0)
    .join('-');
}

export default mapper({ breakpoints, getter });

export { default as withStyles } from './add-ons/withStyles';