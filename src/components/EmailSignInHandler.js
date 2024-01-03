// EmailSignInHandler.js

import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useEffect } from "react";

const EmailSignInHandler = () => {
  const auth = getAuth();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem("emailForSignIn");
      console.log("Retrieved email from localStorage:", email); // Log the retrieved email

      if (!email) {
        console.error("Email not found in localStorage");
        return;
      }

      // Remove the email from storage
      window.localStorage.removeItem("emailForSignIn");

      // Sign in the user with the email link
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          console.log("Successfully signed in with email link", result);
        })
        .catch((error) => {
          console.error("Error signing in with email link", error);
        });
    }
  }, [auth]);

  return null;
};

export default EmailSignInHandler;
