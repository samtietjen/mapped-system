import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mapper from './src';

Enzyme.configure({adapter: new Adapter()});

const mapped = mapper({
  breakpoints: [null, 'md', 'lg'],
  getter: ({ breakpoint, root, value }) => [breakpoint, root, value]
    .filter(x => x && value !== false || x === 0)
    .join('-')
});

const Comp = mapped({size: 'comp-size'});

Comp.propTypes = {
  base: PropTypes.string,
  tag: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ])
}

test('Creates a component.', () => {
  const a = shallow(<Comp size={1}>Hello, World!</Comp>);
  expect(a.html()).toEqual('<div class="comp-size-1">Hello, World!</div>');  
});

test('Accept HTML properties.', () => {
  const a = shallow(<Comp id="my-id" size={1} />);
  expect(a.html()).toEqual('<div class="comp-size-1" id="my-id"></div>');  
});

test('Add classes via class prop.', () => {
  const a = shallow(<Comp className="my-class" />);
  const b = shallow(<Comp className="my-class" size={1} />);
  expect(a.html()).toEqual('<div class="my-class"></div>');  
  expect(b.html()).toEqual('<div class="comp-size-1 my-class"></div>');  
});

test('Add "base" as the first class.', () => {
  const a = shallow(<Comp size={1} base="comp" />);
  expect(a.html()).toEqual('<div class="comp comp-size-1"></div>');  ;
});

test('Transform tags with "tag" prop.', () => {
  const a = shallow(<Comp tag="section" size={1} />);
  expect(a.html()).toEqual('<section class="comp-size-1"></section>');  
});

test('Add responsive classes when passing an array.', () => {
  const a = shallow(<Comp size={[1, 2, 3]} />);
  expect(a.html()).toEqual('<div class="comp-size-1 md-comp-size-2 lg-comp-size-3"></div>');  
});

test('Reject null values.', () => {
  const a = shallow(<Comp size={null} />);
  expect(a.html()).toEqual('<div></div>');  
});

test('Accept 0 values.', () => {
  const a = shallow(<Comp size={0} />);
  expect(a.html()).toEqual('<div class="comp-size-0"></div>');  
});