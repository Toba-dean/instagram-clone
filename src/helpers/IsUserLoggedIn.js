import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';


export default function IsUserLoggedIn({ user, loggedInPath, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        // if there is no logged in user render the children
        if (!user) {
          return children
        }

        // if user redirect to the loggedInPath
        if (user) {
          return (
            <Redirect
              to={{
                pathname: loggedInPath,
                state: { from: location }
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}

IsUserLoggedIn.propTypes = {
  user: PropTypes.object,
  loggedInPath: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired
};
