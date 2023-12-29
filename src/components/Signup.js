import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { getAuth, createUserWithEmailAndPassword, sendSignInLinkToEmail } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase";

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const writeData = async (userId) => {
    try {
      const docRef = await addDoc(collection(firestore, "users"), {
        userId,
        name,
        company,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handlePasswordlessSignup = async () => {
    try {
      await sendSignInLinkToEmail(auth, email, {
        url: `${window.location.origin}/profile`, // URL to redirect after verification
        handleCodeInApp: true,
      });
  
      alert(
        `An email has been sent to ${email}. Click the link in the email to sign in.`
      );
  
      navigate("/");
    } catch (err) {
      console.error("Error sending email link:", err);
      setError("Error sending email link. Please check the console for details.");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      await writeData(auth.currentUser.uid);
      
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Auth Signup</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="company"
              onChange={(e) => setCompany(e.target.value)}
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
              Sign up with Email
            </Button>
          </div>
        </Form>
        <div className="mt-3">
          <Button variant="link" onClick={handlePasswordlessSignup}>
            Sign up with Email Link
          </Button>
        </div>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </>
  );
};

export default Signup;
