# Mapped Components

<p>
  <a href="https://www.npmjs.com/package/mapped-components">
    <img src="https://img.shields.io/badge/npm-v0.1.2-black.svg">
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-black.svg">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-black.svg">
  </a>
</p>

**Single element React components for stylesheets.**  
In development and not ready for production use.  

## Installation
```shell
npm i mapped-components --save
```

## Usage

Create a mapper with an array of breakpoints and a getter function.

```jsx
import PropTypes from 'prop-types';
import createMapper from 'mapped-components';

const useMapper = createMapper({
  breakpoints: [null, 'md', 'lg'],
  getter: ({ breakpoint, root, value }) =>
    [breakpoint, root, value]
      .filter(x => x || x === 0) // Value can be 0.
      .join('-') // Separate segments with a dash.
});
```

Pass an object that pairs props with the root of a class name to use it.

```jsx
const Box = useMapper({
  size: 'box-size'
});

Box.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array
  ])
}
```

When the prop receives a value it will use the getter to attach it to the root.

```jsx
<Box size={0} />
// <div class="box-size-0"></div>

<Box size="large" />
// <div class="box-size-large"></div>
```

If the value is an array then a responsive class will be added for each item.

```jsx
<Box size={[1, 2, 3]} />
// Breakpoints specified in the mapper: [null, 'md', 'lg']
// <div class="box-size-1 md-box-size-2 lg-box-size-3"></div>
```

## Utilities
Each component includes a set of built-in utility props. If you'd like to create your own utilities try forking this repository or creating a new one using [Mapped Components](../packages/mapped-components).

### base
Prepend a class to the class list.
- type: `string`

```jsx
<Box base="box" size={1} /> 
// <div class="box box-size-1"></div>
```

### blacklist
Block attributes from an element.
- type: `array`

```jsx
<Box blacklist={['href']} href="#" /> 
// <div></div>
```

### tag
Transform the HTML tag.
- type: `string`
- default: `div`

```jsx
<Box tag="h2" /> 
// <h2></h2>
```

## License
MIT © [Sam Tietjen](https://samtietjen.com)