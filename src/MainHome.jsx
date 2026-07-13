import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch ,FaUser} from "react-icons/fa";
import "./MainHome.css";
import { FaHeart } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaTwitter, FaGoogle } from "react-icons/fa";
import Login from "./Login";
import Navbar from "./Navbar";
import CustomAlert from "./CustomAlert";

function MainHome() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [alertMessage, setAlertMessage] = useState("")
  const logout = () => {
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");

  setAlertMessage("Logged Out Successfully");

  setTimeout(() => {
    navigate("/mainhome");
    window.location.reload();
  }, 1500);
};
const allProducts = {
  coats: [
    "Peter England Men's Regular Fit Two Piece Suit",
    "Louis Philippe Solid Polyester Blend Slim Fit Suit",
    "Swallow-Tailed Coat Men Suit",
    "Old Money Aesthetics Formal Suit",
    "Wedding Suit for Men"
  ],

  shirts: [
    "Men's Casual Linen Shirt",
    "Apex Short Hand Shirt",
    "Hawak Blue Shirt",
    "NavyBlue Sail Shirt",
    "Vitrus Black Shirt"
  ],

  pants: [
    "PIGION Red Fitted Formal Trouser",
    "Classic Cotton White Pants",
    "Pure Black Baggy Fit Jeans",
    "Formal Black Trouser",
    "Baggy Linen Blend Trousers"
  ],

  tshirt: [
    "Axel Black T-Shirt",
    "Zara Black T-Shirt",
    "Dry Fit Activewear T-Shirt",
    "SNEL Mixed Color T-Shirt",
    "Solid Peach Cotton T-Shirt"
  ],

  watches: [
    "EDDY HAGER Olive EH-226",
    "ABREXO GODFATHER Square Chrono",
    "Provogue SK-PG-4080",
    "MAAN Midnight",
    "FOSSIL Bannon Automatic"
  ],

  perfumes: [
    "BLEU DE CHANEL",
    "VERSACE EROS",
    "PARK AVENUE Euphoria",
    "YSL Perfume for Men",
    "YSL Men's Perfume"
  ],

  shoes: [
    "Wagon Red White Shoe",
    "WinLand Loafer Shoe",
    "Nike White Shoe",
    "Vans MultiColor Shoe",
    "Nike Black Shoe"
  ],

  sandals: [
    "Bata Black Leather Sandals",
    "EZOK Comfort Sandals",
    "THE MADRAS TRUNK Sandals",
    "Louis Philippe Sandals",
    "Paragon PU Sandals"
  ]
};
  const coats = [
    "http://127.0.0.1:8000/media/coats/coat1.jpg",
    "http://127.0.0.1:8000/media/coats/coat2.jpg",
    "http://127.0.0.1:8000/media/coats/coat3.jpg",
    "http://127.0.0.1:8000/media/coats/coat4.jpg",
    "http://127.0.0.1:8000/media/coats/coat5.jpg",
  ];

  const shirts = [
    "http://127.0.0.1:8000/media/shirts/shirt1_2.jpg",
    "http://127.0.0.1:8000/media/shirts/shirt2.jpg",
    "http://127.0.0.1:8000/media/shirts/shirt3.jpg",
    "http://127.0.0.1:8000/media/shirts/shirt4.jpg",
    "http://127.0.0.1:8000/media/shirts/shirt6.jpg",
  ];

  const pants = [
    "http://127.0.0.1:8000/media/pants/pant1_2.jpg",
    "http://127.0.0.1:8000/media/pants/pant2.jpg",
    "http://127.0.0.1:8000/media/pants/pant3.jpg",
    "http://127.0.0.1:8000/media/pants/pant4.jpg",
    "http://127.0.0.1:8000/media/pants/pant5.jpg",
  ];

  const tshirts = [
  "http://127.0.0.1:8000/media/tshirts/tshirt1.jpg",
  "http://127.0.0.1:8000/media/tshirts/tshirt2.jpg",
  "http://127.0.0.1:8000/media/tshirts/tshirt3.jpg",
  "http://127.0.0.1:8000/media/tshirts/tshirt4.jpg",
  "http://127.0.0.1:8000/media/tshirts/tshirt5.jpg",
];

const watches = [
  "http://127.0.0.1:8000/media/watches/watch1.jpg",
  "http://127.0.0.1:8000/media/watches/watch2.jpg",
  "http://127.0.0.1:8000/media/watches/watch3.jpg",
  "http://127.0.0.1:8000/media/watches/watch4.jpg",
  "http://127.0.0.1:8000/media/watches/watch5.jpg",
];

const perfumes = [
  "http://127.0.0.1:8000/media/perfumes/perfume1.jpg",
  "http://127.0.0.1:8000/media/perfumes/perfume2.jpg",
  "http://127.0.0.1:8000/media/perfumes/perfume3.jpg",
  "http://127.0.0.1:8000/media/perfumes/perfume4.jpg",
  "http://127.0.0.1:8000/media/perfumes/perfume5.jpg",
];

const shoes = [
  "http://127.0.0.1:8000/media/shoes/shoe1.jpg",
  "http://127.0.0.1:8000/media/shoes/shoe2.jpg",
  "http://127.0.0.1:8000/media/shoes/shoe3.jpg",
  "http://127.0.0.1:8000/media/shoes/shoe4.jpg",
  "http://127.0.0.1:8000/media/shoes/shoe6.jpg",
];

