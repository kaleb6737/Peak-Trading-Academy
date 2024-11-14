import React, { useEffect, useState } from "react";
import { getSymbolData } from "/Volumes/HACKED_SQL/peak-trader-academy/src/app/services/yahooFinanceService";
import { Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";

const symbols = ["AAPL", "TSLA", "BTC-USD", "ETH-USD", "EURUSD=X"];

const SymbolDataFetcher = () => {
  const [symbolData, setSymbolData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPromises = symbols.map((symbol) => getSymbolData(symbol));
        const data = await Promise.all(dataPromises);
        setSymbolData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={3}>
      {symbolData.map((data, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Card sx={{ bgcolor: "#1a1a1a", color: "#D1C286" }}>
            <CardContent>
              <Typography variant="h5">{data.name}</Typography>
              <Typography>Price: ${data.price}</Typography>
              <Typography>Day High: ${data.dayHigh}</Typography>
              <Typography>Day Low: ${data.dayLow}</Typography>
              <Typography>Market Cap: ${data.marketCap}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SymbolDataFetcher;
// src/
// │
// ├── app/
// │   ├── Components/
// │   │   ├── Symbols/              <-- Place reusable UI components for symbols here
// │   │   │   ├── SymbolCard.tsx    <-- Individual card component for symbols
// │   │   │   ├── SymbolChart.tsx   <-- Component for rendering charts
// │   │   │   └── SymbolDetails.tsx <-- Detailed view for a specific symbol
// │   │   ├── Lessons/              <-- Existing lessons components
// │   │   └── Navbar.tsx
// │   │
// │   ├── sections/
// │   │   ├── symbols/              <-- Add the SymbolModule as a section
// │   │   │   ├── page.tsx          <-- Entry point for the Symbols module
// │   │   │   ├── SymbolOverview.tsx <-- Overview of all symbols
// │   │   │   ├── SymbolData.tsx    <-- Data fetching and handling logic
// │   │   │   └── index.tsx         <-- Export the main module
// │   │   └── lessons/
// │   │
// │   ├── auth/                     <-- Authentication pages
// │   ├── welcome/
// │   └── dashboard/
// │
// ├── lib/                          <-- Utility files for reusable logic
// │   ├── yahooFinanceService.ts    <-- Centralized Yahoo Finance service
// │   ├── auth.ts
// │   └── firebaseConfig.ts
// │
// ├── pages/
// │   ├── api/
// │   │   └── getSymbolData.ts      <-- API route for fetching symbol data
// │   ├── index.tsx
// │   └── symbols/                  <-- Dedicated page for symbols if needed
// │
// ├── context/
// │   ├── UserContext.tsx
// │   └── SymbolsContext.tsx        <-- Context provider for symbol data
// │
// ├── services/
// │   ├── yahooFinanceService.ts    <-- Place Yahoo Finance fetching logic here
// │   └── ... other services ...
// │
// └── styles/
//     └── globals.css
