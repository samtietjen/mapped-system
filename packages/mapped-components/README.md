<div align="center">
  <img src="https://tietjeninteractive.com/projects/mapped-system/mapped-components.svg" width="100px" />
</div>

<h1 align="center">Mapped Components</h1>

<p align="center">React components that render class names from props<br/>
<sub><a href="#Installation">Installation</a> : <a href="#Usage">Usage</a> : <a href="#Utilities">Utilities</a> : <a href="#CSS-Props">CSS Props</a> : <a href="#Extending">Extending</a> : <a href="#License">License</a></sub></p>

<p align="center">
  <a href="https://www.npmjs.com/package/mapped-components">
    <img src="https://img.shields.io/badge/npm-v0.3.0-black.svg">
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-black.svg">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-black.svg">
  </a>
</p>

## Installation
```shell
npm i mapped-components --save
```

## Usage
Components are created by a mapper that defines how class names are assembled.

```jsx
import PropTypes from 'prop-types';
import createMapper from 'mapped-components';

const useMapper = createMapper({
  breakpoints: [
    { label: null, minWidth: 0 },
    { label: 'md', minWidth: '600px' },
    { label: 'lg', minWidth: '1200px' }
  ],
  getter: ({ breakpoint, root, value }) =>
    [breakpoint, root, value]
      .filter(x => x || x === 0) // Value can be 0.
      .join('-') // Separate segments with a dash.
});
```

Simply pass the mapper an object that pairs props with class names.

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

When a value is received it will be sent to the getter with the prop's class name (or `root`).

```jsx
<Box size={0} />
// <div class="box-size-0"></div>
```

If the value is an array then the relevant breakpoint will sent as well.

```jsx
<Box size={[1, 2, 3]} />
// Breakpoint labels specified in the mapper: [null, 'md', 'lg']
// <div class="box-size-1 md-box-size-2 lg-box-size-3"></div>
```

## Utilities
Each component includes a set of built-in utility props.

### base
Prepend a class to the class list.
- Type: `string`
```jsx
<Box base="box" size={1} /> 
// <div class="box box-size-1"></div>
```

### blacklist
Block attributes from an element.
- Type: `array`
```jsx
<Box blacklist={['href']} href="#" /> 
// <div></div>
```

### tag
Transform the HTML tag.
- Type: `string`
- Default: `div`
```jsx
<Box tag="h2" /> 
// <h2></h2>
```

## CSS Props
Generate and inject styles by pairing props with CSS properties.

```jsx
Box.cssProp = {
  m: ['margin'],
}

<Box m="10px" />
// <div class="css-0"></div>
// .css-0 { margin: 10px; }
```

## Extending
Components maintain `mappings`, `propTypes`, and `cssProps`.

```jsx
const Section = useMapper({
  ...Box.mappings
});

Section.propTypes = {
  ...Box.propTypes
}

Section.cssProps = {
  ...Box.cssProps
}

Section.defaultProps = {
  tag: 'section'
}
```

## License
MIT © [Sam Tietjen](https://samtietjen.com)