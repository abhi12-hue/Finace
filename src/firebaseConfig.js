// Import necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration (replace with your actual config from Firebase console)
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

// Initialize Firestore (database)
const db = getFirestore(app);

// Initialize Analytics
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Google Auth provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export the instances to be used in other parts of your app
export { db, analytics, auth, provider };
