// src/app/Components/AuthScreen/AuthScreen.tsx

"use client";

import React, { useState, useRef, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "/Volumes/HACKED_SQL/peak-trader-academy/src/lib/firebaseConfig"; // Adjust path if needed
import { TextField, Button, Box, Typography, CssBaseline, Container, Snackbar } from "@mui/material";
import { FaChartLine } from "react-icons/fa"; // Trading theme icon
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";

// Animation styling for fluid transitions
const AuthContainer = styled(Container)({
  backgroundColor: "black",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animation: "fadeSlideIn 1.2s ease-in-out",
  "@keyframes fadeSlideIn": {
    "0%": { opacity: 0, transform: "translateY(20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
});

const AuthBox = styled(Box)({
  backgroundColor: "#1a1a1a",
  color: "#D1C382",
  borderRadius: "12px",
  boxShadow: "0px 4px 20px rgba(255, 215, 0, 0.2)",
  padding: "2rem",
  textAlign: "center",
  maxWidth: "400px",
  animation: "fadeIn 0.8s ease-in-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
});

export default function AuthScreen() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Snackbar close handler
  const handleSnackbarClose = () => setSnackbarOpen(false);

  // Toggle between Sign In and Register
  const toggleMode = () => setIsLogin(!isLogin);

  // Registration handler
  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (emailRef.current && passwordRef.current) {
        await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
        setMessage("Registration successful!");
        router.push("/"); // Redirect to dashboard on success
      } else {
        setMessage("Please fill in both fields.");
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  // Login handler
  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (emailRef.current && passwordRef.current) {
        await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
        setMessage("Sign-in successful!");
        router.push("/");
      } else {
        setMessage("Please fill in both fields.");
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <AuthContainer component="main" maxWidth="xs">
      <CssBaseline />
      <AuthBox>
        <FaChartLine size={50} color="#D1C382" style={{ marginBottom: "1rem" }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
          {isLogin ? "Sign In" : "Register"} to Peak Trader Academy
        </Typography>
        <Typography variant="body1" sx={{ color: "#d3d3d3", marginBottom: "2rem" }}>
          {isLogin ? "Welcome back! Please login to continue." : "Join us and start mastering trading today!"}
        </Typography>
        <Box component="form" onSubmit={isLogin ? signIn : register} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={emailRef}
            variant="outlined"
            sx={{
              backgroundColor: "#2a2a2a",
              borderRadius: "8px",
              input: { color: "#D1C382" },
              label: { color: "#D1C382" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#D1C382" },
                "&:hover fieldset": { borderColor: "#D1C382" },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passwordRef}
            variant="outlined"
            sx={{
              backgroundColor: "#2a2a2a",
              borderRadius: "8px",
              input: { color: "#D1C382" },
              label: { color: "#D1C382" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#D1C382" },
                "&:hover fieldset": { borderColor: "#D1C382" },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#D1C382",
              color: "black",
              fontWeight: "bold",
              padding: "0.75rem",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#d4af37",
              },
            }}
            disabled={loading}
          >
            {loading ? "Loading..." : isLogin ? "Sign In" : "Register"}
          </Button>
        </Box>
        <Button
          type="button"
          onClick={toggleMode}
          sx={{
            mt: 2,
            color: "#D1C382",
            fontWeight: "bold",
            textDecoration: "underline",
            "&:hover": { color: "#d4af37" },
          }}
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
        </Button>
      </AuthBox>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={message}
        sx={{ "& .MuiSnackbarContent-root": { backgroundColor: "#1a1a1a", color: "#D1C382" } }}
      />
    </AuthContainer>
  );
}
