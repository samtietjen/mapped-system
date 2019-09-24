import React from "react";
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import { matchers } from 'jest-emotion';
import { cleanup } from '@testing-library/react';
import useMapper, { createUseMapper } from '../src';

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

afterEach(cleanup);

expect.extend(matchers);

const createJson = Comp => renderer.create(Comp).toJSON();

describe('Mapped System', () => {

  test('Separates segments with a dash.', () => {
    const json = createJson(<Box size="large" />);
    expect(json.props.className).toEqual('box-size-large');
    expect(json).toMatchSnapshot();
  });

  test('Percentage signs convert to p.', () => {
    const json = createJson(<Box size="100%" />);
    expect(json.props.className).toEqual('box-size-100p');
    expect(json).toMatchSnapshot();
  });

  test('Floats round to the nearest integer.', () => {
    const a = createJson(<Box size={2.25} />);
    const b = createJson(<Box size={2.5} />);
    expect(a.props.className).toEqual('box-size-2');
    expect(b.props.className).toEqual('box-size-3');
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
  });

  test('Numbers between 0 and 1 convert to percentages.', () => {
    const a = createJson(<Box size={1/3} />);
    const b = createJson(<Box size={10/2} />);
    expect(a.props.className).toEqual('box-size-33p');
    expect(b.props.className).toEqual('box-size-5');
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
  });

  test('Booleans add the class name while true.', () => {
    const a = createJson(<Box size={true} />);
    const b = createJson(<Box size={false} />);
    expect(a.props.className).toEqual('box-size');
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();  
  });

  test('Objects prefix keys to values.', () => {
    const a = createJson(<Box size={{ large: true, medium: false, small: false }} />);
    const b = createJson(<Box size={{ is: 'large' }} />);
    const c = createJson(<Box size={{ is: [1, 2, 3] }} />);
    expect(a.props.className).toEqual('box-size-large');
    expect(b.props.className).toEqual('box-size-is-large');
    expect(c.props.className).toEqual('box-size-is-1 md-box-size-is-2 lg-box-size-is-3');
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();  
    expect(c).toMatchSnapshot();  
  });

  test('Arrays prefix breakpoints md and lg at indexes 1 and 2.', () => {
    const a = createJson(<Box size={[1]} />);
    const b = createJson(<Box size={[1, 2]} />);
    const c = createJson(<Box size={[1, 2, 3]} />);
    const d = createJson(<Box size={[1, null, 3]} />);
    const e = createJson(<Box size={[1, false, 3]} />);
    expect(a.props.className).toEqual('box-size-1');  
    expect(b.props.className).toEqual('box-size-1 md-box-size-2');  
    expect(c.props.className).toEqual('box-size-1 md-box-size-2 lg-box-size-3');
    expect(d.props.className).toEqual('box-size-1 lg-box-size-3');  
    expect(e.props.className).toEqual('box-size-1 lg-box-size-3'); 
    expect(c).toMatchSnapshot();  
  });

  test('Functions execute and add their result.', () => {
    const json = createJson(<Box size={() => 1 + 2} />);
    expect(json.props.className).toEqual('box-size-3');  
    expect(json).toMatchSnapshot();
  });

  test('Accepts functions as mappings.', () => {
    const json = createJson(<Box color="primary" />);
    expect(json.props.className).toEqual('is-primary-color');  
    expect(json).toMatchSnapshot();
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
    const json = createJson(<CustomBox size={[1, 2, 3, 4]} />);
    expect(json.props.className).toEqual('box-size-1 md-box-size-2 lg-box-size-3 xlg-box-size-4');  
    expect(json).toMatchSnapshot();
  });
});