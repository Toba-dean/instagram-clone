import { useState, useEffect, useContext } from 'react'
import { getUserByUserId } from '../services/firebase,'
import { UserContext } from '../context/user';
 
// this get the logged user from the database via the getUserByUserId hook setting the user context uid as the argument, then returns the logged user
// it set the null user from the context to activeUser.
export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext)

  useEffect(() => {
    async function getUserObjByUserId() {
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    } 

    if (user.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return { user: activeUser}; 
}