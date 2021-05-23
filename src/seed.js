/* eslint-disable prettier/prettier */
/* eslint-disable no-plusplus */
export function seedDatabase(firebase) {
  const users = [
    {
      userId: 'R4VG4Q2TxpNJmz9oEkcnZqV8YPQ2',
      username: 'jeremy',
      fullName: 'Jeremy Rice',
      emailAddress: 'jdavidrice@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now(),
    },
    {
      userId: '2',
      username: 'brendan',
      fullName: 'Brendan Hofrashan',
      emailAddress: 'brendan@hofrashan.com',
      following: [],
      followers: ['R4VG4Q2TxpNJmz9oEkcnZqV8YPQ2'],
      dateCreated: Date.now(),
    },
    {
      userId: '3',
      username: 'peter',
      fullName: 'Peter McGroof',
      emailAddress: 'peter@mcgroof.com',
      following: [],
      followers: ['R4VG4Q2TxpNJmz9oEkcnZqV8YPQ2'],
      dateCreated: Date.now(),
    },
    {
      userId: '4',
      username: 'james',
      fullName: 'James Glippy',
      emailAddress: 'james@glippy.com',
      following: [],
      followers: ['R4VG4Q2TxpNJmz9oEkcnZqV8YPQ2'],
      dateCreated: Date.now(),
    },
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection('users').add(users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection('photos')
      .add({
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/brendan/${i}.jpg`,
        caption: 'Saint George and the Dragon',
        likes: [],
        comments: [
          {
            displayName: 'peter',
            comment: 'Love this place, looks like my animal farm!',
          },
          {
            displayName: 'james',
            comment: 'Would you mind if I used this picture?',
          },
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now(),
      });
  }
}
