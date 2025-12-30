import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Common.css";

function UserProfile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(storedUser?.fullName || "");
  const [email, setEmail] = useState(storedUser?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSaveProfile = async () => {
    try {
      const res = await API.put("/users/update-profile", {
        fullName,
        email,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("Profile updated successfully");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Profile update failed");
      setMessage("");
    }
  };

  const handleChangePassword = async () => {
    try {
      await API.put("/users/change-password", {
        oldPassword,
        newPassword,
      });

      setMessage("Password changed successfully");
      setError("");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Password update failed");
      setMessage("");
    }
  };

  const handleCancel = () => {
    setFullName(storedUser.fullName);
    setEmail(storedUser.email);
    setOldPassword("");
    setNewPassword("");
    setMessage("");
    setError("");
  };

  return (
    <>
    <div className="profile-container">
      <div className="profile-box">
       
        <h2>User Profile</h2>

        <div className="section">
          <h4>Profile Information</h4>

          <input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="btn-group">
            <button className="btn primary" onClick={handleSaveProfile}>
              Save
            </button>
            <button className="btn secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>

        <div className="section">
          <h4>Change Password</h4>

          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button className="btn primary" onClick={handleChangePassword}>
            Update Password
          </button>
        </div>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <div className="btn-group">
         <button  onClick={() => navigate("/dashboard")} className="btn back-button btn-secondary ">Go Back</button>
         <button onClick={() => navigate("/")} className="btn back-button btn-secondary">Go to Login</button>
         </div>
      </div>
    </div>
    </>
  );
}

export default UserProfile;
