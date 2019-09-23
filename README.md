<div align="center">
  <img src="https://tietjeninteractive.com/projects/mapped-system/mapped-system.svg" width="100px" />
</div>

<h1 align="center">Mapped System</h1>

<p align="center"><strong>Build design systems with stylesheets.
</strong><br/><sub>React elements that render consistent class names via props.</sub></p>

<div align="center">
  <a href="https://www.npmjs.com/package/@samtietjen/mapped-system">
    <img src="https://img.shields.io/badge/npm-v0.2.2-black.svg">
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-black.svg">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-black.svg">
  </a>
</div>

## Introduction
Mapped System is a library for creating React elements that render class names via props. It's great for building design system APIs into component libraries that use external stylesheets. Try it out on [CodeSandbox](https://codesandbox.io/s/mapped-system-basic-example-xcnbp)! 

### Features
- Renders consistent class names from props.
- Includes responsive `md` and `lg` prefixes.
- Supports custom rules with [Mapped Components](packages/mapped-components).
- Injects styles with optional [CSS Props](#css-props).
- Made to feel similar to [Styled System](https://github.com/styled-system/styled-system).
- Weights less than `~3kb`.


## Installation
```shell
npm i mapped-system --save
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

### Advanced
Functions can be used to handle complex styles.

```jsx
const Box = useMapper({
  width: n => n + 'w'
}, ({ className, width }) => ({
  className: className + (width > 3 && ' is-wide')
}));

Box.propTypes = {
  width: PropTypes.number
}

<Box width={1} />
// As a mapping it will pass its value as an argument.
// <div class="1w"></div>

<Box width={4} />
// As an argument it will merge its output with props.
// <div class="4w is-wide"></div>
```

## Utilities
Each component includes `base`, `blacklist`, and `tag` [utilities](packages/mapped-components#utilities). 

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

## CSS Props
Generate and inject styles (with [Emotion](https://emotion.sh)) by pairing props with CSS properties.

```jsx
import PropTypes from 'prop-types';
import useMapper from 'mapped-system';

const Box = useMapper({
  size: 'box-size'
});

Box.cssProps = {
  m: 'margin',
  my: ['margin-top', 'margin-bottom']
}

Box.propTypes = {
  size: PropTypes.string,
  m: PropTypes.any,
  my: PropTypes.any
}
```

Props will append values to their CSS properties.
```jsx
<Box size="large" my="100px" /> 
// <div class="box-size-large css-0"></div>
// .css-0 { margin-top: 100px; margin-bottom: 100px; }
```

Responsive breakpoints are set to `375px` and `1024px`. 

```jsx
<Box size="large" m={['100px', '200px']} /> 
// <div class="box-size-large css-0"></div>
// .css-0 { margin: '100px'; @media(min-width: 375px) { margin: 200px; } }
```

Modify these breakpoints by creating a new mapper.

```jsx
import PropTypes from 'prop-types';
import { createUseMapper } from 'mapped-system';

const useMapper = createUseMapper({
  breakpoints: [
    { label: null, minWidth: 0 },
    { label: 'md', minWidth: '600px' },
    { label: 'lg', minWidth: '1200px' }
  ]
});
```

## Packages
| Package | Stability | Description |
| ------- | --------- | ----------- |
| [Mapped Classes](packages/mapped-classes) | **Stable** | Objects to consistent class name strings. |
| [Mapped Components](packages/mapped-components) | Experimental | Write custom rules to fit your needs. |

## Credits
Inspired by [Styled System](https://github.com/styled-system/styled-system) and [Brent Jackson](https://jxnblk.com/).

## License
MIT © [Sam Tietjen](https://samtietjen.com)