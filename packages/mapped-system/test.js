import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mapped from './src';

Enzyme.configure({adapter: new Adapter()});

const Text = mapped({
  align: value => `is-${value}-aligned`,
  size: 'text-size'
});

Text.propTypes = {
  base: PropTypes.string,
  tag: PropTypes.string,
  align: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object
  ])
}

describe('Basic', () => {
  test('Accepts children.', () => {
    const Comp = props => <div>{props.children}</div>;
    const a = shallow(<Text>Hello, World!</Text>);
    const b = shallow(<Text><Comp>Hello, World!</Comp></Text>);
    expect(a.html()).toEqual('<div>Hello, World!</div>'); 
    expect(b.html()).toEqual('<div><div>Hello, World!</div></div>');  
  });

  test('Accepts HTML tag properties.', () => {
    const a = shallow(<Text id="my-id" />);
    expect(a.html()).toEqual('<div id="my-id"></div>');  
  });
});

describe('Syntax', () => {
  test('Separates values with a dash.', () => {
    const a = shallow(<Text size={1} />);
    expect(a.html()).toEqual('<div class="text-size-1"></div>');  
  });

  test('Allows functions to dictate the placement of values.', () => {
    const a = shallow(<Text align="right" />);
    expect(a.html()).toEqual('<div class="is-right-aligned"></div>');  
  });

  test('Does not return null values', () => {
    const a = shallow(<Text size={null} />);
    const b = shallow(<Text size={1} />);
    expect(a.html()).toEqual('<div></div>');  
    expect(b.html()).toEqual('<div class="text-size-1"></div>');  
  });
});

describe('Strings', () => {
  test('Accepts string values.', () => {
    const a = shallow(<Text size="large" />);
    expect(a.html()).toEqual('<div class="text-size-large"></div>');  
  });

  test('Converts % characters to p.', () => {
    const a = shallow(<Text size="100%" />);
    expect(a.html()).toEqual('<div class="text-size-100p"></div>');  
  });
});

describe('Numbers', () => {
  test('Accepts number values.', () => {
    const a = shallow(<Text size={1} />);
    const b = shallow(<Text size={0} />);
    expect(a.html()).toEqual('<div class="text-size-1"></div>');
    expect(b.html()).toEqual('<div class="text-size-0"></div>');  
  });

  test('Rounds floats to the nearest integer.', () => {
    const a = shallow(<Text size={2.25} />);
    const b = shallow(<Text size={2.5} />);
    expect(a.html()).toEqual('<div class="text-size-2"></div>'); 
    expect(b.html()).toEqual('<div class="text-size-3"></div>');  
  });

  test('Converts values between 0 and 1 to percentages.', () => {
    const a = shallow(<Text size={1/3} />);
    const b = shallow(<Text size={10/2} />);
    expect(a.html()).toEqual('<div class="text-size-33p"></div>');  
    expect(b.html()).toEqual('<div class="text-size-5"></div>');  
  });
});

describe('Arrays', () => {
  test('Accepts array values.', () => {
    const a = shallow(<Text size={[1]} />);
    expect(a.html()).toEqual('<div class="text-size-1"></div>');  
  });

  test('Prefixes breakpoints md and lg based on the index position.', () => {
    const a = shallow(<Text size={[1, 2]} />);
    const b = shallow(<Text size={[1, 2, 3]} />);
    expect(a.html()).toEqual('<div class="text-size-1 md-text-size-2"></div>');  
    expect(b.html()).toEqual('<div class="text-size-1 md-text-size-2 lg-text-size-3"></div>');  
  });

  test('Ignores null and false.', () => {
    const a = shallow(<Text size={[1, null, 3]} />);
    const b = shallow(<Text size={[1, false, 3]} />);
    expect(a.html()).toEqual('<div class="text-size-1 lg-text-size-3"></div>');  
    expect(b.html()).toEqual('<div class="text-size-1 lg-text-size-3"></div>');  
  });
});

describe('Booleans', () => {
  test('Adds the class while true.', () => {
    const a = shallow(<Text size={true} />);
    expect(a.html()).toEqual('<div class="text-size"></div>');  
  });

  test('Ignores the class while false.', () => {
    const a = shallow(<Text size={false} />);
    expect(a.html()).toEqual('<div></div>');  
  });
});

describe('Objects', () => {
  test('Allows for batching multiple values to the same mapping.', () => {
    const a = shallow(<Text size={{ large: true, medium: false, small: false }} />);
    expect(a.html()).toEqual('<div class="text-size-large"></div>');  
  });

  test('Prefixes each value with its key.', () => {
    const a = shallow(<Text size={{ is: 'large' }} />);
    expect(a.html()).toEqual('<div class="text-size-is-large"></div>');  
  });

  test('Handles each type with the appropriate rules.', () => {
    const a = shallow(<Text size={{ is: [1, 2, 3] }} />);
    expect(a.html()).toEqual('<div class="text-size-is-1 md-text-size-is-2 lg-text-size-is-3"></div>'); 
  });
});


describe('Utilities', () => {
  test('Add a base class to the start of the class list.', () => {
    const a = shallow(<Text base="text" />);
    const b = shallow(<Text base="text" size={1} />);
    expect(a.html()).toEqual('<div class="text"></div>'); 
    expect(b.html()).toEqual('<div class="text text-size-1"></div>'); 
  });

  test('Transform the HTML tag.', () => {
    const a = shallow(<Text tag="h2" />);
    expect(a.html()).toEqual('<h2></h2>'); 
  });
});