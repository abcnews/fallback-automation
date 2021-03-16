import React from 'react';
import renderer from 'react-test-renderer';

import Page from '.';

describe('Page', () => {
  test('It renders', () => {
    const component = renderer.create(<Page />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
