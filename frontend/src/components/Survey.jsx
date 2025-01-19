import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    category: "Creative Expression",
    items: [
      "How much do you enjoy expressing yourself through creative activities like painting, writing, or music?",
      "Do you find it easy to come up with original ideas or solutions?",
      "How interested are you in exploring and appreciating art, culture, or design?",
      "Do you enjoy working on projects that allow for personal expression and creativity?",
      "Do you tend to notice details and beauty in your surroundings that others might overlook?",
    ],
    options: ["Not at all", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    category: "Logical Analyst",
    items: [
      "Do you enjoy solving puzzles, riddles, or logical problems?",
      "How confident are you in analyzing data or patterns to draw conclusions?",
      "Do you prefer decisions based on facts and evidence rather than emotions or intuition?",
      "How much do you enjoy planning and organizing tasks systematically?",
      "Are you comfortable working with complex theories, concepts, or frameworks?",
    ],
    options: ["Not at all", "Rarely", "Occasionally", "Often", "Very often"],
  },
  {
    category: "Creative Explorer",
    items: [
      "How much do you enjoy trying new hobbies or activities?",
      "Do you feel energized by traveling to new places and learning about different cultures?",
      "How often do you seek inspiration from unconventional sources like nature, stories, or people?",
      "Do you enjoy experimenting with new ideas or methods in your work or personal projects?",
      "How curious are you about exploring the unknown or untested?",
    ],
    options: ["Not at all", "Rarely", "Occasionally", "Often", "Always"],
  },
  {
    category: "Balanced Harmonizer",
    items: [
      "Do you find joy in helping others maintain peace and harmony in their lives?",
      "How often do you prioritize your mental and emotional well-being?",
      "Are you drawn to activities like yoga, meditation, or mindfulness practices?",
      "Do you enjoy creating a calm and positive environment for yourself and others?",
      "How much do you value balance between work, relationships, and personal growth?",
    ],
    options: ["Not at all", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    category: "Adventurous Seeker",
    items: [
      "Do you enjoy adrenaline-pumping activities like hiking, skydiving, or rafting?",
      "How much do you enjoy stepping out of your comfort zone to try something new?",
      "Do you prefer spontaneous adventures over planned routines?",
      "How much do you enjoy challenges that test your physical or mental limits?",
      "Do you actively seek experiences that make you feel alive and energized?",
    ],
    options: ["Not at all", "Rarely", "Occasionally", "Often", "Always"],
  },
];

const Survey = () => {
  const [answers, setAnswers] = useState(
    Array(questions.length)
      .fill(null)
      .map(() => Array(5).fill(null))
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    const newAnswers = answers.map((arr, qIndex) => {
      if (qIndex === currentQuestion) {
        const newArr = [...arr];
        newArr[currentItem] = answer;
        return newArr;
      }
      return [...arr];
    });
    setAnswers(newAnswers);

    if (currentItem < questions[currentQuestion].items.length - 1) {
      setCurrentItem(currentItem + 1);
    } else if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentItem(0);
    } else {
      // Create the flat answers array for submission
      const flatAnswers = newAnswers.flat();
      console.log(flatAnswers.map((value, index) => [`Q${index + 1}`, value]));

      fetch("https://devfest-25-hackathon-1.onrender.com/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any authentication headers if required
        },
        mode: "cors", // explicitly state CORS mode
        credentials: "include", // include credentials if needed
        body: JSON.stringify(
          Object.fromEntries(
            flatAnswers.map((value, index) => [`Q${index + 1}`, value])
          )
        ),
      })
        .then((response) => response.json())
        .then((data) => {
          navigate("/recommendations", { state: { recommendations: data } });
        })
        .catch((error) => {
          console.error("Error sending survey results:", error);
          // Add user-friendly error handling here
        });
    }
  };

  const handlePrevious = () => {
    if (currentItem > 0) {
      setCurrentItem(currentItem - 1);
    } else if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setCurrentItem(questions[currentQuestion - 1].items.length - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-tan text-copper">
      <h1 className="text-3xl md:text-4xl mb-5 text-center font-semibold fade-in">
        {questions[currentQuestion].category}
      </h1>
      <h3 className="text-base sm:text-lg md:text-xl p-2 mb-5 text-center w-screen sm:w-[80%] fade-in">
        {questions[currentQuestion].items[currentItem]}
      </h3>
      <div className="flex flex-col fade-in">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index + 1)}
            className="px-8 py-2 mb-3 rounded fade-in"
          >
            {option}
          </button>
        ))}
      </div>
      <p className="mt-5">
        Question {currentItem + 1} of {questions[currentQuestion].items.length}
      </p>
      <button
        onClick={handlePrevious}
        disabled={currentQuestion === 0 && currentItem === 0}
        className="absolute bottom-6 md:bottom-10 px-4 py-2 rounded"
      >
        &larr; Previous
      </button>
    </div>
  );
};

export default Survey;
