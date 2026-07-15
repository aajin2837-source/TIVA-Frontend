import React, { useState } from "react";
import "./Payment.css";
import CustomAlert from "./CustomAlert";
import { useNavigate } from "react-router-dom";
import.meta.env.VITE_API_URL
function Payment() {
  const [method, setMethod] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const grandTotal =
    Number(localStorage.getItem("grandTotal")) || 0;

  const handlePayment = async () => {
    if (!method) {
      setAlertMessage("Please select a payment method");
      return;
    }

    // Cash On Delivery
    if (method === "Cash On Delivery") {
      setAlertMessage(
        "Order Placed Successfully with Cash On Delivery"
      );
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/create-order/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: grandTotal,
          }),
        }
      );

      const data = await response.json();

      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        name: "TIVA",
        description: "Order Payment",
        order_id: data.order_id,

        handler: async function (response) {

  await fetch(
    `${import.meta.env.VITE_API_URL}/api/save-order/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payment_id:
          response.razorpay_payment_id,

        user_id:
          localStorage.getItem("user_id"),

        amount: grandTotal,
      }),
    }
  );

  navigate("/success");
},

        prefill: {
          name:
            localStorage.getItem("username") ||
            "Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#d4af37",
        },
      };

      const rzp =
        new window.Razorpay(options);

      rzp.open();
    } catch (error) {
      console.error(error);

      setAlertMessage(
        "Payment Failed. Please Try Again."
      );
    }
  };

  return (
    <>
      <div className="payment-page">
        <div className="payment-card">

          <h1>Payment Method</h1>

          <div className="payment-total">
            Grand Total : ₹{grandTotal}
          </div>

          <div className="payment-options">

            <label>
              <input
                type="radio"
                name="payment"
                value="UPI"
                onChange={(e) =>
                  setMethod(e.target.value)
                }
              />
              UPI
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="Credit Card"
                onChange={(e) =>
                  setMethod(e.target.value)
                }
              />
              Credit Card
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="Debit Card"
                onChange={(e) =>
                  setMethod(e.target.value)
                }
              />
              Debit Card
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="Net Banking"
                onChange={(e) =>
                  setMethod(e.target.value)
                }
              />
              Net Banking
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="Cash On Delivery"
                onChange={(e) =>
                  setMethod(e.target.value)
                }
              />
              Cash On Delivery
            </label>

          </div>

          <button
            className="pay-btn"
            onClick={handlePayment}
          >
            {method === "Cash On Delivery"
              ? "Place Order"
              : "Pay Now"}
          </button>

        </div>
      </div>

      {alertMessage && (
        <CustomAlert
          message={alertMessage}
          onClose={() =>
            setAlertMessage("")
          }
        />
      )}
    </>
  );
}

export default Payment;