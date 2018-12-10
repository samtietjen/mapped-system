# Mapped Components
A utility for building React components that map to your stylesheet.  

## Installation
```shell
npm i @samtietjen/mapped-components --save
```

## Usage
```jsx
import PropTypes from 'prop-types';
import mapper from '@samtietjen/mapped-components';

const mapped = mapper({
  breakpoints: [null, 'md', 'lg'],
  getter: ({ breakpoint, root, value }) => [breakpoint, root, value]
    .filter(x => x && value !== false || x === 0)
    .join('-')
});

const Text = mapped({
  size: 'text-size'
});

Text.propTypes = {
  tag: PropTypes.string,
  base: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array
  ])
}

Text.defaultProps = {
  tag: 'p',
  base: 'text'
}

render (
  <Text size={[1, null, 3]} /> 
  // <p class="text text-size-1 lg-text-size-3"></p>
);
```

## Extending
```jsx
const Heading = mapped({
  ...Text.mappings,
  color: 'text-color'
);

Heading.propTypes = {
  ...Text.propTypes,
  color: PropTypes.string
}

Heading.defaultProps = {
  base: 'heading',
  tag: 'h2'
}

<Heading size={1} color="black" />
// <h2 class="heading text-size-1 text-color-black"></h2>
```

## License
MIT © [Sam Tietjen](https://samtietjen.com)