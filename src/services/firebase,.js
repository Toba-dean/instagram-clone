import { firebase, FieldValue } from '../libs/firebase'

export const doesUsernameExist = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username )
    .get()

  // console.log(result);

  return result.docs.map(user => (
    user.data().length > 0
    )
  )
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
}

// check all conditions before limit results
export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection('users').limit(10).get();

  return result.docs.map(user => ({
    ...user.data(),
    docId: user.id
  })).filter(profile => profile.userId !== userId && !following.includes(profile.userId))

  // return profiles; 
}

export async function updateLoggedInUserFollowing(loggedInUserDocId, // currently logged in user document id (karl's profile)
profileId, // the user that karl requests to follow
  isFollowingProfile // true/false (am i currently following this person?)
) {
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

export async function updateFollowedUserFollowers(
  profileDocId, // currently logged in user document id (karl's profile)
  loggedInUserDocId, // the user that karl requests to follow
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