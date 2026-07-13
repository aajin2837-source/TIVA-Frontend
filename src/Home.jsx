import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";


function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      <nav className="navbar">
        <div className="logo">TIVA</div>

      </nav>

      <section className="hero">

        <div className="overlay"></div>

        <div className="hero-content">

         
          <h1>
            TIVA
            <br />
            MEN'S COLLECTION
          </h1>

          <p>
            Discover timeless fashion crafted for the
            modern gentleman.
          </p>

          <button
  className="explore-btn"
  onClick={() => navigate("/mainhome")}
>
  EXPLORE COLLECTION
</button>

        </div>

      </section>
      <section className="features">

  <div className="feature-card">
    <div className="icon">🕴️</div>
    <div>
      <h3>TAILORED FIT</h3>
      <p>Perfect cuts for a sharp and elegant appearance.</p>
    </div>
  </div>

  <div className="feature-card">
    <div className="icon">⌚</div>
    <div>
      <h3>PREMIUM ACCESSORIES</h3>
      <p>Luxury watches, chains and stylish essentials.</p>
    </div>
  </div>

  <div className="feature-card">
    <div className="icon">🚀</div>
    <div>
      <h3>FAST SHIPPING</h3>
      <p>Quick and secure delivery across the globe.</p>
    </div>
  </div>

</section>
      
    </div>
  );
}

export default Home;