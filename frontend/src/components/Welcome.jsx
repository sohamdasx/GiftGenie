import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleEnter = () => {
    if (username) {
      console.log(username);
      navigate("/survey");
    }
  };
  const handleViewProducts = () => {
    navigate("/products");  
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen text-copper bg-tan">
      <h1 className="absolute top-28 sm:top-32 text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center px-4 sm:px-8 py-4 fade-in">
        Welcome to Gift Recommendation AI
      </h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-8 fade-in"
      />
      <button
        onClick={handleEnter}
        className="bg-pink h-auto rounded px-8 py-3 text-sm"
      >
        Enter
      </button>
      <button
        onClick={handleViewProducts}
        className="absolute bottom-12 p-2 rounded  slide-down"
      >
        View All Products &#8594;
      </button>
    </div>
  );
};

export default Welcome;