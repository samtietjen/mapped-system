# withStyles

```js
import PropTypes from 'prop-types';
import mapped, { withStyles } from '@samtietjen/mapped-system';

const Text = mapped({
  size: 'text-size'
}, withStyles({
  align: 'textAlign'
}));

Text.propTypes = {
  blacklist: PropTypes.array,
  tag: PropTypes.string,
  size: PropTypes.number,
  align: PropTypes.string
}

Text.defaultProps = {
  blacklist: ['align'],
  tag: 'p'
}
```

`Text` uses `align` to add `{textAlign: 'left'}` to its style object.

```jsx
<Text align="left" />
// <p style="text-align:left"></p>
```