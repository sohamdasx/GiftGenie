import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Survey from "./components/Survey";
import Recommendations from "./components/Recommendations";
import Products from "./pages/Products";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/products" element={<Products />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </Router>
  );
}

export default App;
