import useUser from "../../hooks/useuser"

import User from "./User.component";
import Suggestions from "./Suggestions.component";

export default function Sidebar() {

  const { user: { docId = '', fullName, username, userId, following } } = useUser(); 
  
  return (
    <div className="p-4">
      {/* currently logged in user */}
      <User 
        username={username} 
        fullName={fullName} 
      />

      {/* showing people to follow and if the userId is not in the following array */}
      <Suggestions 
        userId={userId} 
        following={following} 
        loggedInUserDocId={docId} 
      />
    </div>
  )
}