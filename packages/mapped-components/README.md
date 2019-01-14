# Mapped Components

A utility for building components that map to your stylesheet.  

<p><sub><strong>Work in Progress.</strong> Better docs coming soon.</sub></p>

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

const Text = mapped({
  size: 'text-size'
});

Text.propTypes = {
  tag: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array
  ])
}

// Uses a built-in utility prop
Text.defaultProps = {
  tag: 'p'
}
```

`Text` uses `size` to append a number to `text-size`.

```jsx
<Text size={1} /> 
// <p class="text-size-1"></p>
```

Arrays add breakpoints based on the value's index position.

```jsx
<Text size={[0, 1, 2]} /> 
// <p class="text-size-0 md-text-size-1 lg-text-size-2"></p>
```

## Utilities
Each component includes a set of utility props:
- `base`(*string*): Prepend a class to the class list.
- `blacklist`(*array*): Block attributes from an element.
- `tag`(*string*): Transform the HTML tag.

```jsx
<Text base="text" size={1} /> 
// <p class="text text-size-1"></p>

<Text id="my-id" href="#" blacklist={['href']} /> 
// <p id="my-id"></p>

<Text tag="h2" /> 
// <h2></h2>
```

## Add-ons
Any function passed as an argument will merge its output with props.

```js
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