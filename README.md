<div align="center">
  <img src="https://samtietjen.com/static/images/mapped-system.svg" width="100px" />
</div>

<h1 align="center">Mapped System</h1>

<p align="center"><a href="https://medium.freecodecamp.org/introducing-the-single-element-pattern-dfbd2c295c5d">Single element</a> React components that map to your stylesheet.</strong></p>

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

## Installation
```shell
npm i @samtietjen/mapped-system --save
```

## Usage
Create a component by pairing props (i.e. `size`) with class names (i.e. `box-size`).

```jsx
import PropTypes from 'prop-types';
import mapped from '@samtietjen/mapped-system';

const Box = mapped({
  size: 'box-size'
});

Box.propTypes = {
  base: PropTypes.string,
  blacklist: PropTypes.string,
  tag: PropTypes.string,
  size: PropTypes.any
}
```

Props will modify these class names by appending values to them.

```jsx
<Box size={1} />
// Segments are separated by a dash.
// <div class="text-size-1"></div>

<Box size="100%" />
// Percentage signs convert to `p`.
// <div class="text-size-100p"></div>

<Box size={2.5} />
// Floats round to the nearest integer.
// <div class="text-size-3"></div>

<Box size={1/3} />
// Numbers between `0` and `1` convert to percentages.
// <div class="text-size-33p"></div>

<Box size={true} />
// Booleans add the class name while `true`.
// <div class="text-size"></div>

<Box size={{large: true, children: 1}} />
// Objects prefix keys to values.
// <div class="text-size-large text-size-children-1"></div>

<Box size={[1, 2, 3]} />
// Arrays prefix breakpoints `md` and `lg` at indexes `1` and `2`.
// <div class="text-size-1 md-text-size-2 lg-text-size-3"></div>

<Box size={() => 1 + 2} />
// Functions execute and add their result.
// <div class="text-size-3"></div>
```

Each component includes [`base`](packages/mapped-components#base), [`blacklist`](packages/mapped-components#blacklist), and [`tag`](packages/mapped-components#tag) utilities.

```jsx
<Box size={1} base="box" /> 
// Prepend a class to the class list.
// <div class="box box-size-1"></div>

<Box href="#" blacklist={['href']} /> 
// Block attributes from an element.
// <div></div>

<Box tag="h2" /> 
// Transform the HTML tag.
// <h2></h2>
```

### Advanced

Functions can be used to handle complex styles.

```jsx
const Box = mapped({
  width: n => n + 'w'
}, ({ className, width }) => ({
  className: className + (width > 3 && ' is-wide')
}));

Box.propTypes = {
  width: PropTypes.string
}
```

Mapping a prop to a function will pass its value as an argument.

```jsx
<Box width={1} />
// 1 + w = 1w
// <div class="1w"></div>
```

Passing a function as an argument will merge its output with props.

```jsx
<Box width={4} />
// Adds 'is-wide' while width > 3.
// <div class="4w is-wide"></div>
```

## Packages
| Package | Stability |
| ------- | --------- |
| [Mapped Classes](packages/mapped-classes) | **Stable** |
| [Mapped Components](packages/mapped-components) | Experimental |

## Inspiration
- [Brent Jackson](http://jxnblk.com/)'s [Styled System](https://github.com/jxnblk/styled-system)
- [Diego Haz](https://twitter.com/diegohaz)'s [Singel](https://github.com/diegohaz/singel)

## License
MIT © [Sam Tietjen](https://samtietjen.com)