import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase";
import { getAuth, createUserWithEmailAndPassword, sendSignInLinkToEmail } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const auth = getAuth(app);
  const firestore = getFirestore(app);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/profile"); // Redirect to the authenticated user's page
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEmailLinkSignIn = async () => {
    try {
      console.log("handleEmailLinkSignIn called");
      console.log("Email Value before sending link:", email); // Log email before sending link
      await sendSignInLinkToEmail(auth, email, {
        url: `${window.location.origin}/profile`,
        handleCodeInApp: true,
      });
      // Set email in localStorage
      window.localStorage.setItem("emailForSignIn", email);
      alert(`An email has been sent to ${email}. Click the link in the email to sign in.`);
      navigate("/");
    } catch (err) {
      console.error("Error sending email link:", err);
      console.log("Email Value during error:", email); // Log email during error
      setError("Error sending email link. Please check the console for details.");
    }
  }
  
  

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Auth Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
          <div className="mt-3">
          <Button variant="link" onClick={handleEmailLinkSignIn}>
            Sign up with Email Link
          </Button>
        </div>
        </Form>
        <hr />
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
        <Link to="/phonesignup">
          <div className="d-grid gap-2 mt-3">
            <Button variant="success" type="Submit">
              Sign in with Phone
            </Button>
          </div>
        </Link>
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default Login;