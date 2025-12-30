import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Common.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>} 

        <form onSubmit={handleLogin}>
          <div className="section">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button className="btn primary" type="submit">
              Login
            </button>
          </div>
        </form>

        <p className="text-center">
          Don’t have an account?{" "}
          <button className="btn secondary" onClick={() => navigate("/signup")}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
