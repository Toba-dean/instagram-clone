import React from 'react';
import { render } from 'react-dom';
import './index.css';
// import './styles/app.css'
import { BrowserRouter } from 'react-router-dom';


import App from './App';
import { firebase, FieldValue } from './libs/firebase';

// context
import { FirebaseContext } from './context/firebase'

render(
  // wrapping the app with the context(Firebase) passes the value state to the entire app.
  <React.StrictMode>
    <FirebaseContext.Provider value={{firebase, FieldValue}}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);