import createMapper from './src';

const breakpoints = [null, 'md', 'lg'];

const mappings = { 
  display: null, 
  fontSize: 'font-size', 
  padding: 'p' 
};

const getter = ({ breakpoint, root, value }) => 
  [breakpoint, root, value]
    .filter(x => x && value !== false || x === 0)
    .join('-');

const mapper = createMapper({ 
  breakpoints, 
  mappings, 
  getter 
});

const mapperAsArray = createMapper({ 
  breakpoints,
  mappings,
  getter,
  output: 'array' 
});

const mapperAsObject = createMapper({ 
  breakpoints,
  mappings,
  getter,
  output: 'object' 
});

test('Returns mapping for matching roots.', () => {
  const a = mapper({ padding: 1 });
  expect(a).toBe('p-1');  
});

test('Returns a string from multiple props.', () => {
  const a = mapper({ fontSize: 1, padding: [1, 2] });
  expect(a).toBe('font-size-1 p-1 md-p-2');  
});

test('Allows null mappings.', () => {
  const a = mapper({ display: 'block' });
  expect(a).toBe('block');  
});

test('Ignores keys that are not mappings.', () => {
  const a = mapper({ unlisted: 1, padding: 2 });
  expect(a).toBe('p-2');
});

test('Ignores null values.', () => {
  const a = mapper({ padding: null });
  expect(a).toBeNull();
});

test('Returns responsive values.', () => {
  const a = mapper({ padding: [1, 2, 3] });
  expect(a).toBe('p-1 md-p-2 lg-p-3');  
});

test('Ignores null breakpoints.', () => {
  const a = mapper({ padding: [null, 2] });
  expect(a).toBe('md-p-2');
});

test('Can reject while false.', () => {
  const a = mapper({ padding: false });
  const b = mapper({ padding: true });
  const c = mapper({ padding: [1, false, 3] });
  expect(a).toBeNull;
  expect(b).toBe('p-true');
  expect(c).toBe('p-1 lg-p-3');
});

test('Accepts 0 values.', () => {
  const a = mapper({ padding: 0 });
  expect(a).toBe('p-0');  
});