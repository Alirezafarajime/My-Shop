import React, { useState, useEffect } from "react";
import AuthPage from "./pages/AuthPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className="App">{isLoggedIn ? <ProductsPage /> : <AuthPage />}</div>
  );
}
export default App;
