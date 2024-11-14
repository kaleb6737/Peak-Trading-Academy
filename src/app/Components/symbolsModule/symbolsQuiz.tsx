import React, { useState } from "react";
import { Button, Typography, Box, Card, CardContent } from "@mui/material";

const quizQuestions = [
  {
    question: "What does AAPL represent?",
    options: ["Apple Inc.", "Amazon", "Adobe"],
    answer: "Apple Inc.",
  },
  {
    question: "What symbol is used for Bitcoin?",
    options: ["BTC", "ETH", "XAU"],
    answer: "BTC",
  },
];

const SymbolQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (option: string) => {
    if (option === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Quiz Completed! Your score: ${score + 1}/${quizQuestions.length}`);
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  return (
    <Card sx={{ bgcolor: "#1a1a1a", color: "#D1C286", borderRadius: "12px", p: 2 }}>
      <CardContent>
        <Typography variant="h5">{quizQuestions[currentQuestion].question}</Typography>
        <Box sx={{ mt: 2 }}>
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              sx={{
                backgroundColor: "#D1C286",
                color: "black",
                m: 1,
                "&:hover": { bgcolor: "#DAA520" },
              }}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SymbolQuiz;
