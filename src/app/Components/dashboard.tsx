"use client";

import React, { useEffect, useState } from "react";
import { FiTrendingUp } from "react-icons/fi";
import { Typography, Box, Button, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom styled components
const BlinkingCursor = styled("span")({
  animation: "blinkingCursor 1s infinite",
  "@keyframes blinkingCursor": {
    "0%": { opacity: 1 },
    "50%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
  color: "#D1C382",
});

const StyledButton = styled(Button)({
  backgroundColor: "#D1C382",
  color: "#000",
  fontWeight: "bold",
  fontSize: "1.2rem",
  padding: "15px 30px",
  marginTop: "40px",
  borderRadius: "30px",
  "&:hover": {
    backgroundColor: "#F9D342",
    boxShadow: "0 8px 20px rgba(255, 215, 0, 0.8)",
  },
  animation: "pulse 2s infinite",
  "@keyframes pulse": {
    "0%, 100%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.05)" },
  },
});

const phrases = [
  "Welcome to Peak Trader Academy.",
  "Your gateway to mastering trading.",
  "Explore comprehensive tutorials.",
  "Engage with interactive lessons.",
  "Gain insights from expert traders.",
  "Join us and start your journey.",
];

const Dashboard = () => {
  const [text, setText] = useState("");
  const fullText = "Peak Trader Academy";
  const [index, setIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);

  // Typing effect for the main title
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setShowContent(true);
      }, 500);
    }
  }, [index]);

  // Loop through phrases
  useEffect(() => {
    if (showContent) {
      const phraseInterval = setInterval(() => {
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }, 3000); // Change every 3 seconds
      return () => clearInterval(phraseInterval);
    }
  }, [showContent]);

  return (
    <Container
      component="section"
      id="dashboard"
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        backgroundSize: "400% 400%",
        animation: "gradientBG 10s ease infinite",
        color: "#D1C382",
        padding: "40px",
        "@keyframes gradientBG": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      {/* Main Animated Title */}
      <Typography
        variant="h1"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "3rem", md: "5rem" },
          color: "#D1C382",
          textShadow: "0 0 20px rgba(255, 215, 0, 0.8)",
          animation: "fadeIn 2s ease-out",
          "@keyframes fadeIn": {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
        }}
      >
        {text}
        <BlinkingCursor>|</BlinkingCursor>
      </Typography>

      {/* Rotating Phrases */}
      {showContent && (
        <Typography
          variant="h5"
          component="div"
          sx={{
            color: "#D1C382",
            marginTop: 3,
            animation: "fade 3s ease-in-out infinite",
            "@keyframes fade": {
              "0%": { opacity: 0 },
              "20%, 80%": { opacity: 1 },
              "100%": { opacity: 0 },
            },
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            fontWeight: 500,
            textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
          }}
        >
          {phrases[phraseIndex]}
        </Typography>
      )}

      {/* Bouncing Icon */}
      {showContent && (
        <Box
          sx={{
            color: "#D1C382",
            marginTop: "50px",
            animation: "bounce 2s infinite",
            "@keyframes bounce": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-15px)" },
            },
            textShadow: "0 0 15px rgba(255, 215, 0, 0.8)",
          }}
        >
          <FiTrendingUp size={100} />
        </Box>
      )}

      {/* Button to Navigate to Lessons Section */}
      {showContent && (
        <StyledButton href="#lessons">
          Explore Lessons
        </StyledButton>
      )}
    </Container>
  );
};

export default Dashboard;
