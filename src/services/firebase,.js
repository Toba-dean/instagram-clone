import { firebase, FieldValue } from '../libs/firebase'


// Checking if the user exists in the database.
export const doesUsernameExist = async username => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username )
    .get()

  // console.log(result);

  // retrun an array of user with the username passed.
  return result.docs.map(user => (user.data().length > 0))
}

// check if user exists by username and return an array of the user.
export const getUserByUsername = async username => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username )
    .get()

    const user = result.docs.map(item => ({
      ...item.data(),
      docId: item.id
    }));
  
    // return the array of user with the username passed
    return user
}

// query logged user from the firestore where userId === userId (passed from the auth)... simply gets the user by ID
export async function getUserByUserId(userId) {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();

  const user = result.docs.map(item => ({
    ...item.data(),
    docId: item.id
  }));

  // return the array of user with userId passed.
  return user; 
}

// this also brings the user array checking for username and destructures it to an {} 
// this checks the photos collection where photo userId === logged user userId 
// this then returns an array of the photos of the loggedin user (username)
export async function getUserPhotosByUsername(username) {
  const [user] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', user.userId)
    .get();

    const photos = result.docs.map((photo) => ({
      ...photo.data(),
      docId: photo.id
    }));
    
    return photos
}

// check all conditions before limit results
// so i'm returning in this func an array that contains profile that: 
// -> is not mine i.e logged in user(userId)
// -> i am not following. i.e the profile userId is not in my following array.
export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection('users').limit(10).get();

  // get the an array of users that are not in the following array.
  return result.docs.map(user => ({
    ...user.data(),
    docId: user.id
  })).filter(profile => profile.userId !== userId && !following.includes(profile.userId))
}

// this updates my(logged in user) own array of the new following i.e following[+ profileId], when i follow a new suggested account.
export async function updateLoggedInUserFollowing(loggedInUserDocId, // currently logged in user document id
  profileId, // the user that i requests to follow
  isFollowingProfile // true/false (am i currently following this person?)
) {
  // get my document from the users collection, update my following arrat 
  return firebase
    .firestore()                            
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile ?
        FieldValue.arrayRemove(profileId) :
        FieldValue.arrayUnion(profileId)
    });
}

// this updates my own array of the new follower i.e follower[+ profileId] , when a new user follows my(logged in user) account.
export async function updateFollowedUserFollowers(
  profileDocId, // the user that i requests to follow
  loggedInUserDocId, // currently logged in user document id (karl's profile)
  isFollowingProfile // true/false (am i currently following this person?)
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile ?
        FieldValue.arrayRemove(loggedInUserDocId) :
        FieldValue.arrayUnion(loggedInUserDocId)
    });
}


export async function getPhotos(userId, following) {
  // check if the userId passed is in the current logged users following array
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

    // give an array of the following users photos
  const userFollowedPhotos = result.docs.map(photo => ({
    ...photo.data(),
    docId: photo.id
  }));

  // check if logged in user have liked the following users photo.
  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async photo => {
      let userLikedPhoto = false;

      // check the likes props array, if loggedin user id is in it
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      // photo.userId = 2
      // get raphael details 
      // get the owner of the photo
      const user = await getUserByUserId(photo.userId);

      // get the users username i.e raphael
      const { username } = user[0];

      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;  // { username of the owner of photos, allPhotosInfo, bool(either liked or not.) }
}

// Getting a reference to my photos
export async function myPhotos(userId) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', userId)
    .get();


  const myPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));

  const myPhotoDetails = await Promise.all(
    myPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      // photo.userId = 2
      const user = await getUserByUserId(photo.userId);
      // raphael
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );

  return myPhotoDetails;
}

// check the user collection 
// -> if the username === logged in user username
// -> also check the loged in user following [] if it contains the profile searched docId
// returns the logged in user [] that contains the profileUser as the result.
export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername) // dean (active logged in user)
    .where('following', 'array-contains', profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  // 1st param: dean's doc id
  // 2nd param: raphael's user id
  // 3rd param: is the user following this profile? e.g. does dean follow raphael? (true/false)
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);

  // 1st param: dean's user id
  // 2nd param: raphael's doc id
  // 3rd param: is the user following this profile? e.g. does dean follow raphael? (true/false)
  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}