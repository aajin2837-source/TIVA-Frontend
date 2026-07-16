import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch ,FaUser} from "react-icons/fa";
import "./MainHome.css";
import { FaHeart } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaTwitter, FaGoogle } from "react-icons/fa";
import Login from "./Login";
import Navbar from "./Navbar";
import CustomAlert from "./CustomAlert";
import.meta.env.VITE_API_URL

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
    `${import.meta.env.VITE_API_URL}/media/coats/coat1_1.jpg`,
    `${import.meta.env.VITE_API_URL}/media/coats/coat5_1.jpg`,
    `${import.meta.env.VITE_API_URL}/media/coats/coat2_1.jpg`,
    `${import.meta.env.VITE_API_URL}/media/coats/coat7_1.jpg`,
    `${import.meta.env.VITE_API_URL}/media/coats/coat4_1.jpg`,
  ];

  const shirts = [
    `${import.meta.env.VITE_API_URL}/media/shirts/shirt10_1.jpg`,
    `${import.meta.env.VITE_API_URL}/media/shirts/shirt11_1.jpg`,
    `${import.meta.env.VITE_API_URL}/media/shirts/shirt1_2_1.jpg`,
    `${import.meta.env.VITE_API_URL}/media/shirts/shirt3_1.jpg`,
    `${import.meta.env.VITE_API_URL}/media/shirts/shirt4_1.jpg`,
  ];

  const pants = [
    `${import.meta.env.VITE_API_URL}/media/pants/pant10_1.jpg`,
    `${import.meta.env.VITE_API_URL}/media/pants/pant1_2_1.jpg`,
    `${import.meta.env.VITE_API_URL}/media/pants/pant2_1.jpg`,
    `${import.meta.env.VITE_API_URL}/media/pants/pant3_1.jpg`,
    `${import.meta.env.VITE_API_URL}/media/pants/pant4_1.jpg`,
  ];

  const tshirts = [
  `${import.meta.env.VITE_API_URL}/media/tshirts/tshirt10_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/tshirts/tshirt1_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/tshirts/tshirt2_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/tshirts/tshirt3_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/tshirts/tshirt4_1.jpg`,
];

const watches = [
  `${import.meta.env.VITE_API_URL}/media/watches/watch10_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/watches/watch1_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/watches/watch2_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/watches/watch3_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/watches/watch4_1.jpg`,
];

const perfumes = [
  `${import.meta.env.VITE_API_URL}/media/perfumes/perfume10_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/perfumes/perfume1_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/perfumes/perfume2_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/perfumes/perfume3_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/perfumes/perfume4_1.jpg`,
];

const shoes = [
  `${import.meta.env.VITE_API_URL}/media/shoes/shoe10_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/shoes/shoe1_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/shoes/shoe2_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/shoes/shoe3_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/shoes/shoe4_1.jpg`,
];

const sandals = [
  `${import.meta.env.VITE_API_URL}/media/sandals/sandal10_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/sandals/sandal1_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/sandals/sandal2_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/sandals/sandal3_1.jpg`,
  `${import.meta.env.VITE_API_URL}/media/sandals/sandal4_1.jpg`,
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