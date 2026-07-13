import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API } from "./services/api";
import "./ProductDetails.css";
import CustomAlert from "./CustomAlert";
import DeliveryDetails from "./DeliveryDetails";
import {
  FaWhatsapp,
  FaFacebookF,
  FaLinkedinIn,
  FaLink,
  FaTimes,
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import Login from "./Login";
import Navbar from "./Navbar";
function ProductDetails() {
  const { category, id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [showShare, setShowShare] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(
  `http://127.0.0.1:8000/api/reviews/?category=${category}&product_id=${id}`
)
  .then((res) => res.json())
  .then((data) => setReviews(data));
   
    fetch(API[category])
      .then((res) => res.json())
      .then((data) => {
        const found = data.find(
          (item) => item.id.toString() === id
        );
        setProduct(found);
      })
      .catch(console.error);
  }, [category, id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  // Perfume price calculation
  let finalPrice = Number(product.price);

  if (category === "perfumes") {
    const mlMap = {
      "100ml": 1,
      "200ml": 2,
      "300ml": 3,
      "400ml": 4,
      "500ml": 5,
    };

    if (selectedOption) {
      finalPrice = Number(product.price) * mlMap[selectedOption];
    }
  }

  const addToCart = async () => {
  if (category !== "watches" && !selectedOption) {
    setAlertMessage("Please select an option");
    return;
  }

  try {
    const response = await fetch(API.addCart, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...product,
        price: finalPrice,
        selectedOption,
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
  const shareProduct = async () => {
  const shareData = {
    title: product.title,
    text: product.description,
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(
        window.location.href
      );
      setAlertMessage("Link copied!");
    }
  } catch (error) {
    console.log(error);
  }
};
  const logout = () => {
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");

  setAlertMessage("Logged Out Successfully");

  navigate("/mainhome");

  window.location.reload();
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
        <li onClick={() => navigate("/mainhome")}>Home</li>
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

    <div className="details-page">
     

      <div className="details-container">

        <div className="details-image">
          <img
            src={`http://127.0.0.1:8000${product.image}`}
            alt={product.title}
          />
        </div>

        <div className="details-info">

          <h1>{product.title}</h1>

          <h2>₹{finalPrice}</h2>

          <p>{product.description}</p>

          {category !== "watches" && (
            <>
              <h3>Select Option</h3>

              <div className="size-boxes">

                {(category === "shirts" ||
                  category === "tshirt" ||
                  category === "coats") && (
                  <>
                    <button onClick={() => setSelectedOption("S")}>S</button>
                    <button onClick={() => setSelectedOption("M")}>M</button>
                    <button onClick={() => setSelectedOption("L")}>L</button>
                    <button onClick={() => setSelectedOption("XL")}>XL</button>
                    <button onClick={() => setSelectedOption("XXL")}>XXL</button>
                  </>
                )}

                {category === "pants" && (
                  <>
                    <button onClick={() => setSelectedOption("28 x 30")}>28 x 30</button>
                    <button onClick={() => setSelectedOption("29 x 30")}>29 x 30</button>
                    <button onClick={() => setSelectedOption("30 x 30")}>30 x 30</button>
                    <button onClick={() => setSelectedOption("31 x 32")}>31 x 32</button>
                    <button onClick={() => setSelectedOption("32 x 32")}>32 x 32</button>
                    <button onClick={() => setSelectedOption("32 x 34")}>32 x 34</button>
                    <button onClick={() => setSelectedOption("33 x 32")}>33 x 32</button>
                    <button onClick={() => setSelectedOption("34 x 32")}>34 x 32</button>
                    <button onClick={() => setSelectedOption("34 x 34")}>34 x 34</button>
                    <button onClick={() => setSelectedOption("36 x 34")}>36 x 34</button>
                    <button onClick={() => setSelectedOption("38 x 34")}>38 x 34</button>
                  </>
                )}

                {(category === "shoes" ||
                  category === "sandals") && (
                  <>
                    <button onClick={() => setSelectedOption("UK 7")}>UK 7</button>
                    <button onClick={() => setSelectedOption("UK 8")}>UK 8</button>
                    <button onClick={() => setSelectedOption("UK 9")}>UK 9</button>
                    <button onClick={() => setSelectedOption("UK 10")}>UK 10</button>
                    <button onClick={() => setSelectedOption("UK 11")}>UK 11</button>
                  </>
                )}

                {category === "perfumes" && (
                  <>
                    <button onClick={() => setSelectedOption("100ml")}>100ml</button>
                    <button onClick={() => setSelectedOption("200ml")}>200ml</button>
                    <button onClick={() => setSelectedOption("300ml")}>300ml</button>
                    <button onClick={() => setSelectedOption("400ml")}>400ml</button>
                    <button onClick={() => setSelectedOption("500ml")}>500ml</button>
                  </>
                )}

              </div>

              {selectedOption && (
                <p className="size-message">
                  Selected: <strong>{selectedOption}</strong>
                </p>
              )}
            </>
          )}

          <div className="action-buttons">
  <button
    className="cart-btn"
    onClick={addToCart}
  >
    Add To Cart
  </button>

  <button
    className="share-btn"
    onClick={() => setShowShare(true)}
  >
    🔗 Share
  </button>
</div>

          <div className="highlights">
            <h2>PRODUCT HIGHLIGHTS</h2>

            <div className="highlight-grid">

              {category === "shirts" || category === "tshirt" ? (
                <>
                  <div><strong>Fabric</strong><p>Premium Cotton</p></div>
                  <div><strong>Fit</strong><p>Regular Fit</p></div>
                  <div><strong>Sleeve</strong><p>Half / Full Sleeve</p></div>
                  <div><strong>Collar</strong><p>Classic Collar</p></div>
                </>
              ) : category === "pants" ? (
                <>
                  <div><strong>Fabric</strong><p>Cotton Blend</p></div>
                  <div><strong>Fit</strong><p>Slim / Regular Fit</p></div>
                  <div><strong>Waist Size</strong><p>{selectedOption || "Select Size"}</p></div>
                  <div><strong>Style</strong><p>Casual & Formal</p></div>
                </>
              ) : category === "watches" ? (
                <>
                  <div><strong>Display</strong><p>Analog</p></div>
                  <div><strong>Movement</strong><p>Quartz</p></div>
                  <div><strong>Water Resistance</strong><p>Yes</p></div>
                  <div><strong>Warranty</strong><p>1 Year</p></div>
                </>
              ) : category === "perfumes" ? (
                <>
                  <div><strong>Fragrance</strong><p>Long Lasting</p></div>
                  <div><strong>Type</strong><p>Eau De Parfum</p></div>
                  <div><strong>Gender</strong><p>Men</p></div>
                  <div><strong>Volume</strong><p>{selectedOption || "100ml"}</p></div>
                </>
              ) : category === "shoes" ? (
                <>
                  <div><strong>Material</strong><p>Premium Leather</p></div>
                  <div><strong>Sole</strong><p>Rubber Sole</p></div>
                  <div><strong>Size</strong><p>{selectedOption || "UK 7"}</p></div>
                  <div><strong>Closure</strong><p>Lace-Up</p></div>
                </>
              ) : category === "sandals" ? (
                <>
                  <div><strong>Material</strong><p>PU Leather</p></div>
                  <div><strong>Comfort</strong><p>Soft Cushion</p></div>
                  <div><strong>Size</strong><p>{selectedOption || "UK 7"}</p></div>
                  <div><strong>Usage</strong><p>Daily Wear</p></div>
                </>
              ) : (
                <>
                  <div><strong>Pattern</strong><p>Premium Design</p></div>
                  <div><strong>Gender</strong><p>Men</p></div>
                  <div><strong>Fabric</strong><p>High Quality Material</p></div>
                  <div><strong>Fit</strong><p>Regular Fit</p></div>
                </>
              )}

            </div>
            {/* ... inside details-info div, after the highlights div ... */}

<div className="product-services">
  <div className="service-item">
    <span>✔</span>
    <p>100% Authentic</p>
  </div>
  <div className="service-item">
    <span>📦</span>
    <p>Fast Delivery</p>
  </div>
  <div className="service-item">
    <span>⟲</span>
    <p>14 Days Easy Return</p>
  </div>
</div>
          </div>

        </div>
      </div>
      {showShare && (
  <div className="share-overlay">
    <div className="share-modal">

      <div className="share-header">
        <h3>Share Product</h3>

        <button
          className="close-btn"
          onClick={() => setShowShare(false)}
        >
          <FaTimes />
        </button>
      </div>

      <div className="share-options">

        <a
          href={`https://wa.me/?text=${window.location.href}`}
          target="_blank"
          rel="noreferrer"
          className="share-item whatsapp"
        >
          <FaWhatsapp />
          <span>WhatsApp</span>
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          target="_blank"
          rel="noreferrer"
          className="share-item facebook"
        >
          <FaFacebookF />
          <span>Facebook</span>
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
          target="_blank"
          rel="noreferrer"
          className="share-item linkedin"
        >
          <FaLinkedinIn />
          <span>LinkedIn</span>
        </a>

        <button
          className="share-item copy"
          onClick={shareProduct}
        >
          <FaLink />
          <span>Copy Link</span>
        </button>

      </div>

    </div>
  </div>
)}    
       <DeliveryDetails />
       <div className="reviews-section">
  <h2>Customer Reviews</h2>

  {reviews.length === 0 ? (
    <p>No reviews yet.</p>
  ) : (
    reviews.map((review, index) => (
      <div key={index} className="review-card">
        <h4>{review.user_name}</h4>

        <p>
          {"⭐".repeat(review.rating)}
        </p>

        <p>{review.comment}</p>
      </div>
    ))
  )}
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

export default ProductDetails;