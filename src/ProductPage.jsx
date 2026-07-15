import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "./services/api";
import "./ProductPage.css";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import CustomAlert from "./CustomAlert";
import Navbar from "./Navbar";
import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUser
} from "react-icons/fa";
import.meta.env.VITE_API_URL
function ProductPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    fetch(API[category])
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  }, [category]);

  const addToCart = async (item) => {
  try {
    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
      setAlertMessage("Please login first");
      return;
    }

    const response = await fetch(API.addCart, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: item.title,
        price: item.price,
        image: item.image,
        user_id: user_id,
      }),
    })

    const data = await response.json();

    if (response.ok) {
      setAlertMessage("Added To Cart 🛒");
    } else {
      setAlertMessage(data.error || "Failed To Add Cart");
    }
  } catch (error) {
    console.error(error);
    setAlertMessage("Server Error");
  }
};
  
  const addToFavorites = (item) => {
  const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = favorites.find(
    (product) => product.id === item.id
  );

  if (exists) {
    setAlertMessage("Already in Favorites");
    return;
  }

  favorites.push(item);

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );

  setAlertMessage("Added To Favorites ❤️");
};
  const filteredProducts = products.filter((item) => {

  const matchesSearch =
    item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  if (!matchesSearch) return false;

  

    // COATS (₹700 - ₹100000)
    if (category === "coats") {
      if (priceFilter === "700-5000")
        return item.price >= 700 && item.price <= 5000;

      if (priceFilter === "5000-20000")
        return item.price > 5000 && item.price <= 20000;

      if (priceFilter === "20000-50000")
        return item.price > 20000 && item.price <= 50000;

      if (priceFilter === "50000-100000")
        return item.price > 50000 && item.price <= 100000;
    }

    // SHIRTS (₹300 - ₹2000)
    if (category === "shirts") {
      if (priceFilter === "300-700")
        return item.price >= 300 && item.price <= 700;

      if (priceFilter === "700-1200")
        return item.price > 700 && item.price <= 1200;

      if (priceFilter === "1200-2000")
        return item.price > 1200 && item.price <= 2000;
    }

    // PANTS (₹400 - ₹1500)
    if (category === "pants") {
      if (priceFilter === "400-700")
        return item.price >= 400 && item.price <= 700;

      if (priceFilter === "700-1000")
        return item.price > 700 && item.price <= 1000;

      if (priceFilter === "1000-1500")
        return item.price > 1000 && item.price <= 1500;
    }

    // T-SHIRTS (₹300 - ₹2000)
    if (category === "tshirt") {
      if (priceFilter === "300-700")
        return item.price >= 300 && item.price <= 700;

      if (priceFilter === "700-1200")
        return item.price > 700 && item.price <= 1200;

      if (priceFilter === "1200-2000")
        return item.price > 1200 && item.price <= 2000;
    }

    // WATCHES (₹300 - ₹20000)
    if (category === "watches") {
      if (priceFilter === "300-2000")
        return item.price >= 300 && item.price <= 2000;

      if (priceFilter === "2000-10000")
        return item.price > 2000 && item.price <= 10000;

      if (priceFilter === "10000-20000")
        return item.price > 10000 && item.price <= 20000;
    }

    // PERFUMES (₹2000 - ₹100000)
    if (category === "perfumes") {
      if (priceFilter === "2000-10000")
        return item.price >= 2000 && item.price <= 10000;

      if (priceFilter === "10000-50000")
        return item.price > 10000 && item.price <= 50000;

      if (priceFilter === "50000-100000")
        return item.price > 50000 && item.price <= 100000;
    }

    // SHOES (₹700 - ₹19000)
    if (category === "shoes") {
      if (priceFilter === "700-3000")
        return item.price >= 700 && item.price <= 3000;

      if (priceFilter === "3000-10000")
        return item.price > 3000 && item.price <= 10000;

      if (priceFilter === "10000-19000")
        return item.price > 10000 && item.price <= 19000;
    }

    // SANDALS (₹300 - ₹3000)
    if (category === "sandals") {
      if (priceFilter === "300-1000")
        return item.price >= 300 && item.price <= 1000;

      if (priceFilter === "1000-2000")
        return item.price > 1000 && item.price <= 2000;

      if (priceFilter === "2000-3000")
        return item.price > 2000 && item.price <= 3000;
    }

    return true;
  });

  return (
    <>
    <div>
     <header className="main-navbar">
            <div className="brand-logo">TIVA</div>
    
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

    {products
      .filter((item) =>
        item.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .map((item) => (
        <div
          key={item.id}
          className="search-item"
          onClick={() => {
            navigate(`/product/${category}/${item.id}`);
            setSearchTerm("");
          }}
        >
          {item.title}
        </div>
      ))}

  </div>
)}
    
      
    
    </div>
    
             <div className="right-nav">
      <div className="icon-btn" onClick={() => setShowLogin(true)}>
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
    <div className="products-page">
      <div className="products-header">
        <h1>{category ? category.toUpperCase() : "PRODUCTS"}</h1>

        <div className="filter-section">
          <label>Filter By Price:</label>

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="all">All Products</option>

            {category === "coats" && (
              <>
                <option value="700-5000">₹700 - ₹5000</option>
                <option value="5000-20000">₹5000 - ₹20000</option>
                <option value="20000-50000">₹20000 - ₹50000</option>
                <option value="50000-100000">₹50000 - ₹100000</option>
              </>
            )}

            {category === "shirts" && (
              <>
                <option value="300-700">₹300 - ₹700</option>
                <option value="700-1200">₹700 - ₹1200</option>
                <option value="1200-2000">₹1200 - ₹2000</option>
              </>
            )}

            {category === "pants" && (
              <>
                <option value="400-700">₹400 - ₹700</option>
                <option value="700-1000">₹700 - ₹1000</option>
                <option value="1000-1500">₹1000 - ₹1500</option>
              </>
            )}

            {category === "tshirt" && (
              <>
                <option value="300-700">₹300 - ₹700</option>
                <option value="700-1200">₹700 - ₹1200</option>
                <option value="1200-2000">₹1200 - ₹2000</option>
              </>
            )}

            {category === "watches" && (
              <>
                <option value="300-2000">₹300 - ₹2000</option>
                <option value="2000-10000">₹2000 - ₹10000</option>
                <option value="10000-20000">₹10000 - ₹20000</option>
              </>
            )}

            {category === "perfumes" && (
              <>
                <option value="2000-10000">₹2000 - ₹10000</option>
                <option value="10000-50000">₹10000 - ₹50000</option>
                <option value="50000-100000">₹50000 - ₹100000</option>
              </>
            )}

            {category === "shoes" && (
              <>
                <option value="700-3000">₹700 - ₹3000</option>
                <option value="3000-10000">₹3000 - ₹10000</option>
                <option value="10000-19000">₹10000 - ₹19000</option>
              </>
            )}

            {category === "sandals" && (
              <>
                <option value="300-1000">₹300 - ₹1000</option>
                <option value="1000-2000">₹1000 - ₹2000</option>
                <option value="2000-3000">₹2000 - ₹3000</option>
              </>
            )}
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((item) => (
          <div className="product-card" key={item.id}>
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
    type="button"
    className="fav-btn"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      addToFavorites(item);
    }}
  >
    ❤
  </button>

</div>

<button
  className="details-btn"
  onClick={() => navigate(`/product/${category}/${item.id}`)}
>
  View Details
</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Navbar/>
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

export default ProductPage;