import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import createUseMapper from '../src';

Enzyme.configure({ adapter: new Adapter() });

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

const Box = useMapper({
  size: 'box-size',
  margin: 'm'
});

Box.propTypes = {
  base: PropTypes.string,
  tag: PropTypes.string,
  blacklist: PropTypes.array,
  color: PropTypes.string,
  margin: PropTypes.any,
  size: PropTypes.any
}

test('Create a component.', () => {
  const a = shallow(<Box size={1}>Hello, World!</Box>);
  expect(a.html()).toEqual('<div class="box-size-1">Hello, World!</div>');  
});

test('Accept element attributes.', () => {
  const a = shallow(<Box id="my-id" size={1} />);
  expect(a.html()).toEqual('<div id="my-id" class="box-size-1"></div>');  
});

test('Accepts classNames.', () => {
  const a = shallow(<Box className="my-class" />);
  const b = shallow(<Box className="my-class" size={1} />);
  expect(a.html()).toEqual('<div class="my-class"></div>');  
  expect(b.html()).toEqual('<div class="box-size-1 my-class"></div>');  
});

test('Reject null values.', () => {
  const a = shallow(<Box size={null} />);
  expect(a.html()).toEqual('<div></div>');  
});

test('Add responsive classes when passing an array.', () => {
  const a = shallow(<Box size={[1, 2, 3]} />);
  expect(a.html()).toEqual('<div class="box-size-1 md-box-size-2 lg-box-size-3"></div>');  
});

test('Prepend a class to the class list', () => {
  const a = shallow(<Box size={1} base="comp" />);
  expect(a.html()).toEqual('<div class="comp box-size-1"></div>');  ;
});

test('Transform the HTML tag', () => {
  const a = shallow(<Box tag="h2" />);
  expect(a.html()).toEqual('<h2></h2>');  
});

test('Block attributes from an element.', () => {
  const a = shallow(<Box href="#" blacklist={['href']} />);
  const b = shallow(<Box href="#" />);
  expect(a.html()).toEqual('<div></div>');  
  expect(b.html()).toEqual('<div href="#"></div>');  
});

test('Accepts functions as arguments.', () => {
  const append = (a, b) => [a, b].filter(Boolean).join(' ');
  const hasSize = ({ size, className }) => ({ className: append(className, size && 'has-size') });
  const Comp = useMapper({size: 'box-size'}, hasSize);
  const a = shallow(<Comp size={1} />);
  expect(a.html()).toEqual('<div class="box-size-1 has-size"></div>');  
});