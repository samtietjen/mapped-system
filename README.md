<div align="center">
  <img src="https://samtietjen.com/static/images/mapped-system.svg" width="125px" />
</div>

<h1 align="center">Mapped System</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@samtietjen/mapped-system">
    <img src="https://img.shields.io/badge/npm-v0.2.0-black.svg?style=flat-square">
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-black.svg?style=flat-square">
  </a>
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/library-React-black.svg?style=flat-square">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-black.svg?style=flat-square">
  </a>
</p>

<p align="center">
Create <a href="https://medium.freecodecamp.org/introducing-the-single-element-pattern-dfbd2c295c5d">single element</a> components that map to your stylesheet.</strong>
</p>

<p align="center">
<sub><strong>Work in Progress.</strong> Send <a href="https://github.com/samtietjen">me</a> your feedback!</sub>
</p>

## Installation
```shell
npm i @samtietjen/mapped-system --save
```

## Usage
```jsx
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

Text.defaultProps = {
  tag: 'p'
}
```

`Text` uses `size` and `color` to create class names.

```jsx
<Text size={1} color="primary" />
// <p class="text-size-1 is-primary-color"></p>
```

The prop's type and characters may affect how it appends. [Read more](docs/rules.md)

```jsx
<Text size="100%" />
// <p class="text-size-100p"></p> 

<Text size={2.5} />
// <p class="text-size-3"></p>

<Text size={1/3} />
// <p class="text-size-33p"></p> 

<Text size={true} />
// <p class="text-size"></p>

<Text size={{large: true, children: 1/2}} />
// <p class="text-size-large text-size-children-50p"></p>

<Text size={[1, 2, 3]} />
// <p class="text-size-1 md-text-size-2 lg-text-size-3"></p>
```

## Utilities
Each component includes a set of utility props. [Read More](packages/mapped-components#utilities)

| Prop | Type | Description |
| ---- | ---- | ----------- |
| `base` | String | Prepend a class to the class list |
| `blacklist` | Array | Block attributes from an element |
| `tag` | String  | Transform the HTML tag |

## Add-Ons
Add features by passing functions as arguments. [Read More](packages/mapped-components#add-ons)

| Add-On | Description |
| ------ | ----------- |
| [withStyles](src/add-ons/withStyles) | Map props to inline styles |

## Packages
| Package | Description |
| ------- | ----------- |
| [Mapped Classes](packages/mapped-classes) | Objects to class name strings |
| [Mapped Components](packages/mapped-components) | Components that map to your stylesheet |

## Credits
Inspired by [Brent Jackson](http://jxnblk.com/)'s [Styled System](https://github.com/jxnblk/styled-system) and [Diego Haz](https://twitter.com/diegohaz)'s [Singel](https://github.com/diegohaz/singel).

## License
MIT © [Sam Tietjen](https://samtietjen.com)