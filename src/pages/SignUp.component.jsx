import { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

import { FirebaseContext } from '../context/firebase'
import { doesUsernameExist } from '../services/firebase,'


const SignUp = () => {

  const history = useHistory();
  const { firebase } = useContext(FirebaseContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const isInvalid = password === '' || email === ''

  const handleSignup = async (event) => {
    event.preventDefault();

    const usernameExist = await doesUsernameExist(username) 

    // if no user with the username create a new user
    if(!usernameExist.length) {
      try {
        const createdResult = await firebase.auth().createUserWithEmailAndPassword(email, password);

        // Goes to authentication
        await createdResult.user.updateProfile({
          displayName: username,
        })

        // Goes to firestore
        await firebase.firestore().collection('users').add({
          userId: createdResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          email: email.toLowerCase(),
          following: [],
          followers: [],
          createdAt: Date.now()
        })

        history.push(ROUTES.DASHBOARD)

      } catch (error) {
        setEmail('');
        setUsername('');
        setFullName('');
        setPassword('');
        setError(error.message)
      }
    }else {
      setError('Username already exists, please try another.')
    }
  }

  useEffect(() => {
    document.title = 'Sign Up - Instagram'
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
          <form onSubmit={handleSignup} method="post">
            <input
              aria-label='Enter e-mail address'
              type='text'
              placeholder='E-mail address'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounder mb-2'
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />
            <input
              aria-label='Enter fullname'
              type='text'
              placeholder='Fullname'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounder mb-2'
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label='Enter username'
              type='text'
              placeholder='Username'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounder mb-2'
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label='Enter password'
              type='password'
              placeholder='Password'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounder mb-2'
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button 
              type='submit'
              disabled={isInvalid}
              className={`bg-blue-medium text-white w-full h-8 font-bold rounded ${isInvalid && 'opacity-50'}`}
            >Sign Up</button> 
          </form>
        </div>

        <div className="flex item-center justufy-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className='text-sm'>
            Have an account? {' '}
            <Link to={ROUTES.LOGIN} className='font-bold text-blue-medium'>
              Log In
            </Link>
          </p>
        </div>

      </div>

    </div>
  )
}

export default SignUp
