
# Rules

- Percentage signs convert to `p`.
- Floats round to the nearest integer.
- Numbers between `0` and `1` convert to percentages.
- Booleans add the class name while `true`.
- Objects prefix keys to values.
- Arrays prefix breakpoints `md` and `lg` at indexes `1` and `2`.

```jsx
<Text size="100%" />
// <p class="text-size-100p"></p> 

<Text size={2.5} />
// <p class="text-size-3"></p>

<Text size={1/3} />
// <p class="text-size-33p"></p> 

<Text size={true} />
// <p class="text-size"></p>

<Text size={{large: true, children: 1}} />
// <p class="text-size-large text-size-children-1"></p>

<Text size={[1, 2, 3]} />
// <p class="text-size-1 md-text-size-2 lg-text-size-3"></p>
```

## Customizing
Write your own rules with [Mapped Components]().

```js
import mapper from '@samtietjen/mapped-components';

const mapped = mapper({
  breakpoints: [null, 'md', 'lg'],
  getter: ({ breakpoint, root, value }) => (
    // Return these three segments as a string.
    // e.g. [breakpoint, root, value].join('-')
  )
});
```