const sandals = [
  "http://127.0.0.1:8000/media/sandals/sandal1.jpg",
  "http://127.0.0.1:8000/media/sandals/sandal2.jpg",
  "http://127.0.0.1:8000/media/sandals/sandal3.jpg",
  "http://127.0.0.1:8000/media/sandals/sandal4.jpg",
  "http://127.0.0.1:8000/media/sandals/sandal5.jpg",
];

  return (
    <>
    <div className="main-home">

      {/* Navbar */}
      <header className="main-navbar">
        <div className="brand-logo">TIVA</div>

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
          <div className="search-bar-container">

  <div className="search-bar">
    <FaSearch />

    <input
      type="text"
      placeholder="Search Products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  {searchTerm && (
    <div className="search-results">

     {Object.entries(allProducts)
  .flatMap(([category, products]) =>
    products
      .filter((product) =>
        product.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((product, index) => (
        <div
          key={`${category}-${index}`}
          className="search-item"
          onClick={() => {
            navigate(`/products/${category}`);
            setSearchTerm("");
          }}
        >
          {product}
        </div>
      ))
  )}

    </div>
  )}

</div>
     <div className="right-nav">

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
  
      {showLogin && (
  <div
    className="login-overlay"
    onClick={() => setShowLogin(false)}
  >
    <div
      className="login-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <Login onClose={() => setShowLogin(false)} />
    </div>
  </div>
)}

        </div>
      </header>

      {/* Collections */}
      <section className="offer-section">
        <h2>Featured Collections</h2>

        <div className="offer-grid">

          {/* Coats */}
          <div className="offer-card">
            <div className="image-gallery">
              {coats.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`coat-${index}`}
                />
              ))}
            </div>

            <h3>Coats</h3>

            <button
              onClick={() =>
                navigate("/products/coats")
              }
            >
              View More
            </button>
          </div>

          {/* Shirts */}
          <div className="offer-card">
            <div className="image-gallery">
              {shirts.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`shirt-${index}`}
                />
              ))}
            </div>

            <h3>Shirts</h3>

            <button
              onClick={() =>
                navigate("/products/shirts")
              }
            >
              View More
            </button>
          </div>

          {/* Pants */}
          <div className="offer-card">
            <div className="image-gallery">
              {pants.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`pant-${index}`}
                />
              ))}
            </div>

            <h3>Pants</h3>

            <button
              onClick={() =>
                navigate("/products/pants")
              }
            >
              View More
            </button>
          </div>
          {/* T-Shirts */}
<div className="offer-card">
  <div className="image-gallery">
    {tshirts.map((img, index) => (
      <img key={index} src={img} alt="" />
    ))}
  </div>
  <h3>T-Shirts</h3>
  <button onClick={() => navigate("/products/tshirt")}>
    View More
  </button>
</div>

{/* Watches */}
<div className="offer-card">
  <div className="image-gallery">
    {watches.map((img, index) => (
      <img key={index} src={img} alt="" />
    ))}
  </div>
  <h3>Watches</h3>
  <button onClick={() => navigate("/products/watches")}>
    View More
  </button>
</div>

{/* Perfumes */}
<div className="offer-card">
  <div className="image-gallery">
    {perfumes.map((img, index) => (
      <img key={index} src={img} alt="" />
    ))}
  </div>
  <h3>Perfumes</h3>
  <button onClick={() => navigate("/products/perfumes")}>
    View More
  </button>
</div>

{/* Shoes */}
<div className="offer-card">
  <div className="image-gallery">
    {shoes.map((img, index) => (
      <img key={index} src={img} alt="" />
    ))}
  </div>
  <h3>Shoes</h3>
  <button onClick={() => navigate("/products/shoes")}>
    View More
  </button>
</div>

{/* Sandals */}
<div className="offer-card">
  <div className="image-gallery">
    {sandals.map((img, index) => (
      <img key={index} src={img} alt="" />
    ))}
  </div>
  <h3>Sandals</h3>
  <button onClick={() => navigate("/products/sandals")}>
    View More
  </button>
</div>

        </div>
      </section>

    

    {/* Footer */}
    <footer className="footer">
      <div className="footer-container">

    <div className="footer-brand">
      <h2>TIVA</h2>
      <h3>Reach Out To Us</h3>
      <p>📞 +91 98765 43210</p>
      <p>📧 support@tiva.com</p>
      <p>Experience TIVA on Mobile</p>
    </div>

    <div className="footer-links">
      <h3>Top Categories</h3>
      <p>Coats</p>
      <p>Shirts</p>
      <p>Pants</p>
      <p>T-Shirts</p>
      <p>Watches</p>
      <p>Perfumes</p>
      <p>Shoes</p>
      <p>Sandals</p>
    </div>

    <div className="footer-links">
      <h3>Useful Links</h3>
      <p>About Us</p>
      <p>Contact Us</p>
      <p>Track Orders</p>
      <p>Store Locator</p>
      <p>Careers</p>
      <p>Help / FAQs</p>
    </div>

    <div className="footer-links">
      <h3>Our Policies</h3>
      <p>Terms Of Use</p>
      <p>Privacy Policy</p>
      <p>Delivery Policy</p>
      <p>Exchange & Return</p>
      <p>Secure Payments</p>
    </div>

  </div>

  <div className="footer-bottom">
    <div className="social-icons">
      <a href="https://google.com" target="_blank" rel="noreferrer"><FaGoogle /></a>
      <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
      <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
      <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
    </div>

    <p>
      Copyright © 2026 TIVA. All Rights Reserved.
    </p>
    </div>
  <Navbar/>
  </footer>
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

export default MainHome;