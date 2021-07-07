/* eslint-disable no-unused-vars */
import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Dashboard from '../../pages/dashboard';
import UserContext from '../../context/user';
import FirebaseContext from '../../context/firebase';
import LoggedInUserContext from '../../context/logged-in-user';
import { getPhotos, getSuggestedProfiles } from '../../services/firebase';
import useUser from '../../hooks/use-user';
import userFixture from '../../fixtures/logged-in-user';
import photosFixture from '../../fixtures/timeline-photos';
import suggestedProfilesFixture from '../../fixtures/suggested-profiles';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

jest.mock('../../services/firebase');
jest.mock('../../hooks/use-user');

describe('<Dashboard />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the dashboard with a user profile and follows a user from the suggested profile', async () => {
    await act(async () => {
      getPhotos.mockImplementation(() => photosFixture);
      getSuggestedProfiles.mockImplementation(() => suggestedProfilesFixture);
      useUser.mockImplementation(() => ({ user: userFixture }));

      const { getByText, getByAltText, getByTitle, getAllByText, getAllByAltText, getByTestId } =
        render(
          <Router>
            <FirebaseContext.Provider
              value={{
                firebase: {
                  firestore: jest.fn(() => ({
                    collection: jest.fn(() => ({
                      doc: jest.fn(() => ({
                        update: jest.fn(() => Promise.resolve('User added'))
                      }))
                    }))
                  }))
                },
                FieldValue: {
                  arrayUnion: jest.fn(),
                  arrayRemove: jest.fn()
                }
              }}
            >
              <UserContext.Provider
                value={{
                  user: {
                    uid: 'R4VG4Q2TxpNJmz9oEkcnZqV8YPQ2',
                    displayName: 'jeremy'
                  }
                }}
              >
                <LoggedInUserContext.Provider value={{ user: userFixture }}>
                  <Dashboard
                    user={{
                      uid: 'R4VG4Q2TxpNJmz9oEkcnZqV8YPQ2',
                      displayName: 'jeremy'
                    }}
                  />
                </LoggedInUserContext.Provider>
              </UserContext.Provider>
            </FirebaseContext.Provider>
          </Router>
        );

      await waitFor(() => {
        expect(document.title).toEqual('Instaclone');
        expect(getByTitle('Sign Out')).toBeTruthy();
        expect(getAllByText('brendan')).toBeTruthy();
        expect(getAllByAltText('Instaclone')).toBeTruthy(); // instagram logo
        expect(getByAltText('jeremy profile')).toBeTruthy();
        expect(getAllByText('Saint George and the Dragon')).toBeTruthy(); // caption for the img
        expect(getByText('Suggestions for you')).toBeTruthy(); // suggestions exist

        fireEvent.click(getByText('Follow'));
        fireEvent.click(getByTestId('like-photo-XcrunAyNNmzEysTbrnaJ'));
        fireEvent.keyDown(getByTestId('like-photo-XcrunAyNNmzEysTbrnaJ'), {
          key: 'Enter'
        });
        fireEvent.click(getByTestId('focus-input-8MlXApDlrVzYqQEJgDXv'));
        fireEvent.change(getByTestId('add-comment-8MlXApDlrVzYqQEJgDXv'), {
          target: { value: 'Great photo!' }
        });
        fireEvent.submit(getByTestId('add-comment-submit-8MlXApDlrVzYqQEJgDXv'));
        fireEvent.change(getByTestId('add-comment-8MlXApDlrVzYqQEJgDXv'), {
          target: { value: '' }
        });
        fireEvent.keyDown(getByTestId('focus-input-8MlXApDlrVzYqQEJgDXv'), {
          key: 'Enter'
        });
        fireEvent.submit(getByTestId('add-comment-submit-8MlXApDlrVzYqQEJgDXv'));
      });
    });
  });
});
