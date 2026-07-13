import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUser
} from "react-icons/fa";
import Login from "./Login";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const logout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <>
      <header className="main-navbar">

        <div
          className="brand-logo"
          onClick={() => navigate("/mainhome")}
        >
          TIVA
        </div>

        <ul className="menu-links">
          <li onClick={() => navigate("/products/coats")}>Coats</li>
          <li onClick={() => navigate("/products/shirts")}>Shirts</li>
          <li onClick={() => navigate("/products/pants")}>Pants</li>
          <li onClick={() => navigate("/products/tshirt")}>T-Shirts</li>
          <li onClick={() => navigate("/products/watches")}>Watches</li>
          <li onClick={() => navigate("/products/perfumes")}>Perfumes</li>
          <li onClick={() => navigate("/products/shoes")}>Shoes</li>
          <li onClick={() => navigate("/products/sandals")}>Sandals</li>
        </ul>

        <div className="right-nav">

          {/* Search */}
          <div className="search-bar">
            <FaSearch />

            <input
              type="text"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>

          {/* Profile */}
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
              👋 Welcome
              <br />
              <strong>
                {localStorage.getItem("username") ||
                  "Guest"}
              </strong>
            </div>

          </div>

          {/* Favorites */}
          <div
            className="icon-btn"
            onClick={() => navigate("/favorites")}
          >
            <FaHeart />
          </div>

          {/* Cart */}
          <div
            className="icon-btn"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart />
          </div>

          {/* Logout */}
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
              onClose={() =>
                setShowLogin(false)
              }
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;