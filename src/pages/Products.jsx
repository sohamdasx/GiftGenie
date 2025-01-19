import React, { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem"; // Fix the import path as discussed earlier

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://devfest-25-hackathon-1.onrender.com/getGifts"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Transform the data into the format we need
        const transformedProducts = Object.entries(data.gifts).map(
          ([name, price]) => ({
            _id: name, // Using name as ID since there's no explicit ID in the data
            name: name.replace(/([A-Z])/g, " $1").trim(), // Convert camelCase to spaces
            price: price,
            description: data.desc[name],
          })
        );

        setProducts(transformedProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-screen bg-tan text-copper p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {products.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
