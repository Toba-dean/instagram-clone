import { useState, useEffect, useContext } from 'react';
import { getPhotos, getUserByUserId } from '../services/firebase,';
import { UserContext } from '../context/user';


const usePhotos = () => {

  // get the user state from context
  const { user: { uid: userId = '' } } = useContext(UserContext)
  const [photos, setPhotos] = useState(null);
  // console.log(userId);

 useEffect(() => {
   async function getTimelinePhotos() {
    // get the following prop from the user returned. note following is an array
    const [{ following }] = await getUserByUserId(userId);

    // the person the user is following photo array
    let followedUserPhotos = [];

    // check if there are users id's in the following array
    if(following.length > 0) {
      // get the images of the users in my following array.
      // receive {photoOwner username, photoDetails and likedBool}
      followedUserPhotos = await getPhotos(userId, following); 
    }

    // sort by date created.
    followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
    setPhotos(followedUserPhotos); 
   }

   getTimelinePhotos()

 }, [userId]);
 
//  return {username, ...photo, bool}
 return { photos }

}

export default usePhotos
