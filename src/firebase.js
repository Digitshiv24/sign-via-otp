import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDetu-y9iYu3H-nEi_EdhSMCju-tbS5wXs",
  authDomain: "sign-via-email-21155.firebaseapp.com",
  projectId: "sign-via-email-21155",
  storageBucket: "sign-via-email-21155.appspot.com",
  messagingSenderId: "209037482842",
  appId: "1:209037482842:web:8be3ba8d3836ed09e83163"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };