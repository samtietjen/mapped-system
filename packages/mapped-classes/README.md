<div align="center">
  <img src="https://tietjeninteractive.com/projects/mapped-system/mapped-classes.svg" width="100px" />
</div>

<h1 align="center">Mapped Classes</h1>

<p align="center">Convert objects into consistent class name strings<br/>

<p align="center">
  <a href="https://www.npmjs.com/package/mapped-classes">
    <img src="https://img.shields.io/badge/npm-v1.3.0-black.svg">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-black.svg">
  </a>
</p>

## Installation
```shell
npm i mapped-classes --save
```

## Usage
```js
import createMapper from 'mapped-classes';

const useMapper = createMapper({
  breakpoints: [null, 'md', 'lg'],
  mappings: {fontSize: 'font-size', padding: 'p'},
  getter: ({breakpoint, root, value}) =>
    [breakpoint, root, value]
      .filter(x => x || x === 0)
      .join('-')
});
 
const classNames = useMapper({ 
  fontSize: 1,
  padding: [1, 2, 3]
}); 

// 'font-size-1 p-1 md-p-2 lg-p-3'
```

## License
MIT © [Sam Tietjen](https://samtietjen.com)