// import { useState, useEffect, useContext } from 'react';
// import UserContext from '../context/user';
// import { getPhotos, getUserByUserId } from '../services/firebase';

// export default function usePhotos() {
//   const [photos, setPhotos] = useState(null);
//   const {
//     user: { uid: userId = '' }
//   } = useContext(UserContext);

//   useEffect(() => {
//     async function getTimelinePhotos() {
//       const [{ following }] = await getUserByUserId(userId);
//       let followedUserPhotos = [];

//       if (following.length > 0) {
//         followedUserPhotos = await getPhotos(userId, following);
//       }

//       followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
//       setPhotos(followedUserPhotos);
//     }

//     getTimelinePhotos();
//   }, [userId]);

//   return { photos };
// }

import { useState, useEffect } from 'react';
import { getPhotos } from '../services/firebase';

export default function usePhotos(user) {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function getTimelinePhotos() {
      // does the user actually follow people?
      if (user?.following?.length > 0) {
        const followedUserPhotos = await getPhotos(user.userId, user.following);
        // re-arrange array to be newest photos first by dateCreated
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }

    getTimelinePhotos();
  }, [user?.userId, user?.following]);

  return { photos };
}
