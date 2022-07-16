// this just the file to be added to the db

export function seedDatabase(firebase) {
  const users = [
    {
      userId: '84A6NcCWu6WMHZWozYG5ArTJbIA2',
      username: 'Dean',
      fullName: 'Sheriff Dean',
      emailAddress: 'tobaogundimu@gmail.com',
      following: ['2'],
      followers: ['2'],
      dateCreated: Date.now()
    },
    {
      userId: '2',
      username: 'raphael',
      fullName: 'Raffaello Sanzio da Urbino',
      emailAddress: 'raphael@sanzio.com',
      following: ['84A6NcCWu6WMHZWozYG5ArTJbIA2'],
      followers: ['84A6NcCWu6WMHZWozYG5ArTJbIA2'],
      dateCreated: Date.now()
    },
    {
      userId: '3',
      username: 'dali',
      fullName: 'Salvador Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: [],
      dateCreated: Date.now()
    },
    {
      userId: '4',
      username: 'orwell',
      fullName: 'George Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: [],
      dateCreated: Date.now()
    }
  ];

  // this craetes a collection of users and adds the user to it
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection('users').add(users[k]);
  }

  // create a photos collection and add photos of user with uid === 2 to it
  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection('photos')
      .add({
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: 'Saint George and the Dragon',
        likes: [],
        comments: [
          {
            displayName: 'dali',
            comment: 'Love this place, looks like my animal farm!'
          },
          {
            displayName: 'orwell',
            comment: 'Would you mind if I used this picture?'
          }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
      });
  }

  // for (let j = 1; j <= 3; ++j) {
  //   firebase
  //     .firestore()
  //     .collection('photos')
  //     .add({
  //       photoId: j,
  //       userId: '84A6NcCWu6WMHZWozYG5ArTJbIA2',
  //       imageSrc: `/images/users/dean/${j}.jpg`,
  //       caption: 'Saint George and the Dragon',
  //       likes: [],
  //       comments: [
  //         {
  //           displayName: 'dali',
  //           comment: 'Love this place, looks like my animal farm!'
  //         },
  //         {
  //           displayName: 'orwell',
  //           comment: 'Would you mind if I used this picture?'
  //         }
  //       ],
  //       userLatitude: '40.7128°',
  //       userLongitude: '74.0060°',
  //       dateCreated: Date.now()
  //     });
  // }
}
