const arr = n => Array.isArray(n) ? n : [n];

export default ({ 
  breakpoints = [], 
  mappings = {}, 
  getter = () => {},
  output = 'string'
} = {}) => {
  const map = key => mappings[key] !== undefined ? mappings[key] : key;

  const fn = obj => {
    const asArray = [];
    const asObject = {};
    
    for (let key in obj) {
      if(mappings[key] === undefined) continue;

      const value = obj[key];
      if (value === null || value === undefined) continue; 

      arr(value).forEach((val, i) => {
        if (val === null || val === undefined) return;  
        
        const result = getter({
          breakpoint: breakpoints[i],            
          root: map(key),
          value: val
        });

        if(result) {
          asArray.push(result);
          if(output === 'object') {
            const existingValue = asObject[key]; 
            asObject[key] = existingValue 
              ? existingValue + ' ' + result 
              : result;
          }
        }
      });
    }

    return output === 'string'
      ?  asArray.join(' ') || null 
        : output === 'object'
          ? asObject
          : asArray 
  }

  fn.mappings = mappings;
  fn.breakpoints = breakpoints;
  fn.getter = getter;

  return fn;
}