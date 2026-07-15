import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaSearch,
  FaUser,
  FaHeart,
} from "react-icons/fa";
import Login from "./Login";
import { API } from "./services/api";
import "./MainHome.css";
import Navbar from "./Navbar";
import CustomAlert from "./CustomAlert";
import.meta.env.VITE_API_URL
function Favorites() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const logout = () => {
  localStorage.removeItem("user_id");
  setAlertMessage("Logged Out Successfully");
  navigate("/mainhome");
  window.location.reload();
};

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(data);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter(
      (item) => item.id !== id
    );

    setFavorites(updated);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );
  };

 const addToCart = async (item) => {
  try {
    const response = await fetch(API.addCart, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...item,
        user_id: localStorage.getItem("user_id"),
      }),
    });

    const data = await response.json();

    console.log("Cart Response:", data);

    if (response.ok) {
      setAlertMessage("Added To Cart");
    } else {
      setAlertMessage(data.error || "Failed To Add Cart");
    }
  } catch (error) {
    console.error(error);
    setAlertMessage("Server Error");
  }
};

  const filteredFavorites = favorites.filter((item) =>
    item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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
              placeholder="Search Favorites..."
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

      {/* Favorites */}
      <div className="products-page">
        <div className="products-header">
          <h1>FAVORITES ❤️</h1>
        </div>

        <div className="products-grid">
          {filteredFavorites.length === 0 ? (
            <h2
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: "50px",
              }}
            >
              No Favorite Products Found
            </h2>
          ) : (
            filteredFavorites.map((item) => (
              <div
                className="product-card"
                key={item.id}
              >
                <div className="product-image">
                  <img
  src={`${import.meta.env.VITE_API_URL}${item.image}`}
  alt={item.title}
/>
                </div>

                <div className="product-details">
                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <div className="price-row">
                    <span className="price">
                      ₹{item.price}
                    </span>
                  </div>

                  <div className="button-group">
                    <button
                      className="cart-btn"
                      onClick={() => addToCart(item)}
                    >
                      Add To Cart
                    </button>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeFavorite(item.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Login Popup */}
      {showLogin && (
        <div
          className="login-overlay"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="login-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <Login
              onClose={() => setShowLogin(false)}
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

export default Favorites;