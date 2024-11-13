// src/app/Components/Dashboard/Dashboard.tsx

"use client";

import React, { useEffect, useState } from "react";
import { FiTrendingUp } from "react-icons/fi";
import { Typography, Box, Button, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom styled component for blinking cursor effect
const BlinkingCursor = styled("span")({
  animation: "blinkingCursor 1s infinite",
  "@keyframes blinkingCursor": {
    "0%": { opacity: 1 },
    "50%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
  color: "#D1C286",
});

// Array of phrases for animated description
const phrases = [
  "Welcome to Peak Trader Academy.",
  "Your gateway to mastering trading.",
  "Explore comprehensive tutorials.",
  "Engage with interactive lessons.",
  "Gain insights from expert traders.",
  "Join us and start your journey.",
];

const StyledButton = styled(Button)({
  backgroundColor: "#D1C286",
  color: "black",
  fontWeight: "bold",
  padding: "10px 20px",
  marginTop: "30px",
  "&:hover": {
    backgroundColor: "#DAA520",
  },
  animation: "pulse 2s infinite",
  "@keyframes pulse": {
    "0%, 100%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.05)" },
  },
});

const Dashboard = () => {
  const [text, setText] = useState("");
  const fullText = "Peak Trader Academy";
  const [index, setIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);

  // Typing effect for "Peak Trader Academy" title
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

  // Loop through phrases with fade-in, fade-out effect
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
        backgroundColor: "#000000",
        color: "#D1C286",
        padding: "40px",
      }}
    >
      {/* Animated Title */}
      <Typography variant="h1" sx={{ fontWeight: "bold", fontSize: { xs: "3rem", md: "5rem" }, color: "#D1C286" }}>
        {text}
        <BlinkingCursor>|</BlinkingCursor>
      </Typography>

      {/* Rotating Phrases */}
      {showContent && (
        <Typography
          variant="h5"
          component="div"
          sx={{
            color: "#D1C286",
            marginTop: 3,
            animation: "fade 3s ease-in-out infinite",
            "@keyframes fade": {
              "0%": { opacity: 0 },
              "10%, 90%": { opacity: 1 },
              "100%": { opacity: 0 },
            },
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            fontWeight: 500,
          }}
        >
          {phrases[phraseIndex]}
        </Typography>
      )}

      {/* Animated Trading Icon */}
      {showContent && (
        <Box
          sx={{
            color: "#D1C286",
            marginTop: "50px",
            animation: "bounce 2s infinite",
            "@keyframes bounce": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-10px)" },
            },
          }}
        >
          <FiTrendingUp size={80} />
        </Box>
      )}

      {/* Button to Scroll to Lessons Section */}
      {showContent && (
        <StyledButton href="#lessons">
          Explore Lessons
        </StyledButton>
      )}
    </Container>
  );
};

export default Dashboard;
