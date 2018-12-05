# Mapped Classes
Convert objects into consistent class name strings. 

## Installation
```shell
npm i @samtietjen/mapped-classes --save
```

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