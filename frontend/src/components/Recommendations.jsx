import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Recommendations = () => {
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const location = useLocation();
  const recommendations = location.state?.recommendations || [];

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    try {
      const response = await fetch("/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: chatInput }),
      });

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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">
            Your Personalized Gift Recommendations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {recommendations.map(([gift, score], index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <h3 className="font-semibold text-lg">{gift}</h3>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 rounded-full h-2 transition-all duration-500"
                    style={{ width: `${score}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Match Score: {score.toFixed(1)}%
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowChat(!showChat)}
            className="w-full p-3 rounded-lg transition-colors font-medium"
          >
            {showChat ? "Hide Chat" : "Chat with AI for Personalization"}
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
                        msg.type === "user" ? "bg-blue-100" : "bg-white border"
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
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ask about gift suggestions..."
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Send
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
