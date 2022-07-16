import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getUserPhotosByUsername } from '../../services/firebase,';
import Photos from './Photos.component';
import Header from './Header.component';

export const UserProfile = ({ user }) => {

  const reducer = (state, newState) => ({ ...state, ...newState });

  const initialState = {
    profile: {},
    photosCollection: null,
    followerCount: 0
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState 
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      // get the photos of the users username passed.
      const photos = await getUserPhotosByUsername(user.username);
      
      dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
    }
    if(user.username) {
      getProfileInfoAndPhotos();
    }
  }, [user.username]);



  return (
    <div>
       <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </div>
  )
}


UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string
  })
};

