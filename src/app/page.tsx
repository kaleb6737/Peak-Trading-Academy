"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebaseConfig"; // Adjust path as needed
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/dashboard";
import Lessons from "./sections/Lessons/lessons";
import Welcome from "./Components/Welcome";
import ResourceSection from "./sections/Resources/resources";
import { UserProvider } from "../context/UserContext"; // Import UserProvider

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set auth state
      setIsLoading(false);        // Set loading state
    });

    return () => unsubscribe(); // Clean up subscription
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-backgroundBlack text-softWhite">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <UserProvider> {/* Provide user context globally */}
      <div className="min-h-screen flex flex-col bg-backgroundBlack text-softWhite">
        {isAuthenticated ? (
          <div className="flex flex-col items-center">
            <Navbar />
            <Dashboard />
            <Lessons />
            <ResourceSection />
          </div>
        ) : (
          <Welcome />
        )}
      </div>
    </UserProvider>
  );
}
