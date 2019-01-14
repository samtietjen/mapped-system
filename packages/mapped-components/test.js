import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mapper from './src';

Enzyme.configure({adapter: new Adapter()});

const mapped = mapper({
  breakpoints: [null, 'md', 'lg'],
  getter: ({ breakpoint, root, value }) => ( 
    [breakpoint, root, value]
      .filter(x => x && value !== false || x === 0)
      .join('-')
  )
});

const Text = mapped({
  size: 'text-size'
});

Text.propTypes = {
  base: PropTypes.string,
  tag: PropTypes.string,
  blacklist: PropTypes.array,
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ])
}

test('Create a component.', () => {
  const a = shallow(<Text size={1}>Hello, World!</Text>);
  expect(a.html()).toEqual('<div class="text-size-1">Hello, World!</div>');  
});

test('Accept element attributes.', () => {
  const a = shallow(<Text id="my-id" size={1} />);
  expect(a.html()).toEqual('<div class="text-size-1" id="my-id"></div>');  
});

test('Accepts classNames.', () => {
  const a = shallow(<Text className="my-class" />);
  const b = shallow(<Text className="my-class" size={1} />);
  expect(a.html()).toEqual('<div class="my-class"></div>');  
  expect(b.html()).toEqual('<div class="text-size-1 my-class"></div>');  
});

test('Reject null values.', () => {
  const a = shallow(<Text size={null} />);
  expect(a.html()).toEqual('<div></div>');  
});

test('Add responsive classes when passing an array.', () => {
  const a = shallow(<Text size={[1, 2, 3]} />);
  expect(a.html()).toEqual('<div class="text-size-1 md-text-size-2 lg-text-size-3"></div>');  
});

test('Accepts functions as arguments.', () => {
  const append = (a, b) => [a, b].filter(Boolean).join(' ');
  const hasSize = ({ size, className }) => ({ className: append(className, size && 'has-size') });
  const Comp = mapped({size: 'text-size'}, hasSize)
  const a = shallow(<Comp size={1} />);
  expect(a.html()).toEqual('<div class="text-size-1 has-size"></div>');  
});


test('Prepend a class to the class list', () => {
  const a = shallow(<Text size={1} base="comp" />);
  expect(a.html()).toEqual('<div class="comp text-size-1"></div>');  ;
});

test('Transform the HTML tag', () => {
  const a = shallow(<Text tag="h2" />);
  expect(a.html()).toEqual('<h2></h2>');  
});

test('Block attributes from an element.', () => {
  const a = shallow(<Text href="#" blacklist={['href']} />);
  const b = shallow(<Text href="#" />);
  expect(a.html()).toEqual('<div></div>');  
  expect(b.html()).toEqual('<div href="#"></div>');  
});