import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { API } from "./services/api";
import CustomAlert from "./CustomAlert";
function Home1() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  useEffect(() => {
    fetch(API[category])
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  }, [category]);

  const addToCart = async (item) => {
    await fetch(API.addCart, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: item.title,
        price: item.price,
        image: item.image,
      }),
    });

    setAlertMessage("Added to Cart");
  };

  return (
    <div className="products-grid">
      {products.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}

export default Home1;