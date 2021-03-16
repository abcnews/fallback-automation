import React from 'react';
import renderer from 'react-test-renderer';

import Row from '.';

describe('Row', () => {
  test('It renders', () => {
    const component = renderer.create(<Row />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
