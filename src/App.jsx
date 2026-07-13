import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home"
import MainHome from "./MainHome";
import ProductPage from "./ProductPage";
import Cart from "./Cart";
import Favorites from "./Favorites";
import ProductDetails from "./ProductDetails";
import Payment from "./Payment";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import Success from "./Success";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/mainhome"
          element={<MainHome />}
        />

        <Route
          path="/products/:category"
          element={<ProductPage />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />
        <Route
          path="/product/:category/:id"
          element={<ProductDetails />}
        />
        <Route
          path="/payment"
          element={<Payment />}
        />
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route path="/success" element={<Success />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;