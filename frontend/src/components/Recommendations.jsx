import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Recommendations = ({ recommendations = [] }) => {
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

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
      <Card>
        <CardHeader>
          <CardTitle>Your Personalized Gift Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {recommendations.map(([gift, score], index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg">{gift}</h3>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 rounded-full h-2"
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
            className="w-full p-3 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            {showChat ? "Hide Chat" : "Chat with AI for Personalization"}
          </button>

          {showChat && (
            <div className="mt-4">
              <div className="border rounded-lg p-4 h-64 overflow-y-auto mb-4">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${
                      msg.type === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <span
                      className={`inline-block p-2 rounded-lg ${
                        msg.type === "user" ? "bg-blue-100" : "bg-gray-100"
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
                  className="flex-1 p-2 border rounded"
                  placeholder="Ask about gift suggestions..."
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Send
                </button>
              </form>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Recommendations;