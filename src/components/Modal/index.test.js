import React from 'react';
import renderer from 'react-test-renderer';

import Modal from '.';

describe('Modal', () => {
  test('It renders', () => {
    const component = renderer.create(<Modal />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
