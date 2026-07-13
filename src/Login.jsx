import React, { useState } from "react";
import "./Login.css";
import { API } from "./services/api";
import CustomAlert from "./CustomAlert";

function Login({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {
    try {
      const response = await fetch(API.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage("Registration Successful");

        setIsLogin(true);

        setFormData({
          full_name: "",
          username: "",
          email: "",
          phone: "",
          password: "",
        });
      } else {
        setAlertMessage(data.error || "Registration Failed");
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("Server Error");
    }
  };

  const loginUser = async () => {
    try {
      const response = await fetch(API.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();
        if (data.success) {

  localStorage.setItem(
    "user",
    JSON.stringify(data)
  );

  localStorage.setItem(
    "user_id",
    data.id
  );

  localStorage.setItem(
    "username",
    data.username
  );

  // Clear form after login
  setFormData({
    full_name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  setAlertMessage("Login Successful");

  if (onClose) {
    onClose();
  }
}
       
     
      else {
        setAlertMessage("Invalid Username or Password");
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("Server Error");
    }
  };

  return (
  <>
    <div className="auth-wrapper">

      <button
        className="close-btn"
        onClick={onClose}
      >
        ✕
      </button>

      <div className="auth-left">

        <h1>TIVA</h1>

        <h2>
          {isLogin
            ? "Welcome Back"
            : "Create Account"}
        </h2>

        {!isLogin && (
          <>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          className="auth-btn"
          onClick={isLogin ? loginUser : registerUser}
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p
          className="switch-form"
          onClick={() => {
            setIsLogin(!isLogin);

            setFormData({
              full_name: "",
              username: "",
              email: "",
              phone: "",
              password: "",
            });
          }}
        >
          {isLogin
            ? "New User? Create Account"
            : "Already have an account? Login"}
        </p>

      </div>

      <div className="auth-right">
        <img
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
          alt="Fashion"
        />
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

export default Login;