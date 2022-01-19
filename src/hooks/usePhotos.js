import { useState, useEffect, useContext } from 'react';
import { getPhotos, getUserByUserId } from '../services/firebase,';
import { UserContext } from '../context/user';


const usePhotos = () => {

  const { user: { uid: userId ='' } } = useContext(UserContext)
  const [photos, setPhotos] = useState(null);
  // console.log(userId);

 useEffect(() => {
   async function getTimelinePhotos() {
    const [{ following }] = await getUserByUserId(userId);
    let followedUserPhotos = [];
    let myPhoto = []

    if(following.length > 0) {
      followedUserPhotos = await getPhotos(userId, following);
    }

    followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
    setPhotos(followedUserPhotos);
   }
   getTimelinePhotos()
 }, [userId])
 
 return { photos }

}

export default usePhotos
