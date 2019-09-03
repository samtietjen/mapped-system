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

Box.cssProps = {
  p: 'padding',
  m: 'margin',
  my: ['margin-top', 'margin-bottom']
}

Box.propTypes = {
  size: PropTypes.any,
  p: PropTypes.any,
  m: PropTypes.any,
  my: PropTypes.any
}

afterEach(cleanup);

expect.extend(matchers);

const createJson = Comp => renderer.create(Comp).toJSON();

describe('Mapped Components with Emotion', () => {
  test('Renders single properties.', () => {
    const json = createJson(<Box p="10px" m="100px" />);
    expect(json).toHaveStyleRule('padding', '10px');
    expect(json).toHaveStyleRule('margin', '100px');
    expect(json).toMatchSnapshot();
  });

  test('Renders responsive styles.', () => {
    const json = createJson(<Box m={["10px", "20px", "30px"]} />);
    expect(json).toHaveStyleRule('margin', '10px');
    expect(json).toHaveStyleRule('margin', '20px', { media: '(min-width: 600px)' });
    expect(json).toHaveStyleRule('margin', '30px', { media: '(min-width: 1000px)' });
    expect(json).toMatchSnapshot();  
  });

  test('Adds mapped class names.', () => {
    const a = createJson(<Box size="large" />);
    const b = createJson(<Box size={[1, 2, 3]} />);
    const classNames = a.props.className.split(' ');
    const responsiveClassNames = b.props.className.split(' ');
    expect(classNames.includes('box-size-large')).toBeTruthy();
    expect(responsiveClassNames.includes('box-size-1')).toBeTruthy();
    expect(responsiveClassNames.includes('md-box-size-2')).toBeTruthy();
    expect(responsiveClassNames.includes('lg-box-size-3')).toBeTruthy();
    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
  });

  test('Includes element attributes.', () => {
    const json = createJson(<Box href="#" />);
    expect(json.props.href).toEqual('#');
    expect(json).toMatchSnapshot();
  });

  test('Forwards ref.', () => {
    const ref = React.createRef(null);
    const tree = render(<Box ref={ref} />);
    expect(ref.current.tagName).toBe('DIV');
  });
});