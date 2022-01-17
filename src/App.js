import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom'
import * as ROUTES from './constants/routes'


// Components
const Login = lazy(() => import('./pages/Login/Login.component'))
const SignUp = lazy(() => import('./pages/SignUp/SignUp.component'))

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
    <Switch>
      <Route exact path={ROUTES.LOGIN} component={Login} />
      <Route exact path={ROUTES.SIGNUP} component={SignUp} />
    </Switch>
    </Suspense>
  );
}

export default App;
