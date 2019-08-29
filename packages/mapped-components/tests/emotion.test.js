import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer'
import { matchers } from 'jest-emotion'
import createUseMapper from '../src';

// Setup the DOM.
let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

// Add 'jest-emotion' matchers.
expect.extend(matchers);

// Create the mapper.
export const useMapper = createUseMapper({
  breakpoints: [
    { label: null, minWidth: 0 }, 
    { label: "md", minWidth: '600px' },
    { label: "lg", minWidth: '1000px' }
  ],
  getter: ({ breakpoint, root, value }) =>
    [breakpoint, root, value]
      .filter(x => x && value !== false || x === 0)
      .join('-')
});

// Create the component.
const Box = useMapper({
  size: 'box-size'
});

Box.cssProps = {
  p: 'padding',
  m: 'margin',
  my: ['margin-top', 'margin-bottom']
}

Box.propTypes = {
  tag: PropTypes.string,
  p: PropTypes.any,
  m: PropTypes.any,
  my: PropTypes.any,
  size: PropTypes.any
}

// Run the tests.
test('Renders single properties.', () => {
  const tree = renderer
    .create(<Box m="100px" p="10px">Hello, World!</Box>)
    .toJSON()

  expect(tree).toHaveStyleRule('padding', '10px');
  expect(tree).toHaveStyleRule('margin', '100px');
});

test('Renders responsive styles.', () => {
  const tree = renderer
    .create(<Box m={["10px", "20px", "30px"]}>Hello, World!</Box>)
    .toJSON()

    expect(tree).toHaveStyleRule('margin', '10px');

    expect(tree).toHaveStyleRule('margin', '20px', { 
      media: '(min-width: 600px)' 
    });

    expect(tree).toHaveStyleRule('margin', '30px', { 
      media: '(min-width: 1000px)' 
    });
});

test('Adds mapped class names.', () => {
  const Component = () => (
    <Box size="large" m="100px">Hello, World!</Box>
  );
  
  act(() => {
    ReactDOM.render(<Component />, container);
  });

  const element = container.querySelector('div');
  expect(element.classList[0]).toBe('box-size-large');

  const tree = renderer
    .create(<Component />)
    .toJSON();

  expect(tree).toHaveStyleRule('margin', '100px');
});

test('Adds responsive mapped class names.', () => {
  const Component = () => (
    <Box 
      size={["small", "medium", "large"]} 
      m="100px">
      Hello, World!
    </Box>
  );
  
  act(() => {
    ReactDOM.render(<Component />, container);
  });

  const element = container.querySelector('div');
  expect(element.classList[0]).toBe('box-size-small');
  expect(element.classList[1]).toBe('md-box-size-medium');
  expect(element.classList[2]).toBe('lg-box-size-large');

  const tree = renderer.create(<Component />).toJSON();
  expect(tree).toHaveStyleRule('margin', '100px');
});

test('Includes element attributes.', () => {
  const Component = () => (
    <Box href="#" m="100px">Hello, World!</Box>
  );
  
  act(() => {
    ReactDOM.render(<Component />, container);
  });

  const element = container.querySelector('div');
  expect(element.getAttribute('href')).toBe('#');

  const tree = renderer.create(<Component />).toJSON();
  expect(tree).toHaveStyleRule('margin', '100px');
});