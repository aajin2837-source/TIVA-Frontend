import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./services/api";
import {
  FaShoppingCart,
  FaSearch,
  FaUser,
  FaHeart,
} from "react-icons/fa";
import Login from "./Login";
import "./Cart.css";
import "./MainHome.css";
import Navbar from "./Navbar";
import CustomAlert from "./CustomAlert";
function Cart() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [items, setItems] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const logout = () => {
  localStorage.removeItem("user_id");
  setAlertMessage("Logged Out Successfully");
  navigate("/mainhome");
  window.location.reload();
};
  const fetchCart = async () => {
  try {

  const user_id =
      localStorage.getItem("user_id");

  const response = await fetch(
      `${API.cart}?user_id=${user_id}`
    );

  const data = await response.json();

    setItems(data);

  } catch (error) {
    console.error("Fetch Error:", error);
  }
};

  useEffect(() => {
    fetchCart();
  }, []);

  const filteredItems = items.filter((item) =>
    item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const grandTotal = filteredItems.reduce(
    (sum, item) =>
      sum + parseFloat(item.total_price || 0),
    0
  );
  const proceedToPayment = () => {
  if (!localStorage.getItem("user_id")) {
    setAlertMessage("Please Login First");
    return;
  }

  localStorage.setItem(
    "grandTotal",
    grandTotal
  );

  navigate("/payment");
};

  const updateQuantity = async (id, delta) => {
    const item = items.find((i) => i.id === id);

    if (!item) return;

    const newQuantity = item.quantity + delta;

    if (newQuantity < 1) return;

    try {
      const response = await fetch(
        `https://tiva.onrender.com/api/cart/update/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: newQuantity,
          }),
        }
      );

      if (response.ok) {
        fetchCart();
      }
    } catch (err) {
      console.error("Network Error:", err);
    }
  };

  const removeItem = async (id) => {
    try {
      await fetch(
        `https://tiva.onrender.com/api/cart/delete/${id}/`,
        {
          method: "DELETE",
        }
      );

      fetchCart();
      setAlertMessage("Item Removed From Cart");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Navbar */}
      <header className="main-navbar">
        <div
          className="brand-logo"
          onClick={() => navigate("/mainhome")}
        >
          TIVA
        </div>

        <ul className="menu-links">
          <li onClick={() => navigate("/mainhome")}>
            Home
          </li>

          <li onClick={() => navigate("/products/coats")}>
            Coats
          </li>

          <li onClick={() => navigate("/products/shirts")}>
            Shirts
          </li>

          <li onClick={() => navigate("/products/pants")}>
            Pants
          </li>

          <li onClick={() => navigate("/products/tshirt")}>
            T-Shirts
          </li>

          <li onClick={() => navigate("/products/watches")}>
            Watches
          </li>

          <li onClick={() => navigate("/products/perfumes")}>
            Perfumes
          </li>

          <li onClick={() => navigate("/products/shoes")}>
            Shoes
          </li>

          <li onClick={() => navigate("/products/sandals")}>
            Sandals
          </li>
        </ul>

        <div className="right-nav">
          <div className="search-bar">
            <FaSearch />

            <input
              type="text"
              placeholder="Search Cart Products..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>

          <div className="profile-container">
  <div
    className="icon-btn"
    onClick={() => {
      if (localStorage.getItem("user_id")) {
        navigate("/profile");
      } else {
        setShowLogin(true);
      }
    }}
  >
    <FaUser />
  </div>

  <div className="profile-popup">
    👋 Welcome,
    <br />
    <strong>
      {localStorage.getItem("username") || "Guest"}
    </strong>
  </div>
</div>

          <div
            className="icon-btn"
            onClick={() => navigate("/favorites")}
          >
            <FaHeart />
          </div>

          <div
            className="icon-btn"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart />
          </div>
           {localStorage.getItem("user_id") && (
    <button
      className="logout-btn"
      onClick={logout}
    >
      Logout
    </button>
  )}

        </div>
      </header>

      {/* Cart Page */}
      <div className="cart-page">
        <h1>SHOPPING CART</h1>

        <div className="cart-container">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                className="cart-item"
                key={item.id}
              >
                <img
                  src={`https://tiva.onrender.com${item.image.replace(
                    "/media/media/",
                    "/media/"
                  )}`}
                  alt={item.title}
                />

                <div className="item-info">
                  <h3>{item.title}</h3>

                  <p className="price">
                    Total: ₹{item.total_price}
                  </p>
                </div>

                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, -1)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, 1)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <h2
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: "50px",
                color: "#666",
              }}
            >
              No Cart Products Found
            </h2>
          )}
        </div>

        <div className="cart-summary">
          <h2>
            Grand Total: ₹
            {grandTotal.toFixed(2)}
          </h2>
        </div>

        <button
  onClick={proceedToPayment}
  className="checkout-btn"
>
  Proceed To Payment
</button>
      </div>

      {/* Login Popup */}
      {showLogin && (
        <div
          className="login-overlay"
          onClick={() =>
            setShowLogin(false)
          }
        >
          <div
            className="login-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <Login
              onClose={() =>
                setShowLogin(false)
              }
            />
          </div>
          <Navbar/>
        </div>
      )}
     {alertMessage && (
  <CustomAlert
    message={alertMessage}
    onClose={() => setAlertMessage("")}
  />
)}
    </>
  );
}

export default Cart;