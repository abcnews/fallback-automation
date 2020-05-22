import React from 'react';
import renderer from 'react-test-renderer';

import LabeledSwitch from '.';

describe('LabeledSwitch', () => {
  test('It renders', () => {
    const component = renderer.create(<LabeledSwitch />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
