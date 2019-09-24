const arr = n => Array.isArray(n) ? n : [n];
const isObject = v => v && typeof v === 'object' && v.constructor === Object;
const joinString = (a, b) => a ? a + (a.length ? ' ' : '') + b : b;

export default ({ 
  breakpoints = [], 
  mappings = {}, 
  getter = () => {},
  output = 'string'
} = {}) => {
  const getRoot = k => mappings[k] !== undefined ? mappings[k] : k;
  const getBreakpoint = bp => isObject(bp) ? bp.label : bp;

  const fn = obj => {
    let result = output === 'object' ? {} : output === 'array' ? [] : null;
    
    for (let key in obj) {      
      if(mappings[key] === undefined) continue;
      
      const root = getRoot(key);
      const responsiveValues = arr(obj[key]);

      // Not a huge performance hit. Will optimize later.
      responsiveValues.forEach((value, i) => {
        // Ignore null values to prevent accidental class names.
        if (value === null || value === undefined) return; 
        
        const breakpoint = getBreakpoint(breakpoints[i]);
        const classNameString = getter({ breakpoint, root, value });

        if(!classNameString) return;
        if(output === 'array') result.push(classNameString);
        if(output === 'string') result = joinString(result, classNameString);
        if(output === 'object') result[key] = joinString(result[key], classNameString) 
      });
    }

    return result;
  }

  fn.mappings = mappings;
  fn.breakpoints = breakpoints;
  fn.getter = getter;

  return fn;
}