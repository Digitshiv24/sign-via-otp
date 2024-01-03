import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PhoneSignUp from "./components/PhoneSignUp";
import Profile from "./components/Profile"; // Import the Profile component
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import EmailSignInHandler from "./components/EmailSignInHandler";

function App() {
  return (
    <Container style={{ width: "400px" }}>
      <Row>
        <Col>
          <UserAuthContextProvider>
            {/* Remove the following line, it's causing the error */}
            {/* <Route path="/email-signup" element={<EmailSignInHandler />} /> */}
            <EmailSignInHandler />
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/phonesignup" element={<PhoneSignUp />} />
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
