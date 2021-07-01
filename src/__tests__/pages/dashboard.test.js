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

  it('renders the dashboard with a user profile and follows a user from the suggested profile sidebar', async () => {
    await act(async () => {
      getPhotos.mockImplementation(() => photosFixture);
      getSuggestedProfiles.mockImplementation(() => suggestedProfilesFixture);
      useUser.mockImplementation(() => ({ user: userFixture }));

      const firebase = {
        firestore: jest.fn(() => ({
          collection: jest.fn(() => ({
            doc: jest.fn(() => ({
              update: jest.fn(() => Promise.resolve('User added'))
            }))
          }))
        }))
      };
      const fieldValues = {
        arrayUnion: jest.fn(),
        arrayRemove: jest.fn()
      };

      const { getByText, getByTestId, getByTitle, getAllByText, getByAltText } = render(
        <Router>
          <FirebaseContext.Provider value={{ firebase, fieldValues }}>
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
        expect(document.title).toEqual('Instagram');
        expect(getByTitle('Sign Out')).toBeTruthy();
        expect(getAllByText('brendan')).toBeTruthy();
        expect(getByAltText('Instagram')).toBeTruthy();
        expect(getByAltText('jeremy profile')).toBeTruthy();
        expect(getAllByText('Saint George and the Dragon')).toBeTruthy();
        expect(getByText('Suggestions for you')).toBeTruthy();

        fireEvent.click(getByText('Follow'));
        fireEvent.click(getByTestId('like-photo-MYv4fLT7DZpuFAkcZB3P'));
        fireEvent.click(getByTestId('like-photo-MYv4fLT7DZpuFAkcZB3P'), {
          key: 'Enter'
        });
        fireEvent.click(getByTestId('focus-input-MYv4fLT7DZpuFAkcZB3P'));
        fireEvent.change(getByTestId('add-comment-MYv4fLT7DZpuFAkcZB'), {
          target: { value: 'Nice pic!' }
        });
        fireEvent.submit(getByTestId('add-comment-submit-MYv4fLT7DZpuFAkcZ'));
      });
    });
  });
});
