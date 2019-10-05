<div align="center">
  <img src="https://tietjeninteractive.com/projects/mapped-system/mapped-system.svg" width="100px" />
</div>

<h1 align="center">Mapped System</h1>

<p align="center">React style props that render consistent class names<br/>
<sub><a href="#Introduction">Introduction</a> : <a href="#Installation">Installation</a> : <a href="#Usage">Usage</a> : <a href="#Packages">Packages</a> : <a href="#Credits">Credits</a> : <a href="#License">License</a></sub></p>

<div align="center">
  <a href="https://www.npmjs.com/package/@samtietjen/mapped-system">
    <img src="https://img.shields.io/badge/npm-v0.3.0-black.svg">
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-black.svg">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-black.svg">
  </a>
</div>

## Introduction
Mapped System is a library for creating React elements that render class names from props. It takes a simple, easy-to-maintain, rules-based approach without tedious logic. [Try it out on CodeSandbox!](https://codesandbox.io/s/mapped-system-basic-example-xcnbp)

## Installation
```shell
npm i mapped-system
```

## Usage
Create a component by pairing props (i.e. `size`) with class names (i.e. `box-size`).

```jsx
import PropTypes from 'prop-types';
import useMapper from 'mapped-system';

const Box = useMapper({
  size: 'box-size'
});

Box.propTypes = {
  size: PropTypes.any
}
```

Props will append values to their class names.

```jsx
<Box size={1} />
// Segments are separated by a dash.
// <div class="box-size-1"></div>

<Box size="100%" />
// Percentage signs convert to `p`.
// <div class="box-size-100p"></div>

<Box size={2.5} />
// Floats round to the nearest integer.
// <div class="box-size-3"></div>

<Box size={1/3} />
// Numbers between `0` and `1` convert to percentages.
// <div class="box-size-33p"></div>

<Box size={true} />
// Booleans add the class name while `true`.
// <div class="box-size"></div>

<Box size={{large: true, children: 1}} />
// Objects prefix keys to values.
// <div class="box-size-large box-size-children-1"></div>

<Box size={[1, 2, 3]} />
// Arrays prefix breakpoints `md` and `lg` at indexes `1` and `2`.
// <div class="box-size-1 md-box-size-2 lg-box-size-3"></div>

<Box size={() => 1 + 2} />
// Functions return their output.
// <div class="box-size-3"></div>
```

### Functions
Functions can be used to handle complex styles.

```jsx
const Box = useMapper({
  size: n => 'size-' n + '-box'
}, ({ className, size }) => ({
  className: className + (size > 3 && ' is-large')
}));

<Box size={1} />
// As a mapping it will pass its value as an argument.
// <div class="size-4-box"></div>

<Box size={4} />
// As an argument it will merge its output with props.
// <div class="size-4-box is-large"></div>
```

### Utilities
Each component includes [`base`](packages/mapped-components#base), [`blacklist`](packages/mapped-components#blacklist), and [`tag`](packages/mapped-components#tag) utilities.

```jsx
<Box base="box" size={1} /> 
// Prepend a class to the class list.
// <div class="box box-size-1"></div>

<Box blacklist={['href']} href="#" /> 
// Block attributes from an element.
// <div></div>

<Box tag="h2" /> 
// Transform the HTML tag.
// <h2></h2>
```

### CSS Props
Generate and inject styles by pairing props with CSS properties.

```jsx
Box.cssProps = {
  m: ['margin']
}

<Box m="100px" /> 
// <div class="css-0"></div>
// .css-0 { margin: '100px'; }
```

### Extending
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

### Customizing
To modify the [mapper](packages/mapped-components#Usage) directly use `createUsMapper`.

```jsx
import { createUseMapper } from 'mapped-system';

const useMapper = createUseMapper({
  breakpoints: [
    { label: null, minWidth: 0 },
    { label: 'md', minWidth: '375px' },
    { label: 'lg', minWidth: '1024px' }
  ]
});
```

## Packages
|     | Package | Stability | Description |
| --- | ------- | --------- | ----------- |
| <img src="https://tietjeninteractive.com/projects/mapped-system/mapped-components.svg" width="24px" /> | [Mapped Components](packages/mapped-components) | Experimental | React components that render class names from props |
| <img src="https://tietjeninteractive.com/projects/mapped-system/mapped-classes.svg" width="24px" /> | [Mapped Classes](packages/mapped-classes) | Stable | Convert objects into consistent class name strings |

## Credits
Inspired by [Styled System](https://github.com/styled-system/styled-system) and [Brent Jackson](https://jxnblk.com/).

## License
MIT © [Sam Tietjen](https://samtietjen.com)