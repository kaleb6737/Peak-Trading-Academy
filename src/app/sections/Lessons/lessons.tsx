// src/app/Components/Lessons/Lessons.tsx

import React from "react";
import Link from "next/link";
import { Card, CardContent, Typography, Button, CardActions, Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaChartLine, FaShieldAlt, FaBrain, FaExchangeAlt } from "react-icons/fa"; // Import icons

// Define the lessons data with icons
const lessonsData = [
  { title: "Symbols", description: "Overview of trading symbols and their meanings.", link: "/lessons/symbols", icon: <FaExchangeAlt /> },
  { title: "Technical Analysis", description: "Learn how to analyze market trends and charts.", link: "/lessons/technical-analysis", icon: <FaChartLine /> },
  { title: "Risk Management", description: "Strategies to manage and mitigate trading risks.", link: "/lessons/risk-management", icon: <FaShieldAlt /> },
  { title: "Psychology", description: "Understand the mindset needed for successful trading.", link: "/lessons/psychology", icon: <FaBrain /> },
];

// Different background colors for each card to complement the black-and-gold theme
const cardColors = ["#1A1A1A", "#202020", "#262626", "#2C2C2C"];

// Custom styled component for the title
const AccentTitle = styled(Typography)({
  color: "#D1C286", // Gold color
  fontWeight: "bold",
  "&:hover": {
    color: "#DAA520", // Darker gold on hover
    transition: "color 0.3s ease",
  },
});

// Custom card component to apply background color and hover effect
const LessonCard = styled(Card)(({ theme, bgColor }: { theme: any; bgColor: string }) => ({
  backgroundColor: bgColor,
  color: "#D1C286",
  borderRadius: "12px",
  height: "70vh", // Large height for preview
  width: "90vw", // Wide look
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)", // Slight zoom on hover
    boxShadow: "0px 10px 30px rgba(255, 215, 0, 0.4)", // Gold glow on hover
  },
}));

// Custom Button to add "bounce" effect
const InteractiveButton = styled(Button)({
  backgroundColor: "#D1C286",
  color: "black",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#DAA520",
  },
  animation: "bounce 1s infinite",
  "@keyframes bounce": {
    "0%, 100%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-5px)" },
  },
});

const Lessons = () => {
  return (
    <section id="lessons" className="min-h-screen bg-backgroundBlack text-softWhite py-12 flex flex-col items-center">
      <AccentTitle variant="h2" sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" }, mb: 8, textAlign: "center" }}>
        Lessons Overview
      </AccentTitle>

      <Grid container direction="column" spacing={4} sx={{ alignItems: "center" }}>
        {lessonsData.map((lesson, index) => (
          <Grid item key={index} sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <LessonCard bgColor={cardColors[index % cardColors.length]} elevation={6}>
              <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <Box sx={{ fontSize: 50, color: "#D1C286", mb: 2 }}>{lesson.icon}</Box> {/* Icon with gold color */}
                <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", color: "#D1C286" }}>
                  {lesson.title}
                </Typography>
                <Typography variant="h6" sx={{ color: "white", maxWidth: "70%", margin: "0 auto" }}>
                  {lesson.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ padding: 2, justifyContent: "center" }}>
                <Link href={lesson.link} passHref>
                  <InteractiveButton>
                    Learn More
                  </InteractiveButton>
                </Link>
              </CardActions>
            </LessonCard>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default Lessons;
