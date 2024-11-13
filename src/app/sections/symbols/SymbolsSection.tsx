"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress, Grid, Box } from "@mui/material";
import { getSymbolOverview } from "../../services/yahooFinanceService";

// Define default symbols for Crypto, Forex, and Stocks
const symbols = [
  { name: "Bitcoin", symbol: "BTC-USD", type: "Crypto" },
  { name: "Ethereum", symbol: "ETH-USD", type: "Crypto" },
  { name: "EUR/USD", symbol: "EURUSD=X", type: "Forex" },
  { name: "USD/JPY", symbol: "JPY=X", type: "Forex" },
  { name: "Apple Inc.", symbol: "AAPL", type: "Stock" },
  { name: "Tesla Inc.", symbol: "TSLA", type: "Stock" },
];

const SymbolsSection: React.FC = () => {
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results: { [key: string]: any } = {};
        for (const { symbol } of symbols) {
          results[symbol] = await getSymbolOverview(symbol);
        }
        setData(results);
      } catch (error) {
        console.error("Error fetching symbol data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <CircularProgress sx={{ color: "#D1C382" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#D1C382", textAlign: "center", mb: 4 }}>
        Symbols Overview
      </Typography>
      <Grid container spacing={3}>
        {symbols.map(({ name, symbol, type }) => (
          <Grid item xs={12} md={6} lg={4} key={symbol}>
            <Card sx={{ bgcolor: "#1a1a1a", color: "#D1C382", borderRadius: "12px", p: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {name} ({type})
                </Typography>
                {data[symbol] ? (
                  <>
                    <Typography variant="h6">Price: ${data[symbol].regularMarketPrice}</Typography>
                    <Typography variant="body2">Day High: ${data[symbol].regularMarketDayHigh}</Typography>
                    <Typography variant="body2">Day Low: ${data[symbol].regularMarketDayLow}</Typography>
                    <Typography variant="body2">Market Cap: ${data[symbol].marketCap}</Typography>
                  </>
                ) : (
                  <Typography variant="body2">No data available</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SymbolsSection;
