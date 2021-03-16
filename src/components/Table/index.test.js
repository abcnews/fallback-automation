import React from 'react';
import renderer from 'react-test-renderer';

import Table from '.';

describe('Table', () => {
  test('It renders', () => {
    const component = renderer.create(<Table />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
