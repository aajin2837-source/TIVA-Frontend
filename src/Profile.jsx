import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert";
function Profile() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    fetch(
      `https://aajin.pythonanywhere.com/api/profile/?user_id=${localStorage.getItem(
        "user_id"
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFullName(data.full_name || "");
        setUsername(data.username || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setDateOfBirth(data.date_of_birth || "");
      })
      .catch((error) => {
        console.log("Profile fetch error:", error);
      });
  }, []);

  const updateProfile = async () => {
    try {
      const response = await fetch(
        "https://aajin.pythonanywhere.com/api/profile/update/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: localStorage.getItem("user_id"),
            full_name: fullName,
            phone: phone,
            date_of_birth: dateOfBirth,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAlertMessage(data.message || "Profile Updated Successfully");
      } else {
        setAlertMessage(data.error || "Update Failed");
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("Something went wrong");
    }
  };

  return (
    <>
    <div className="profile-page">
        <button
        className="back-btn"
        onClick={() => navigate("/mainhome")}
      >
        ← Back
      </button>
      <h1>My Profile</h1>

      <div className="profile-card">
        <div className="profile-left">
          <h3>My Profile</h3>
          <p>Manage your profile details</p>
        </div>

        <div className="profile-right">
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label>Username</label>
          <input
            type="text"
            value={username}
            readOnly
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            readOnly
          />

          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label>Date of Birth</label>
          <input
            type="date"
            value={dateOfBirth || ""}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />

          <button
            className="update-btn"
            onClick={updateProfile}
          >
            Update Changes
          </button>
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

export default Profile;