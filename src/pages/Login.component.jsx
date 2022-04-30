import { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

import { FirebaseContext } from '../context/firebase'


const Login = () => {

  const history = useHistory();
  const { firebase } = useContext(FirebaseContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const isInvalid = password === '' || email === ''

  const handleLogin = async (event) => {
    event.preventDefault();

    try{
      await firebase.auth().signInWithEmailAndPassword(email, password)
      history.push(ROUTES.DASHBOARD)
    }catch(error) {
      setEmail('');
      setPassword('');
      setError(error.message)
    }
  }

  useEffect(() => {
    document.title = 'Login - Instagram'
  }, []) 

  return (
    <div className='container flex mx-auto max-w-screen-md items-center h-screen'>

      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="" />
      </div>

      <div className='flex flex-col w-2/5'>

        <div className='flex flex-col bg-white p-4 border items-center border-gray-primary mb-4 rounded' >
          <h1 className='flex justify-center w-full'>
            <img src="/images/logo.png" alt="" className='top-2 w-6/12' />
          </h1>
          {
            error && <p className='mb-4 text-xs text-red-primary w-full'>{error}</p>
          }
          <form onSubmit={handleLogin} method="post">
            <input
              aria-label='Enter e-mail address'
              type='text'
              placeholder='E-mail address'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
              onChange={({ target }) => setEmail(target.value)}
            />
            <input
              aria-label='Enter password'
              type='password'
              placeholder='Password'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
              onChange={({ target }) => setPassword(target.value)}
            />
            <button 
              type='submit'
              disabled={isInvalid}
              className={`bg-blue-medium text-white w-full h-8 font-bold rounded ${isInvalid && 'opacity-50'}`}
            >Log In</button> 
          </form>
        </div>

        <div className="flex item-center justufy-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className='text-sm'>
            Don't have an account? {' '}
            <Link to={ROUTES.SIGNUP} className='font-bold text-blue-medium'>
              Sign up
            </Link>
          </p>
        </div>

      </div>

    </div>
  )
}

export default Login
