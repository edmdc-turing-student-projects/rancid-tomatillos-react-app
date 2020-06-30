import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () =>{
  test('renders page title', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Rancid/gi);
    expect(linkElement).toBeInTheDocument();
  });
})
