import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase";

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
        email,
        company,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const checkIfEmailExists = async (email) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      return methods.length > 0; // If length > 0, email is registered
    } catch (error) {
      console.error('Error checking if email exists:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const emailExists = await checkIfEmailExists(email);

      if (emailExists) {
        setError("This email is already registered. Please log in instead.");
      } else {
        // Email is not registered, proceed with sign up
        await signUp(email, password);
        await writeData(auth.currentUser.uid);

        navigate("/");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("Error during signup. Please check the console for details.");
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
      
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </>
  );
};

export default Signup;
