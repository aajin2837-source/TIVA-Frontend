import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ item, addToCart }) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${item.id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="product-image">
        <img
          src={`https://tiva.onrender.com${item.image}`}
          alt={item.title}
        />
      </div>

      <div className="product-details">
        <h3>{item.title}</h3>

        <p>{item.description}</p>

        <div className="product-footer">
          <span className="price">₹{item.price}</span>

          <button
            className="cart-btn"
            onClick={(e) => {
              e.stopPropagation(); // prevents opening details page
              addToCart(item);
            }}
          >
            Add To Cart
          </button>
          <button
  className="details-btn"
  onClick={(e) => {
    e.stopPropagation();
    navigate(`/product/${item.id}`);
  }}
>
  View Details
</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;