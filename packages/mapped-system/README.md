# Mapped System

<p>
  <a href="https://www.npmjs.com/package/mapped-system">
    <img src="https://img.shields.io/badge/npm-v0.2.0-black.svg">
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-black.svg">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-black.svg">
  </a>
</p>

**Build design systems with a simple stylesheet.**  
In development and not ready for production use.  

## Installation
```shell
npm i mapped-system --save
```

## Documentation
[Go here](../../) for the documentation and full set of features.

## Example

```jsx
import PropTypes from 'prop-types';
import useMapper from 'mapped-system';

const Box = useMapper({
  size: 'box-size',
  color: value => `is-${value}-color`
});

Box.cssProps = {
  m: 'margin'
}

Box.propTypes = {
  size: PropTypes.any,
  tag: PropTypes.string
}

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

<Box color="primary" />
// Mappings can be functions.
// <div class="is-primary-color"></div>

<Box tag="section" />
// Has a set of built-in utility props.
// <section></section>

<Box size={1} m="100px" />
// Generates css using emotionjs.
// <div class="box-size-1 css-0"></div>
// .css-0 { margin: 100px; }
```

## License
MIT © [Sam Tietjen](https://samtietjen.com)