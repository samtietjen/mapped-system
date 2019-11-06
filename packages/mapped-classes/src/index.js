const toArray = n => Array.isArray(n) ? n : [n];
const joinString = (a, b) => a ? a + (a.length ? ' ' : '') + b : b;

export default ({ 
  breakpoints = [], 
  mappings = {}, 
  getter = () => {}
} = {}) => {
  const fn = obj => {
    let result = '';
    
    for (let key in obj) { 
      // Skip undefined mappings.
      if(mappings[key] === undefined) continue;

      // Skip null and undefined initial values.
      const initialValue = obj[key];   
      if(initialValue === undefined || initialValue === null) continue;
      
      // Accept null root values.
      const root = mappings[key] !== undefined ? mappings[key] : key;

      // Loop through responsive values.
      const responsiveValues = toArray(initialValue);
      const length = responsiveValues.length;
      for (let i = 0; i < length; i++) {
        // Skip null and undefined values.
        const value = responsiveValues[i];
        if (value === null || value === undefined) continue;

        // Use the getter to assemble the class name segments.
        const breakpoint = breakpoints[i];
        const className = getter({ breakpoint, root, value });
        result = className ? joinString(result, className) : result;
      }
    }

    return result || null;
  }

  fn.mappings = mappings;
  fn.breakpoints = breakpoints;
  fn.getter = getter;

  return fn;
}