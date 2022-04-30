import Firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

import { seedDatabase } from '../seed';


// call seed file to populate firestore once!!

const firebaseConfig = {
  apiKey: "AIzaSyAum_UroApWe1F70oSS4tR-H2NF_mhumfw",
  authDomain: "instagram-c785a.firebaseapp.com",
  projectId: "instagram-c785a",
  storageBucket: "instagram-c785a.appspot.com",
  messagingSenderId: "629840317177",
  appId: "1:629840317177:web:c898aed8729bf7c3ce7028"
};

export const firebase = Firebase.initializeApp(firebaseConfig);
export const  { FieldValue } = Firebase.firestore;
export const auth = Firebase.auth(firebase)


// sending the seed file to the databae/
// seedDatabase(firebase)