import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Recommendations = () => {
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const location = useLocation();
  const data = location.state?.recommendations || {
    profile: {},
    recommendation: {},
  };

  // Convert profile and recommendations to sorted arrays for display
  const profileScores = Object.entries(data.profile || {})
    .map(([type, score]) => ({ type, score }))
    .sort((a, b) => b.score - a.score);

  const recommendations = Object.entries(data.recommendation || {})
    .map(([gift, score]) => ({ gift, score }))
    .sort((a, b) => b.score - a.score);

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
    <div className="min-h-screen bg-tan p-2">
      <div className="max-w-6xl mx-auto">
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
              {recommendations.map(({ gift, score }) => (
                <div
                  key={gift}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
                >
                  <h3 className="font-semibold text-lg mb-2">{gift}</h3>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-200">
                          Match: {score.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex h-2 mb-4 overflow-hidden rounded bg-gray-200">
                      <div
                        style={{ width: `${score}%` }}
                        className="bg-green-500 transition-all duration-500"
                      />
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
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black w-[70%] sm:w-auto"
                    placeholder="Ask about gift suggestions..."
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg font-medium w-[30%] sm:w-auto"
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