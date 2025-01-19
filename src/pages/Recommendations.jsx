import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { ShoppingCart, X } from "lucide-react";

const Recommendations = () => {
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const location = useLocation();
  const data = location.state?.recommendations || {
    profile: {},
    recommendation: {},
  };

  const profileScores = Object.entries(data.profile || {})
    .map(([type, score]) => ({ type, score }))
    .sort((a, b) => b.score - a.score);

  // const recommendations = Object.entries(data.recommendation || {})
  //   .map(([gift, score]) => ({
  //     gift,
  //     score,
  //     price: Math.floor(Math.random() * 100) + 20,
  //   })) // Mock prices
  //   .sort((a, b) => b.score - a.score);

  const recommendations = useMemo(() => {
    return Object.entries(data.recommendation || {})
      .map(([gift, score]) => {
        const basePrice = score >= 20 ? 100 : score >= 15 ? 50 : 30;
        const variance = basePrice * 0.3;
        const randomPrice =
          basePrice + (Math.random() * variance * 2 - variance);

        return {
          gift,
          score,
          price: Number(randomPrice.toFixed(2)),
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [data.recommendation]);
  
  const handleAddToCart = (item) => {
    setCart([...cart, { ...item, id: Date.now() }]);
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    // Handle checkout logic here
    console.log("Checkout:", { cart, address });
    alert("Order placed successfully!");
    setCart([]);
    setShowCart(false);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    try {
      const response = await fetch(
        "https://devfest-25-hackathon-1.onrender.com/chatbot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: chatInput }),
        }
      );

      const data = await response.json();
      setChatHistory([
        ...chatHistory,
        { type: "user", message: chatInput },
        { type: "ai", message: data.response },
      ]);
      setChatInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-tan p-2">
      <div className="max-w-6xl mx-auto relative">
        {/* Cart Icon */}
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-4 right-4 bg-white p-3 rounded-full shadow-lg z-10"
        >
          <ShoppingCart color="#ca8e83" className="h-6 w-6" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink text-white rounded-full w-6 h-6 flex items-center justify-center text-sm z-20">
              {cart.length}
            </span>
          )}
        </button>

        {/* Cart Modal */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
            <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
                <button onClick={() => setShowCart(false)}>
                  <X color="#ca8e83" className="h-6 w-6 bg-white" />
                </button>
              </div>
              {cart.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b py-2"
                    >
                      <div>
                        <p className="font-medium">{item.gift}</p>
                        <p className="text-sm text-gray-500">${item.price}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-black hover:shadow hover:border-2 p-1 bg-white"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <div className="mt-4">
                    <h3 className="font-bold mb-2">Shipping Address</h3>
                    <form onSubmit={handleCheckout}>
                      <input
                        type="text"
                        placeholder="Street Address"
                        className="w-full p-2 mb-2 border rounded"
                        value={address.street}
                        onChange={(e) =>
                          setAddress({ ...address, street: e.target.value })
                        }
                        required
                      />
                      <input
                        type="text"
                        placeholder="City"
                        className="w-full p-2 mb-2 border rounded"
                        value={address.city}
                        onChange={(e) =>
                          setAddress({ ...address, city: e.target.value })
                        }
                        required
                      />
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="State"
                          className="w-1/2 p-2 border rounded"
                          value={address.state}
                          onChange={(e) =>
                            setAddress({ ...address, state: e.target.value })
                          }
                          required
                        />
                        <input
                          type="text"
                          placeholder="ZIP"
                          className="w-1/2 p-2 border rounded"
                          value={address.zip}
                          onChange={(e) =>
                            setAddress({ ...address, zip: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="mt-4 border-t pt-4">
                        <div className="flex justify-between mb-4">
                          <span className="font-bold">Total:</span>
                          <span className="font-bold">${totalAmount}</span>
                        </div>
                        <button type="submit" className="w-full py-2 rounded">
                          Checkout
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Profile Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Your Personality Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profileScores.map(({ type, score }) => (
                <div key={type} className="bg-gray-50 rounded-lg p-4 border">
                  <h3 className="font-semibold text-lg mb-2">{type}</h3>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-200">
                          Score: {score.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex h-2 mb-4 overflow-hidden rounded bg-gray-200">
                      <div
                        style={{ width: `${score}%` }}
                        className="bg-blue-500 transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommendations Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Your Personalized Gift Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((item) => (
                <div
                  key={item.gift}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
                >
                  <h3 className="font-semibold text-lg mb-2">{item.gift}</h3>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-200">
                          Match: {item.score.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex h-2 mb-4 overflow-hidden rounded bg-gray-200">
                      <div
                        style={{ width: `${item.score}%` }}
                        className="bg-green-500 transition-all duration-500"
                      />
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-bold">${item.price}</span>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-white border-2 border-black text-black px-4 py-2 rounded hover:bg-black hover:text-white"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Chat Section */}
          <section>
            <button
              onClick={() => setShowChat(!showChat)}
              className="w-full p-3 rounded-lg font-medium"
            >
              {showChat ? "Hide Chat Assistant" : "Chat with Gift Assistant"}
            </button>

            {showChat && (
              <div className="mt-4">
                <div className="border rounded-lg p-4 h-64 overflow-y-auto mb-4 bg-gray-50">
                  {chatHistory.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-2 ${
                        msg.type === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <span
                        className={`inline-block p-2 rounded-lg ${
                          msg.type === "user"
                            ? "bg-blue-100"
                            : "bg-white border"
                        }`}
                      >
                        {msg.message}
                      </span>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Ask about gift suggestions..."
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg font-medium"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
