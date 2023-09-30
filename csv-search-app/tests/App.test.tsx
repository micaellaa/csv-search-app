import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect'
import App from '../src/App';

describe('Main page tests', () => {

  beforeEach(() => {
    // write someting before each test
  });

  afterEach(() => {
    // write someting after each test
  });

  it('Renders correctly', async () => {
    /* first we visit /login and test if the string in the element with class "login-label"  has"Please Log In" is there */
    render(
      <App />
    );
    // const loginLabel = screen.getByText('Upload ');

    // expect(loginLabel).toBeInTheDocument();
  });

});