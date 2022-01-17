import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import useAuthListener from './hooks/use-auth-listener';
import { UserContext } from './context/user'


// Components
const Login = lazy(() => import('./pages/Login.component'))
const SignUp = lazy(() => import('./pages/SignUp.component'))
const Not_Found = lazy(() => import('./pages/Not_Found.component'))
const Dashboard = lazy(() => import('./pages/Dashboard.component'))

function App() {

  const { user } = useAuthListener()

  return (
    <UserContext.Provider value={{user}}>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGNUP} component={SignUp} />
          <Route path={ROUTES.DASHBOARD} component={Dashboard} />
          <Route component={Not_Found} />
        </Switch>
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
