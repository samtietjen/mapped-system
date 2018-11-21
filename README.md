# Mapped System
A React utility for building [single element](https://medium.freecodecamp.org/introducing-the-single-element-pattern-dfbd2c295c5d) components that map to your stylesheet.
- Reduce the logic in your component library.
- Increase readability for better communication.
- Create styling APIs without CSS-in-JS.

## Installation
```shell
npm i @samtietjen/mapped-system --save
```
<a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
<img src="https://img.shields.io/badge/stability-experimental-lightgrey.svg?style=flat-square"></a>
<a href="https://opensource.org/licenses/MIT">
<img src="https://img.shields.io/badge/license-MIT-black.svg?style=flat-square"></a>

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

render(
  <Text size={1}>Hello, World!</Text>
  // <p class="text text-size-1">Hello, World!</p>
);
```

## Syntax
- Segments are divided by `-`.
- Strings convert `%` characters to `p`.
- Numbers between `0` and `1` convert to percentages.
- Booleans add the class name while `true`.
- Floats round to the nearest integer.
- Objects prefix `keys` to `values`.
- Arrays prefix breakpoints `md` and `lg` at indexes `1` and `2`.

```jsx
<Text size="100%" />
// <p class="text text-size-100p"></p>

<Text size={1} />
// <p class="text text-size-1"></p>

<Text size={1/3} />
// <p class="text text-size-33p"></p> 

<Text size={2.5} />
// <p class="text text-size-3"></p>

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

render (
  <Heading size={1} color="primary" />
  // <h2 class="heading text-size-1 primary-color"></h2>
);
```

## Inspiration

- [Brent Jackson](http://jxnblk.com/) / [Styled System](https://github.com/jxnblk/styled-system) / [Rebass](https://github.com/rebassjs/rebass)
- [Diego Haz](https://twitter.com/diegohaz) / [Singel](https://github.com/diegohaz/singel) / [Reakit](https://github.com/reakit/reakit)

## License
MIT © [Sam Tietjen](https://samtietjen.com)