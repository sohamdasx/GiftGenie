import React, { useEffect, useState } from "react";

const Recommendations = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch recommended products from backend
    // fetch("http://localhost:500 0/api/recommendations")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setProducts(data.products);
    //   });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.map((product, index) => (
        <div key={index} className="border p-4 rounded shadow">
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p>{product.description}</p>
          <button className="p-2 rounded mt-2">
            Add to Cart
          </button>
        </div>
      ))}
      <button className="col-span-3 p-2 rounded mt-4">
        Chat with AI for Personalization
      </button>
    </div>
  );
};

export default Recommendations;
