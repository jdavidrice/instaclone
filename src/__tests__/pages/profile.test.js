import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Profile from '../../pages/profile';
import UserContext from '../../context/user';
import FirebaseContext from '../../context/firebase';
import * as ROUTES from '../../constants/routes';
import {
  isUserFollowingProfile,
  getUserByUsername,
  getUserPhotosByUsername
} from '../../services/firebase';
import useUser from '../../hooks/use-user';
import userFixture from '../../fixtures/logged-in-user';
// import suggestedProfilesFixture from '../../fixtures/suggested-profiles';
import profileThatIsFollowedByLoggedInUserFixture from '../../fixtures/profile-followed-by-logged-in-user';
import profileThatIsNotFollowedByLoggedInUserFixture from '../../fixtures/profile-not-followed-by-logged-in-user';
import photosFixture from '../../fixtures/timeline-photos';

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

      const { getByText, getByTitle } = render(
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
                  uid: 'R4VG4Q2TxpNJmz9oEkcnZqV8YPQ2',
                  displayName: 'jeremy'
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
        expect(getUserByUsername).toHaveBeenCalled();
        expect(getUserByUsername).toHaveBeenCalledWith('peter');
        expect(getByTitle('Sign Out')).toBeTruthy();
        expect(getByText('jeremy')).toBeTruthy();
        expect(getByText('Jeremy Rice')).toBeTruthy();

        screen.getByText((content, node) => {
          const hasText = (node) => node.textContent === '0 photos';
          const nodeHasText = hasText(node);
          const childrenDontHaveText = Array.from(node.children).every((child) => !hasText(child));
          return nodeHasText && childrenDontHaveText;
        });

        screen.getByText((content, node) => {
          const hasText = (node) => node.textContent === '3 followers';
          const nodeHasText = hasText(node);
          const childrenDontHaveText = Array.from(node.children).every((child) => !hasText(child));
          return nodeHasText && childrenDontHaveText;
        });

        screen.getByText((content, node) => {
          const hasText = (node) => node.textContent === '1 following';
          const nodeHasText = hasText(node);
          const childrenDontHaveText = Array.from(node.children).every((child) => !hasText(child));
          return nodeHasText && childrenDontHaveText;
        });
      });

      // sign user out
      fireEvent.click(getByTitle('Sign Out'));
      fireEvent.keyDown(getByTitle('Sign Out'), {
        key: 'Enter'
      });
      expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.LOGIN);
    });
  });
});
