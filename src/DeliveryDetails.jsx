import React, { useState, useEffect } from "react";
import "./DeliveryDetails.css"
import CustomAlert from "./CustomAlert";
function DeliveryDetails() {
  const [alertMessage, setAlertMessage] = useState("");
  const [location, setLocation] = useState(
    localStorage.getItem("location") || "Location not set"
  );
  const getLocation = () => {
  if (!navigator.geolocation) {
    setAlertMessage("Geolocation is not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );

        const data = await response.json();

        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          "";

        const state =
          data.address.state || "";

        const address = `${city}, ${state}`;

        setLocation(address);

        localStorage.setItem(
          "location",
          address
        );

        setAlertMessage("Location Updated Successfully");
      } catch (error) {
        console.log(error);
      }
    },
    (error) => {
      console.log(error);
      setAlertMessage(
        "Location permission denied. Please allow location access in your browser."
      );
    }
  );
};
 

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  return (
  <>
    <div className="delivery-card">
      <h3>Delivery Details</h3>

      <div className="delivery-row">
        📍 <strong>{location}</strong>
        <button onClick={getLocation}>
          Change
        </button>
      </div>

      <div className="delivery-info">
        🚚 Delivery by {deliveryDate.toLocaleDateString()}
      </div>

      <div className="delivery-info">
        💳 Cash on Delivery Available
      </div>

      <div className="delivery-info">
        🔄 7 Days Easy Returns
      </div>

      <div className="delivery-info">
        ✅ Secure Payment
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
export default DeliveryDetails;