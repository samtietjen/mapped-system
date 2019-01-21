<div align="center">
  <img src="https://samtietjen.com/static/images/mapped-system.svg" width="125px" />
</div>

<h1 align="center">Mapped System</h1>

<p align="center"><a href="https://medium.freecodecamp.org/introducing-the-single-element-pattern-dfbd2c295c5d">Single element</a> React components that map to your stylesheet.</strong></p>

<div align="center">
  <a href="https://www.npmjs.com/package/@samtietjen/mapped-system">
    <img src="https://img.shields.io/badge/npm-v0.2.1-black.svg">
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
```js
import PropTypes from 'prop-types';
import mapped from '@samtietjen/mapped-system';

const Text = mapped({
  size: 'text-size',
  color: value => `is-${value}-color`
});

Text.propTypes = {
  tag: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string
}

// Uses a built-in utility
Text.defaultProps = {
  tag: 'p'
}
```

`Text` uses `size` and `color` to create class names.

```jsx
<Text size={1} />
// Use `size` to append a number to `text-size`.
// <p class="text-size-1"></p>

<Text color="primary" />
// Use `color` to pass a string to a function.
// <p class="is-primary-color"></p>
```

The prop's type and characters may affect how it appends.

```jsx
<Text size="100%" />
// Percentage signs convert to `p`.
// <p class="text-size-100p"></p> 

<Text size={2.5} />
// Floats round to the nearest integer.
// <p class="text-size-3"></p>

<Text size={1/3} />
// Numbers between `0` and `1` convert to percentages.
// <p class="text-size-33p"></p> 

<Text size={true} />
// Booleans add the class name while `true`.
// <p class="text-size"></p>

<Text size={{large: true, children: 1}} />
// Objects prefix keys to values.
// <p class="text-size-large text-size-children-1"></p>

<Text size={[1, 2, 3]} />
// Arrays prefix breakpoints `md` and `lg` at indexes `1` and `2`.
// <p class="text-size-1 md-text-size-2 lg-text-size-3"></p>
```

Each component includes [`base`](packages/mapped-components#base), [`blacklist`](packages/mapped-components#blacklist), and [`tag`](packages/mapped-components#tag) utilities.

```jsx
<Text base="text" size={1} /> 
// Prepend a class to the class list.
// <p class="text text-size-1"></p>

<Text id="my-id" href="#" blacklist={['href']} /> 
// Block attributes from an element.
// <p id="my-id"></p>

<Text tag="h2" /> 
// Transform the HTML tag.
// <h2></h2>
```

## Packages
| Package | Stability |
| ------- | --------- |
| [Mapped Classes](packages/mapped-classes) | **Stable** |
| [Mapped Components](packages/mapped-components) | Experimental |

## Credits
Inspired by [Brent Jackson](http://jxnblk.com/)'s [Styled System](https://github.com/jxnblk/styled-system) and [Diego Haz](https://twitter.com/diegohaz)'s [Singel](https://github.com/diegohaz/singel).

## License
MIT © [Sam Tietjen](https://samtietjen.com)