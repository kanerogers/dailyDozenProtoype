import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App/index';

it('renders', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
