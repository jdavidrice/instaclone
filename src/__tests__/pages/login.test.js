import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Login from '../../pages/login';
import FirebaseContext from '../../context/firebase';
import * as ROUTES from '../../constants/routes';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe('<Login />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login page with a form submission and logs the user in', async () => {
    const succeedToLogin = jest.fn(() => Promise.resolve('I am signed in'));
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: succeedToLogin
      }))
    };
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Login />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      expect(document.title).toEqual('Login - Instagram');

      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'jdavidrice@gmail.com' }
      });
      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'test-password' }
      });
      fireEvent.submit(getByTestId('login'));

      expect(succeedToLogin).toHaveBeenCalled();
      expect(succeedToLogin).toHaveBeenCalledWith('jdavidrice@gmail.com', 'test-password');

      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText('Email address').value).toBe('jdavidrice@gmail.com');
        expect(getByPlaceholderText('Password').value).toBe('test-password');
        expect(queryByTestId('error')).toBeFalsy();
      });
    });
  });

  it('renders the login page with a form submission and fails to login the user', async () => {
    const failToLogin = jest.fn(() => Promise.reject(new Error('Cannot sign in')));
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: failToLogin
      }))
    };
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Login />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'jdavidricegmail.com' }
      });
      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'password' }
      });
      fireEvent.submit(getByTestId('login'));

      expect(document.title).toEqual('Login - Instagram');
      expect(failToLogin).toHaveBeenCalled();
      expect(failToLogin).toHaveBeenCalledWith('jdavidricegmail.com', 'password');
      expect(failToLogin).rejects.toThrow('Cannot sign in');

      await waitFor(() => {
        expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText('Email address').value).toBe('jdavidricegmail.com');
        expect(getByPlaceholderText('Password').value).toBe('password');
        expect(queryByTestId('error')).toBeTruthy();
      });
    });
  });
});
