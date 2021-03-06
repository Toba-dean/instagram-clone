import { DEFAULT_IMAGE_PATH } from '../../constants/paths'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import propTypes from 'prop-types'

// This is the currently logged in users
const User = ({ username, fullName }) => {
  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
    ) : (
      <Link to={`/p/${username}`} className="grid grid-cols-4 mb-6 items-center">
        <div className="flex items-center justify-between col-span-1">
          <img
            className="rounded-full flex mr-3 w-14 h-14"
            src={`/images/avatars/${username}.jpg`}
            alt=""
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE_PATH; 
            }}
          />
        </div>
        <div className="col-span-3">
          <p className="font-bold text-sm">{username}</p>
          <p className="text-sm">{fullName}</p> 
        </div>
    </Link>
  );
}

export default User

User.propTypes = {
  username: propTypes.string,
  fullName: propTypes.string
};