import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserDetailsPage.css";

const UserDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async () => {
    console.log("Submitting user details:", { name, phone, address });
    navigate("/home");
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