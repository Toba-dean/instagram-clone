import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import useAuthListener from './hooks/use-auth-listener';
import { UserContext } from './context/user'


import ProtectedRoutes from './helpers/protected-route';
import IsUserLoggedIn from './helpers/IsUserLoggedIn';
import ReactLoader from './components/loader';

// Components
const Login = lazy(() => import('./pages/Login.component'))
const SignUp = lazy(() => import('./pages/SignUp.component'))
const Not_Found = lazy(() => import('./pages/Not_Found.component'))
const Dashboard = lazy(() => import('./pages/Dashboard.component'))
const ProfilePage = lazy(() => import('./pages/ProfilePage.component'))

function App() {

  const { user } = useAuthListener()

  return (
    // wrapping the routes with the context(Usercontext) passes the value state to the route.
    <UserContext.Provider value={{user}}>
      <Suspense fallback={<ReactLoader />}>
        <Switch>
          <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
            {/* Children */}
            <Login />
          </IsUserLoggedIn>
          <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGNUP}>
            {/* Children */}
            <SignUp />
          </IsUserLoggedIn>
          <ProtectedRoutes user={user} path={ROUTES.DASHBOARD} exact>
            {/* Children */}
            <Dashboard />
          </ProtectedRoutes>
          <Route path={ROUTES.PROFILE} component={ProfilePage} />
          
          {/* none existing routes go to this page */}
          <Route component={Not_Found} />
        </Switch>
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
