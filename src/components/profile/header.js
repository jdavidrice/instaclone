/* eslint-disable jsx-a11y/img-redundant-alt */
// import { useState, useEffect, useContext } from 'react';
// import PropTypes from 'prop-types';
// import Skeleton from 'react-loading-skeleton';
// import useUser from '../../hooks/use-user';
// import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';
// import UserContext from '../../context/user';

// export default function Header({
//   photosCount,
//   followerCount,
//   setFollowerCount,
//   profile: {
//     docId: profileDocId,
//     userId: profileUserId,
//     fullName,
//     followers,
//     following,
//     username: profileUsername
//   }
// }) {
//   const { user: loggedInUser } = useContext(UserContext);
//   const { user } = useUser(loggedInUser?.uid);
//   const [isFollowingProfile, setIsFollowingProfile] = useState(false);
//   const activeBtnFollow = user?.username && user?.username !== profileUsername;

//   const handleToggleFollow = async () => {
//     setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
//     setFollowerCount({
//       followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
//     });
//     await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
//   };

//   useEffect(() => {
//     const isLoggedInUserFollowingProfile = async () => {
//       const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
//       setIsFollowingProfile(!!isFollowing);
//     };

//     if (user?.username && profileUserId) {
//       isLoggedInUserFollowingProfile();
//     }
//   }, [user?.username, profileUserId]);

//   return (
//     <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
//       <div className="container flex justify-center items-center">
//         {profileUsername ? (
//           <img
//             className="rounded-full h-40 w-40 flex"
//             alt={`${user.username} profile picture`}
//             src={`/images/avatars/${profileUsername}.jpg`}
//           />
//         ) : (
//           <img
//             className="rounded-full h-40 w-40 flex"
//             alt="User profile picture"
//             src="/images/avatars/default.png"
//           />
//         )}
//       </div>
//       <div className="flex items-center justify-center flex-col col-span-2">
//         <div className="container flex items-center">
//           <p className="text-2xl mr-4">{profileUsername}</p>
//           {activeBtnFollow && (
//             <button
//               className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
//               type="button"
//               onClick={handleToggleFollow}
//               onKeyDown={(event) => {
//                 if (event.key === 'Enter') {
//                   handleToggleFollow();
//                 }
//               }}
//             >
//               {isFollowingProfile ? 'Unfollow' : 'Follow'}
//             </button>
//           )}
//         </div>
//         <div className="container flex mt-4">
//           {!followers || !following ? (
//             <Skeleton count={1} width={677} height={24} />
//           ) : (
//             <>
//               <p className="mr-10">
//                 <span className="font-bold">{photosCount}</span>
//                 {` `}
//                 photos
//               </p>
//               <p className="mr-10">
//                 <span className="font-bold">{followerCount}</span>
//                 {` `}
//                 {followerCount === 1 ? 'follower' : 'followers'}
//               </p>
//               <p className="mr-10">
//                 <span className="font-bold">{following.length}</span>
//                 {` `}
//                 following
//               </p>
//             </>
//           )}
//         </div>
//         <div className="container mt-4">
//           <p className="font-medium">{!fullName ? <Skeleton height={24} /> : fullName}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// Header.propTypes = {
//   photosCount: PropTypes.number.isRequired,
//   followerCount: PropTypes.number.isRequired,
//   setFollowerCount: PropTypes.func.isRequired,
//   profile: PropTypes.shape({
//     docId: PropTypes.string,
//     userId: PropTypes.string,
//     fullName: PropTypes.string,
//     username: PropTypes.string,
//     followers: PropTypes.array,
//     following: PropTypes.array
//   }).isRequired
// };

import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import * as ROUTES from '../../constants/routes';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';
import useUser from '../../hooks/use-user';

export default function Header() {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12" />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items">
            {loggedInUser ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>

                <button
                  type="button"
                  title="Sign Out"
                  onClick={() => {
                    firebase.auth().signOut();
                    history.push(ROUTES.LOGIN);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      firebase.auth().signOut();
                      history.push(ROUTES.LOGIN);
                    }
                  }}
                >
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                {user && (
                  <div className="flex items-center cursor-pointer">
                    <Link to={`/p/${user?.username}`}>
                      <img
                        className="rounded-full h-8 w-8 flex"
                        src={`/images/avatars/${user?.username}.jpg`}
                        alt={`${user?.username} profile`}
                        onError={(e) => {
                          e.target.src = DEFAULT_IMAGE_PATH;
                        }}
                      />
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
