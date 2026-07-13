import React, { useState } from "react";
import { API } from "./services/api";
import "./Register.css";
import CustomAlert from "./CustomAlert";

function Register() {

  const [full_name, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleRegister = async () => {

    const response = await fetch(API.register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name,
        username,
        email,
        phone,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setAlertMessage("Registration Successful");

      setFullName("");
      setUsername("");
      setEmail("");
      setPhone("");
      setPassword("");
    } else {
      setAlertMessage(data.error || "Registration Failed");
    }
  };

  return (
    <>
    <div className="register-page">

      <div className="register-card">

        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={full_name}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="register-btn"
          onClick={handleRegister}
        >
          Register
        </button>

        <div className="register-footer">
          Already have an account? <span>Login</span>
        </div>

      </div>

    </div>

    {alertMessage && (
      <CustomAlert
        message={alertMessage}
        onClose={() => setAlertMessage("")}
      />
    )}
    </>
  );
}

export default Register;