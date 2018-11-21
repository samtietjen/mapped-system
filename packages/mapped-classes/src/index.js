const arr = n => Array.isArray(n) ? n : [n];

export default ({ 
  breakpoints = [], 
  mappings = {}, 
  getter
} = {}) => {
  const map = key => mappings[key] !== undefined ? mappings[key] : key;

  const fn = obj => {
    const classNames = [];

    for (let key in obj) {
      const value = obj[key];
      if (value === null || value === undefined) continue; 

      arr(value).forEach((val, i) => {
        if (val === null || val === undefined) return;  
        
        const got = getter({
          breakpoint: breakpoints[i],            
          root: map(key),
          value: val
        });

        if(got) classNames.push(got);
      });
    }

    return classNames.join(' ') || null;
  }

  return fn;
}