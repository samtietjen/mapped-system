<p align="center">
  <img src="https://samtietjen.com/static/images/mapped-system-github.svg" width="250px" />
</p>

<p align="center">
  Build <a href="https://medium.freecodecamp.org/introducing-the-single-element-pattern-dfbd2c295c5d">single element</a> components that map to your stylesheet.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@samtietjen/mapped-system">
    <img src="https://img.shields.io/badge/npm-v0.1.1-black.svg?style=flat-square">
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-lightgrey.svg?style=flat-square">
  </a>
  <a href="https://img.shields.io/badge/size-3kb-black.svg?style=flat-square">
    <img src="https://img.shields.io/badge/size-3kb-black.svg?style=flat-square">
  </a>
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/library-React-black.svg?style=flat-square">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-black.svg?style=flat-square">
  </a>
</p>

## Installation
```shell
npm i @samtietjen/mapped-system --save
```

## Usage
Create a component by passing `mapped` an object that pairs prop keys with class names. This example includes two built-in utilities for prepending a `base` class and transforming the element's HTML `tag`.

```jsx
import PropTypes from 'prop-types';
import mapped from '@samtietjen/mapped-system';

const Text = mapped({
  size: 'text-size'
});

Text.propTypes = {
  base: PropTypes.string,
  tag: PropTypes.string,
  size: PropTypes.number
}

Text.defaultProps = {
  base: 'text',
  tag: 'p'
}

export default Text;
```

**Example:** `Text` uses `size` to append `1` to `text-size`.

```jsx
<Text size={1}>Hello, World!</Text>
// <p class="text text-size-1">Hello, World!</p>
```

## Syntax
### Structure
- Breakpoints are responsive prefixes. (e.g. `lg`)
- Roots are paired with prop keys. (e.g. `text-size`)
- Values are received via props. (e.g. `1`)
- Segments are separated by `-`.

```scss
.lg-text-size-1 { font-size: 1rem }
// .[breakpoint]-[root]-[value]
```

### Values
- Percent signs convert to `p`.
- Floats round to the nearest integer.
- Numbers between 0 and 1 convert to percentages.
- Booleans add the root while `true`.
- Objects prefix keys to values.
- Arrays add breakpoints `md` and `lg` at indexes 1 and 2.

```jsx
<Text size="100%" />
// <p class="text text-size-100p"></p> 

<Text size={2.5} />
// <p class="text text-size-3"></p>

<Text size={1/3} />
// <p class="text text-size-33p"></p> 

<Text size={true} />
// <p class="text text-size"></p>

<Text size={{large: true, children: 1}} />
// <p class="text text-size-large text-size-children-1"></p>

<Text size={[1, 2, 3]} />
// <p class="text text-size-1 md-text-size-2 lg-text-size-3"></p>
```

## Extending
Use a component's `mappings` and `propTypes` to extend it.
```jsx
import PropTypes from 'prop-types';
import Text from './Text';

const Heading = {
  ...Text.mappings,
  color: value => value + '-color'
}

Heading.propTypes = {
  ...Text.propTypes,
  color: PropTypes.string
}

Heading.defaultProps = {
  base: 'heading',
  tag: 'h2'
}
```

**Example:** `Heading` inherits `size` from `Text`.

```jsx
<Heading size={1} color="primary" />
// <h2 class="heading text-size-1 primary-color"></h2>
```

## Inspiration
- [Brent Jackson](http://jxnblk.com/)'s [Styled System](https://github.com/jxnblk/styled-system) and [Rebass](https://github.com/rebassjs/rebass).
- [Diego Haz](https://twitter.com/diegohaz)'s [Reakit](https://github.com/reakit/reakit) and [Singel](https://github.com/diegohaz/singel).

## License
MIT © [Sam Tietjen](https://samtietjen.com)