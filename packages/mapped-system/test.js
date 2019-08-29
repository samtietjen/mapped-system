import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import useMapper, { createUseMapper } from './src';

Enzyme.configure({adapter: new Adapter()});

const Box = useMapper({
  size: 'box-size',
  color: value => `is-${value}-color`,
  m: 'margin'
});

Box.propTypes = {
  base: PropTypes.string,
  blacklist: PropTypes.array,
  tag: PropTypes.string,
  size: PropTypes.any,
  color: PropTypes.any,
  m: PropTypes.any
}

test('Separates segments with a dash.', () => {
  const a = shallow(<Box size={1} />);
  expect(a.html()).toEqual('<div class="box-size-1"></div>');  
});

test('Percentage signs convert to p.', () => {
  const a = shallow(<Box size="100%" />);
  expect(a.html()).toEqual('<div class="box-size-100p"></div>');
});

test('Floats round to the nearest integer.', () => {
  const a = shallow(<Box size={2.25} />);
  const b = shallow(<Box size={2.5} />);
  expect(a.html()).toEqual('<div class="box-size-2"></div>'); 
  expect(b.html()).toEqual('<div class="box-size-3"></div>');
});

test('Numbers between 0 and 1 convert to percentages.', () => {
  const a = shallow(<Box size={1/3} />);
  const b = shallow(<Box size={10/2} />);
  expect(a.html()).toEqual('<div class="box-size-33p"></div>');  
  expect(b.html()).toEqual('<div class="box-size-5"></div>');  
});

test('Booleans add the class name while true.', () => {
  const a = shallow(<Box size={true} />);
  const b = shallow(<Box size={false} />);
  expect(a.html()).toEqual('<div class="box-size"></div>');  
  expect(b.html()).toEqual('<div></div>');  
});

test('Objects prefix keys to values.', () => {
  const a = shallow(<Box size={{ large: true, medium: false, small: false }} />);
  const b = shallow(<Box size={{ is: 'large' }} />);
  const c = shallow(<Box size={{ is: [1, 2, 3] }} />);
  expect(a.html()).toEqual('<div class="box-size-large"></div>');  
  expect(b.html()).toEqual('<div class="box-size-is-large"></div>');  
  expect(c.html()).toEqual('<div class="box-size-is-1 md-box-size-is-2 lg-box-size-is-3"></div>'); 
});

test('Arrays prefix breakpoints md and lg at indexes 1 and 2.', () => {
  const a = shallow(<Box size={[1]} />);
  const b = shallow(<Box size={[1, 2]} />);
  const c = shallow(<Box size={[1, 2, 3]} />);
  const d = shallow(<Box size={[1, null, 3]} />);
  const e = shallow(<Box size={[1, false, 3]} />);
  expect(a.html()).toEqual('<div class="box-size-1"></div>');  
  expect(b.html()).toEqual('<div class="box-size-1 md-box-size-2"></div>');  
  expect(c.html()).toEqual('<div class="box-size-1 md-box-size-2 lg-box-size-3"></div>');
  expect(d.html()).toEqual('<div class="box-size-1 lg-box-size-3"></div>');  
  expect(e.html()).toEqual('<div class="box-size-1 lg-box-size-3"></div>');  
});

test('Functions execute and add their result.', () => {
  const a = shallow(<Box size={() => 1 + 2} />);
  expect(a.html()).toEqual('<div class="box-size-3"></div>');  
});

test('Accepts functions as mappings.', () => {
  const a = shallow(<Box color="primary" />);
  expect(a.html()).toEqual('<div class="is-primary-color"></div>');
});

test('Pass custom configs with createUseMapper', () => {
  const customUseMapper = createUseMapper({
    breakpoints: [
      { label: null, minWidth: 0 },
      { label: 'md', minWidth: '600px' },
      { label: 'lg', minWidth: '1200px' },
      { label: 'xlg', minWidth: '1600px' }
    ]
  });

  const CustomBox = customUseMapper({ size: 'box-size' });
  CustomBox.propTypes = { size: PropTypes.any }
  const a = shallow(<CustomBox size={[1, 2, 3, 4]} />);
  expect(a.html()).toEqual('<div class="box-size-1 md-box-size-2 lg-box-size-3 xlg-box-size-4"></div>');
});