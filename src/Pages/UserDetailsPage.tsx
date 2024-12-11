import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../styles/UserDetailsPage.css";

const UserDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async () => {
    try {
      setError(""); // Clear any previous errors

      const user = auth.currentUser; // Get the logged-in user
      if (!user) {
        setError("You must be logged in to update your profile.");
        return;
      }

      const userRef = doc(db, "users", user.uid); // Reference to the Firestore document
      const userSnap = await getDoc(userRef); // Check if the document exists

      if (!userSnap.exists()) {
        // If the document doesn't exist, create it
        await setDoc(userRef, {
          name,
          phone,
          address,
          isProfileComplete: true,
        });
      } else {
        // If the document exists, update the fields
        await setDoc(
          userRef,
          {
            name,
            phone,
            address,
            isProfileComplete: true,
          },
          { merge: true } // Merge with existing fields
        );
      }

      navigate("/home"); // Redirect to the home page
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setError("An error occurred while updating your profile. Please try again.");
    }
  };

  return (
    <div className="user-details-container">
      <h2>Complete Your Profile</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default UserDetailsPage;