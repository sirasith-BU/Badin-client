import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPageComponent from "./pages/customer/landingpage";
import CartPageComponent from "./pages/customer/cartpage";
import TestComponent from "./pages/customer/test";

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPageComponent cart={cart} setCart={setCart} />}
      />
      <Route
        path="/cart"
        element={<CartPageComponent cart={cart} setCart={setCart} />}
      />
      <Route path="/test" element={<TestComponent />} />
    </Routes>
  );
}

export default App;
