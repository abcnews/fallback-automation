import React from 'react';
import renderer from 'react-test-renderer';

import Col from '.';

describe('Col', () => {
  test('It renders', () => {
    const component = renderer.create(<Col />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
