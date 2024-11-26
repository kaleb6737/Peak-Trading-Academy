'use client';

import React, { Component } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaChartLine, FaShieldAlt, FaBrain, FaExchangeAlt } from "react-icons/fa";

interface Lesson {
  title: string;
  description: string;
  link: string;
  icon: JSX.Element;
}

interface LessonsState {
  lessons: Lesson[];
}

const lessonsData: Lesson[] = [
  { title: "Symbols", description: "Overview of trading symbols and their meanings.", link: "/sections/symbols", icon: <FaExchangeAlt /> },
  { title: "Technical Analysis", description: "Learn how to analyze market trends and charts.", link: "/sections/technicalAnalysis", icon: <FaChartLine /> },
  { title: "Risk Management", description: "Strategies to manage and mitigate trading risks.", link: "/sections/RiskManagment", icon: <FaShieldAlt /> },
  { title: "Psychology", description: "Understand the mindset needed for successful trading.", link: "/sections/psychology", icon: <FaBrain /> },
];

// Gradient backgrounds for the cards
const cardGradients: string[] = [
  "linear-gradient(135deg, #FF512F, #DD2476)",
  "linear-gradient(135deg, #1D976C, #93F9B9)",
  "linear-gradient(135deg, #36D1DC, #5B86E5)",
  "linear-gradient(135deg, #FF8008, #FFC837)",
];

// Styled components
const AccentTitle = styled(Typography)({
  color: "#F3E5AB",
  fontWeight: "bold",
  "&:hover": {
    color: "#FFD700",
    transition: "color 0.3s ease",
  },
});

const LessonCard = styled(Card)(({ bgGradient }: { bgGradient: string }) => ({
  background: bgGradient,
  color: "#F3E5AB",
  borderRadius: "16px",
  height: "50vh",
  width: "80vh",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 15px 40px rgba(255, 215, 0, 0.6)",
  },
}));

const InteractiveButton = styled(Button)({
  backgroundColor: "#FFD700",
  color: "black",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#FFC107",
  },
  animation: "pulse 1.5s infinite",
  "@keyframes pulse": {
    "0%, 100%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.05)" },
  },
});

const AnimatedIcon = styled(Box)({
  fontSize: "50px",
  color: "#F3E5AB",
  marginBottom: "16px",
  animation: "float 2s ease-in-out infinite",
  "@keyframes float": {
    "0%, 100%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-10px)" },
  },
});

class Lessons extends Component<{}, LessonsState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      lessons: lessonsData,
    };
  }

  render() {
    const { lessons } = this.state;

    return (
      <section id="lessons" className="min-h-screen bg-backgroundBlack text-softWhite py-12 flex flex-col items-center">
        <AccentTitle variant="h2" sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" }, mb: 8, textAlign: "center" }}>
          Lessons Overview
        </AccentTitle>

        <Grid container direction="row" spacing={4} justifyContent="center">
          {lessons.map((lesson, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3} sx={{ display: "flex", justifyContent: "center" }}>
              <LessonCard bgGradient={cardGradients[index % cardGradients.length]} elevation={6}>
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <AnimatedIcon>{lesson.icon}</AnimatedIcon> {/* Animated Icon */}
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#F3E5AB" }}>
                    {lesson.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "white", maxWidth: "80%", margin: "0 auto" }}>
                    {lesson.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ padding: 2, justifyContent: "center" }}>
                  <Link href={lesson.link} passHref>
                    <InteractiveButton>Learn More</InteractiveButton>
                  </Link>
                </CardActions>
              </LessonCard>
            </Grid>
          ))}
        </Grid>
      </section>
    );
  }
}

export default Lessons;
