# Mapped Components

<p>
  <a href="https://www.npmjs.com/package/@samtietjen/mapped-system">
    <img src="https://img.shields.io/badge/npm-v0.13.0-black.svg">
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-black.svg">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-black.svg">
  </a>
</p>

A utility for building components that map to your stylesheet.  

## Installation
```shell
npm i @samtietjen/mapped-components --save
```

## Usage
```js
import PropTypes from 'prop-types';
import mapper from '@samtietjen/mapped-components';

const mapped = mapper({
  breakpoints: [null, 'md', 'lg'],
  getter: ({ breakpoint, root, value }) => (
    [breakpoint, root, value]
      .filter(x => x || x === 0)
      .join('-')
  )
});

const Box = mapped({
  size: 'box-size'
});

Box.propTypes = {
  base: PropTypes.string,
  blacklist: PropTypes.array,
  tag: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array
  ])
}
```

`Box` uses `size` to append a number to `box-size`.

```jsx
<Box size={1} /> 
// <div class="box-size-1"></div>
```

Arrays add breakpoints based on the value's index position.

```jsx
<Box size={[0, 1, 2]} /> 
// <div class="box-size-0 md-box-size-1 lg-box-size-2"></div>
```

## Utilities
Each component includes a set of built-in utility props:

### base
- Type: **String**

Prepend a class to the class list.

```jsx
<Box base="box" size={1} /> 
// <div class="box box-size-1"></div>
```

### blacklist
- Type: **Array**

Block attributes from an element.

```jsx
<Box id="my-id" href="#" blacklist={['href']} /> 
// <div id="my-id"></div>
```

### tag
- Type: **String**
- Default: `div`

Transform the HTML tag.

```jsx
<Box tag="section" /> 
// <section></section>
```

## Add-ons

Any function passed as an argument will merge its output with props.

```jsx
const Text = mapped({
  size: 'text-size'
}, ({ className, size }) => ({
  className: className + (size > 3 && ' is-large')
}));
```

`Text` adds `is-large` to `className` while `size > 3`.

```jsx
<Text size={4} />
// <p class="text-size-4 is-large"></p>
```

## License
MIT © [Sam Tietjen](https://samtietjen.com)