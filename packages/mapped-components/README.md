# Mapped Components

<p>
  <a href="https://www.npmjs.com/package/mapped-components">
    <img src="https://img.shields.io/badge/npm-v0.2.0-black.svg">
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-black.svg">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-black.svg">
  </a>
</p>

**React components that build class names from props.**  
In development and not ready for production use.  

## Installation
```shell
npm i mapped-components --save
```

## Usage

Create a mapper with an array of breakpoints and a getter function.

```jsx
import PropTypes from 'prop-types';
import createMapper from 'mapped-components';

const useMapper = createMapper({
  breakpoints: [
    { label: null, minWidth: 0 },
    { label: 'md', minWidth: '600px' },
    { label: 'lg', minWidth: '1200px' }
  ],
  getter: ({ breakpoint, root, value }) =>
    [breakpoint, root, value]
      .filter(x => x || x === 0) // Value can be 0.
      .join('-') // Separate segments with a dash.
});
```

Pass an object that pairs props with the root of a class name to use it.

```jsx
const Box = useMapper({
  size: 'box-size'
});

Box.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array
  ])
}
```

When the prop receives a value it will use the getter to attach it to the root.

```jsx
<Box size={0} />
// <div class="box-size-0"></div>

<Box size="large" />
// <div class="box-size-large"></div>
```

If the value is an array then a responsive class will be added for each item.  

```jsx
<Box size={[1, 2, 3]} />
// Breakpoint labels specified in the mapper: [null, 'md', 'lg']
// <div class="box-size-1 md-box-size-2 lg-box-size-3"></div>
```

## Utilities
Each component includes a set of built-in utility props.

- **base** – `string` – Prepend a class to the class list.
- **blacklist** – `array` – Block attributes from an element.
- **tag** – `string` – Transform the HTML tag.

```jsx
<Box base="box" size={1} /> 
// <div class="box box-size-1"></div>

<Box blacklist={['href']} href="#" /> 
// <div></div>

<Box tag="h2" /> 
// <h2></h2>
```

## CSS Props
Keep your stylesheet focused by generating cumbersome css.  
```jsx
const Box = useMapper({
  size: 'box-size'
});

// Pairs props will css properties.
Box.cssProp = {
  m: 'margin',
  mx: ['margin-left', 'margin-right']
}

Box.propTypes = {
  size: PropTypes.string,
  m: PropTypes.any,
  mx: PropTypes.any
}
```

Values passed to these props will use [emotion]() to generate css.

```jsx
<Box size="large" m="10px" />
// <div class="box-size-large css-0"></div>
// .css-0 { margin-left: 10px; margin-right: 10px; }
```

## License
MIT © [Sam Tietjen](https://samtietjen.com)