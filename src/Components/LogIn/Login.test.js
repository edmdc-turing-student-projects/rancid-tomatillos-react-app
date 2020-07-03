import React from 'react';
import Login from './Login';
import { render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Login', () => {
  it('should be able to login a user', () => {
    //setup
    const {getByText, getByRole, getByPlaceholderText} = render(<Login 
      email = 'test email'
      password = 'test password'
    />);
    //execute
    const email = getByPlaceholderText('email');
    const password = getByPlaceholderText('password');
    const logInButton = getByRole('button', {name: 'Log In!'})
    //assert
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(logInButton).toBeInTheDocument();
  })
})