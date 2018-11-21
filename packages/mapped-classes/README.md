# Mapped Classes
Convert objects into consistent class name strings. 

## Installation
```shell
npm i @samtietjen/mapped-classes --save
```

<a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
<img src="https://img.shields.io/badge/stability-experimental-lightgrey.svg?style=flat-square"></a>
<a href="https://opensource.org/licenses/MIT">
<img src="https://img.shields.io/badge/license-MIT-black.svg?style=flat-square"></a>

## Usage
```js
import createMapper from '@samtietjen/mapped-classes';

const mapper = createMapper({
  breakpoints: [null, 'md', 'lg'],
  mappings: { fontSize: 'font-size', padding: 'p' },
  getter: ({ breakpoint, root, value }) => (
    [breakpoint, root, value].filter(Boolean).join('-')
  )
});
 
const classes = mapper({ 
  fontSize: 1,
  padding: [1, 2, 3]
}); 

// 'font-size-1 p-1 md-p-2 lg-p-3'
```

## License
MIT © [Sam Tietjen](https://samtietjen.com)