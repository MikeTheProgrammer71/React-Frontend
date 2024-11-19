import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../services/userService.tsx';
import { useAuth } from '../states/auth.jsx';
import SignIn from '../views/SignIn';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('../services/userService');
jest.mock('../states/auth', () => ({
  useAuth: jest.fn(),
}));

describe('SignIn Component', () => {
  let navigateMock;
  let loginMock;
  let logoutMock;

  beforeEach(() => {
    navigateMock = jest.fn();
    loginMock = jest.fn();
    logoutMock = jest.fn();

    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});


    useNavigate.mockReturnValue(navigateMock);
    useAuth.mockReturnValue({
      login: loginMock,
      logout: logoutMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleErrorMock.mockRestore();
  });

  it('should render the SignIn form', () => {
    render(<SignIn />);
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });


  it('should allow the user to type in the username and password fields', () => {
    render(<SignIn />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password123');
  });


  it('should submit the form and call the login function on successful sign in', async () => {
    const mockUser = { username: 'testuser' };
    UserService.authenticateUser.mockResolvedValue(mockUser);

    render(<SignIn />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(signInButton);

    await waitFor(() => expect(UserService.authenticateUser).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
    }));

    expect(logoutMock).toHaveBeenCalled();
    expect(loginMock).toHaveBeenCalledWith(mockUser);
    expect(navigateMock).toHaveBeenCalledWith('/Home');
  });


  it('should display an error message on failed sign in', async () => {
    UserService.authenticateUser.mockResolvedValue(null);

    render(<SignIn />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    fireEvent.click(signInButton);

    await waitFor(() => expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument());
  });


  it('should handle errors during sign-in process', async () => {
    UserService.authenticateUser.mockRejectedValue(new Error('An error occurred'));

    render(<SignIn />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(signInButton);

    await waitFor(() => expect(screen.getByText(/an error occurred during sign-in/i)).toBeInTheDocument());
  });
  
});
