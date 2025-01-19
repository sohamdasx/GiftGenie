import React from "react";

const ProductItem = ({ id, name, price }) => {
  return (
    <div className="border rounded-lg p-4">
      {/* <img
        src={image}
        alt={name}
        className="w-full h-32 object-cover rounded"
      /> */}
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-gray-700">${price.toFixed(2)}</p>
    </div>
  );
};

export default ProductItem;