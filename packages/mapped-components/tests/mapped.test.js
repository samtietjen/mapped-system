import React from "react";
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import { matchers } from 'jest-emotion';
import { render, cleanup } from '@testing-library/react';
import createUseMapper from '../src';

const useMapper = createUseMapper({
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

export const Box = useMapper({
  size: 'box-size'
});

Box.propTypes = {
  base: PropTypes.string,
  blacklist: PropTypes.array,
  tag: PropTypes.string,
  size: PropTypes.any
}

afterEach(cleanup);

expect.extend(matchers);

const createJson = Comp => renderer.create(Comp).toJSON();

describe('Mapped Components', () => {
  test('Create a component.', () => {
    const json = createJson(<Box size={1}>Hello, World!</Box>);
    expect(json.children).toEqual(['Hello, World!']);
    expect(json.props.className).toEqual('box-size-1');
    expect(json).toMatchSnapshot();
  });

  test('Accept element attributes.', () => {
    const json = createJson(<Box id="my-id" size={1} />);
    expect(json.props.id).toEqual('my-id');
    expect(json.props.className).toEqual('box-size-1');
    expect(json).toMatchSnapshot();
  });

  test('Accepts classNames.', () => {
    const a = createJson(<Box className="my-class" />);
    const b = createJson(<Box className="my-class" size={1} />);
    expect(a.props.className).toEqual('my-class');
    expect(b.props.className).toEqual('box-size-1 my-class');
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
  });

  test('Reject null values.', () => {
    const json = createJson(<Box size={null} />);
    expect(json).toMatchSnapshot();
  });

  test('Add responsive classes when passing an array.', () => {
    const json = createJson(<Box size={[1, 2, 3]} />);
    expect(json.props.className).toEqual('box-size-1 md-box-size-2 lg-box-size-3');
    expect(json).toMatchSnapshot();
  });

  test('Prepend a class to the class list', () => {
    const json = createJson(<Box size={1} base="box" />);
    expect(json.props.className).toEqual('box box-size-1');
    expect(json).toMatchSnapshot();
  });

  test('Transform the HTML tag', () => {
    const json = createJson(<Box tag="h2" />);
    expect(json.type).toEqual('h2');
    expect(json).toMatchSnapshot();
  });

  test('Block attributes from an element.', () => {
    const json = createJson(<Box href="#" blacklist={['href']} />);
    expect(json.props.href).toBeUndefined(); 
    expect(json).toMatchSnapshot();
  });

  test('Accepts functions as arguments.', () => {
    const append = (a, b) => [a, b].filter(Boolean).join(' ');
    const hasSize = ({ size, className }) => ({ className: append(className, size && 'has-size') });
    const Comp = useMapper({size: 'box-size'}, hasSize);
    const json = createJson(<Comp size={1} />);
    expect(json).toMatchSnapshot();
    expect(json.props.className).toEqual('box-size-1 has-size');  
  });

  test('Forwards ref.', () => {
    const ref = React.createRef(null);
    const tree = render(<Box ref={ref} />);
    expect(ref.current.tagName).toBe('DIV')
  });
});