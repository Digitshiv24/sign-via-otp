// Profile.js
import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import "firebase/auth";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";


import "./Profile.css"; // Import the CSS file

const Profile = () => {
  const { currentUser,logOut } = useUserAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const firestore = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userQuery = query(collection(firestore, "users"), where("userId", "==", authUser.uid));
        const querySnapshot = await getDocs(userQuery);

        querySnapshot.forEach((doc) => {
          setUser({
            email: authUser.email,
            name: doc.data().name,
            company: doc.data().company,
          });
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  if (loading) {
    return (
      <div className="profile-container loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {user ? (
        <div className="user-details">
          <p>
            <strong>Email:</strong> {user.email}
            <br />
            <strong>Name:</strong> {user.name}
            <br />
            <strong>Company:</strong> {user.company}
          </p>
        </div>
      ) : (
        <p className="not-logged-in">User not logged in</p>
      )}

<      Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
    </div>
  );
};

export default Profile;
