import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDeYINPsu3oJoIUzAD1jreWF1HBM-PdFt8",
    authDomain: "test-f72c1.firebaseapp.com",
    databaseURL: "https://test-f72c1-default-rtdb.firebaseio.com",
    projectId: "test-f72c1",
    storageBucket: "test-f72c1.appspot.com",
    messagingSenderId: "132470387002",
    appId: "1:132470387002:web:c1ec59dcc8dc191c8de003"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;