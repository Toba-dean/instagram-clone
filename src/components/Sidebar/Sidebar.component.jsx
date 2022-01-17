import useUser from "../../hooks/useuser"

import User from "./User.component";
import Suggestions from "./Suggestions.component";

export default function Sidebar() {

  const { user: { docId = '', fullname, username, userId, following } } = useUser();

  return (
    <div className="p-4">
      <User username={username} fullName={fullname} />
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
    </div>
  )
}