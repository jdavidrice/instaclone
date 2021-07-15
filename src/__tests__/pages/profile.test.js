import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Profile from '../../pages/profile';
import UserContext from '../../context/user';
import FirebaseContext from '../../context/firebase';
import {
  isUserFollowingProfile,
  getUserByUsername,
  getUserPhotosByUsername
} from '../../services/firebase';
import userFixture from '../../fixtures/logged-in-user';
import photosFixture from '../../fixtures/timeline-photos';
import suggestedProfilesFixture from '../../fixtures/suggested-profiles';
import profileThatIsFollowedByTheLoggedInUser from '../../fixtures/profile-followed-by-logged-in-user';
import profileThatIsNotFollowedByTheLoggedInUser from '../../fixtures/profile-not-followed-by-logged-in-user';
import useUser from '../../hooks/use-user';
import * as ROUTES from '../../constants/routes';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ username: 'peter' }),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

jest.mock('../../services/firebase');
jest.mock('../../hooks/use-user');

describe('<Profile />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the profile page with a user profile', async () => {
    await act(async () => {
      getUserByUsername.mockImplementation(() => [userFixture]);
      getUserPhotosByUsername.mockImplementation(() => photosFixture);
      useUser.mockImplementation(() => ({ user: userFixture }));

      const { getByText, getByTitle, getAllByTitle } = render(
        <Router>
          <FirebaseContext.Provider
            value={{
              firebase: {
                auth: jest.fn(() => ({
                  signOut: jest.fn(() => Promise.resolve({}))
                }))
              }
            }}
          >
            <UserContext.Provider
              value={{
                user: {
                  uid: '3',
                  displayName: 'peter'
                }
              }}
            >
              <Profile />
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>
      );

      await waitFor(() => {
        expect(mockHistoryPush).not.toHaveBeenCalled();
        expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.NOT_FOUND);
        expect(getUserByUsername).toHaveBeenCalledWith('peter');
        expect(getAllByTitle('Sign Out')).toBeTruthy();
        // expect(getByText('peter')).toBeTruthy();
        // expect(getByText('Peter McGroof')).toBeTruthy();
      });
    });
  });
});
