import React from "react";
import "./CustomAlert.css";

function CustomAlert({ message, onClose }) {
  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert">
        <h3>TIVA</h3>

        <p>{message}</p>

        <button onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default CustomAlert;