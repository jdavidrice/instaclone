import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../pages/login';
import FirebaseContext from '../../context/firebase';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe('<Login />', () => {
  it('renders the login page with a form submission and logs the user in', () => {
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

    expect(document.title).toEqual('Login - Instagram');

    fireEvent.change(getByPlaceholderText('Email address'), {
      target: { value: 'jdavidrice@gmail.com' }
    });

    fireEvent.change(getByPlaceholderText('Password'), {
      target: { value: 'test-password' }
    });

    fireEvent.submit(getByTestId('login'));
  });
});
