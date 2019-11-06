# Mapped System
Please [see the documentation](https://github.com/samtietjen/mapped-system) for more information.

## Installation
```shell
npm i mapped-system --save
```

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
```

## License
MIT © [Sam Tietjen](https://samtietjen.com)