import React from "react";

const ProductItem = ({ id, name, price, description }) => {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-gray-700 mb-2">${price.toFixed(2)}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default ProductItem;
