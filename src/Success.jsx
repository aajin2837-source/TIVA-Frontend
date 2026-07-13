import React from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#f5f5f5",
      }}
    >
      <h1 style={{ color: "green" }}>✅ Payment Successful</h1>
      <p>Thank you for your purchase.</p>

      <button
        onClick={() => navigate("/mainhome")}
        style={{
          marginTop: "20px",
          padding: "12px 30px",
          background: "#d4af37",
          color: "#000",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Back to Shopping
      </button>
    </div>
  );
}

export default Success;