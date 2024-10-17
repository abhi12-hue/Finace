// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth , GoogleAuthProvider} from 'firebase/auth';
import {getFirestore , doc , setDoc} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optionalabbhsa
const firebaseConfig = {
  apiKey: "AIzaSyAccrOHxoBVqbSHrNOXNfKZ0J930OTohEY",
  authDomain: "finacly-2ee8b.firebaseapp.com",
  projectId: "finacly-2ee8b",
  storageBucket: "finacly-2ee8b.appspot.com",
  messagingSenderId: "988960485274",
  appId: "1:988960485274:web:af641b2cf5d2d119859423",
  measurementId: "G-LN9EYP4XNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth =getAuth(app);
const provider = new GoogleAuthProvider();
export {db , auth , provider , doc , setDoc};