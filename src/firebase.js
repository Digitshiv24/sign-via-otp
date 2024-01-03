import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBH3IrciFG5QStKV4WQppRuvSDgcUdwLBk",
  authDomain: "testrr-4fbd9.firebaseapp.com",
  projectId: "testrr-4fbd9",
  storageBucket: "testrr-4fbd9.appspot.com",
  messagingSenderId: "40634169050",
  appId: "1:40634169050:web:2937583ee6a4660ddd57e3"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };