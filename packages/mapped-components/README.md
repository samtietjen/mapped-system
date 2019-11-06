<div align="center">
  <img src="https://tietjeninteractive.com/projects/mapped-system/mapped-components.svg" width="100px" />
</div>

<h1 align="center">Mapped Components</h1>

<p align="center">React components that render class names from props<br/>
<sub><a href="#Installation">Installation</a> : <a href="#Usage">Usage</a> : <a href="#Utilities">Utilities</a> : <a href="#Extending">Extending</a> : <a href="#License">License</a></sub></p>

<p align="center">
  <a href="https://www.npmjs.com/package/mapped-components">
    <img src="https://img.shields.io/badge/npm-v0.5.0-black.svg">
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
Create a mapper by defining breakpoints and a getter.

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

Create a component by pairing props with the root of a class name.

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

When a prop receives a value it will be sent to the getter with its root.

```jsx
<Box size={0} />
// <div class="box-size-0"></div>
```

Arrays will also send the getter a breakpoint of a matching index.

```jsx
<Box size={[1, 2, 3]} />
// <div class="box-size-1 md-box-size-2 lg-box-size-3"></div>
```

## Utilities
Each component includes a set of utility props.

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

## Extending
Components maintain their `mappings` and `propTypes`.

```jsx
const Section = useMapper({
  ...Box.mappings
});

Section.propTypes = {
  ...Box.propTypes
}

Section.defaultProps = {
  tag: 'section'
}
```

## License
MIT © [Sam Tietjen](https://samtietjen.com)