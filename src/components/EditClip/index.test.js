import React from 'react';
import renderer from 'react-test-renderer';

import SelectorForm from '.';

describe('SelectorForm', () => {
  test('It renders', () => {
    const component = renderer.create(<SelectorForm />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
