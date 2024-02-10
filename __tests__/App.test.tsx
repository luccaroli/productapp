import 'react-native';
import React from 'react';
import App from '../src/App';
import {render} from './__mocks__/__utils__/tools';

describe('App', () => {
  it('renders correctly', () => {
    const {toJSON} = render(<App />);

    expect(toJSON()).toBeDefined();
  });
});
