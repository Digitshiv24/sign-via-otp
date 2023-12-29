// EmailSignup.js
import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { sendSignInLinkToEmail } from "firebase/auth";

const EmailSignup = ({ auth, navigate }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailSignup = async (e) => {
    e.preventDefault();

    try {
      // Validate the email format (you can add more sophisticated validation)
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        setError("Invalid email address");
        return;
      }

      // Send the email link for passwordless sign-in
      await sendSignInLinkToEmail(auth, email, {
        url: `${window.location.origin}/profile`, // URL to redirect after verification
        handleCodeInApp: true,
      });

      alert(`An email has been sent to ${email}. Click the link in the email to sign in.`);

      navigate("/"); // or navigate to the desired page
    } catch (err) {
      console.error("Error sending email link:", err);
      setError("Error sending email link. Please check the console for details.");
    }
  };

  return (
    <div className="p-4 box">
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleEmailSignup}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Sign up with Email
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EmailSignup;
