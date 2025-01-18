import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleEnter = () => {
    if (username) {
      navigate("/survey");
    }
  };
  const handleViewProducts = () => {
    navigate("/products");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen text-copper bg-tan">
      <h1 className="absolute top-32 text-xl sm:text-xl md:text-4xl lg:text-5xl xl:text-6xl p-4">Welcome to Gift Recommendation AI</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-6 active:border-none"
      />
      <button
        onClick={handleEnter}
        className="bg-pink h-auto rounded px-8 py-3 text-sm"
      >
        Enter
      </button>
      <button
        onClick={handleViewProducts}
        className="absolute bottom-12 p-2 rounded"
      >
        View All Products &#8594;
      </button>
    </div>
  );
};

export default Welcome;
