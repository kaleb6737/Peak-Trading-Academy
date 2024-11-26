// src/app/Components/Welcome.tsx

"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaChartLine, FaArrowRight } from "react-icons/fa";

// Custom Styled Components
const GradientBackground = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  textAlign: "center",
  padding: "2rem",
  background: "#00000",
  animation: "gradientAnimation 8s ease infinite",
  "@keyframes gradientAnimation": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" },
  },
  backgroundSize: "200% 200%",
});

const IconContainer = styled(Box)({
  color: "#D1C382",
  fontSize: "4rem",
  marginBottom: "1rem",
  animation: "fadeIn 1.5s ease-in-out",
  "@media (min-width: 768px)": {
    fontSize: "5rem",
  },
});

const Title = styled(Typography)({
  fontSize: "3.5rem",
  fontWeight: "bold",
  color: "#D1C382",
  textShadow: "0px 0px 10px rgba(255, 215, 0, 0.8)",
  marginBottom: "1.5rem",
  animation: "fadeIn 1.5s ease-in-out",
  "@media (min-width: 768px)": {
    fontSize: "5rem",
  },
});

const Description = styled(Typography)({
  fontSize: "1.2rem",
  maxWidth: "600px",
  color: "#D1C382",
  lineHeight: 1.6,
  marginBottom: "2rem",
  animation: "fadeIn 2s ease-in-out 0.5s",
  opacity: 0,
  animationFillMode: "forwards",
  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "translateY(20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
});

const AnimatedButton = styled(Button)({
  padding: "0.75rem 2.5rem",
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#000",
  backgroundColor: "#D1C382",
  borderRadius: "8px",
  boxShadow: "0px 4px 15px rgba(255, 215, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  animation: "pulse 2s infinite",
  "@keyframes pulse": {
    "0%, 100%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.05)" },
  },
  "&:hover": {
    transform: "scale(1.08)",
    boxShadow: "0px 6px 20px rgba(255, 215, 0, 0.7)",
    backgroundColor: "#D1C382",
  },
});

const Welcome = () => {
  const router = useRouter();

  return (
    <GradientBackground>
      {/* Centered Icon */}
      <IconContainer>
        <FaChartLine />
      </IconContainer>
      {/* Main Title */}
      <Title variant="h1">Welcome to Peak Trader Academy</Title>
      {/* Description Text */}
      <Description variant="body1">
        Join our education center to start your journey in trading.
      </Description>
      {/* Action Button */}
      <AnimatedButton onClick={() => router.push("/auth")}>
        Login / SignUp <FaArrowRight />
      </AnimatedButton>
    </GradientBackground>
  );
};

export default Welcome;
