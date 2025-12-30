import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Common.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return false;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      setLoading(true);
      const res = await API.post("/auth/signup", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>Signup</h2>

        <form onSubmit={handleSubmit}>
          <div className="section">
            <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />

            <input name="email" type="email"placeholder="Email"value={formData.email} onChange={handleChange}/>

            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange}/>

            <input  name="confirmPassword"type="password"placeholder="Confirm Password" value={formData.confirmPassword}onChange={handleChange} />

            <select name="role" value={formData.role} onChange={handleChange}
>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <button className="btn primary" type="submit" disabled={loading}>
              {loading ? "Signing up..." : "Signup"}
            </button>
          </div>
        </form>

        {error && <p className="error">{error}</p>}

        <p className="text-center">
          Already have an account?{" "}
          <button className="btn secondary" onClick={() => navigate("/")}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
