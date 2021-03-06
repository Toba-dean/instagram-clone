import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { getUserByUsername } from '../services/firebase,';

import Header from '../components/Header.component'
import { UserProfile } from '../components/Profile/Profile.component';

const ProfilePage = () => {

  // get the username from the parameters
  const { username } = useParams()
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // check if user with user name exists.
    async function checkUserExists() {
      const [user] = await getUserByUsername(username);
      if (user?.userId) {
        setUser(user);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
  }, [username, history]);

  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div> 
    </div>
  ) : null;
}

export default ProfilePage
