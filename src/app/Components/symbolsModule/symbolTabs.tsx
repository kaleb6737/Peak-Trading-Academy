import React from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";

const SymbolTabs = ({ onTabChange }: { onTabChange: (tabIndex: number) => void }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    onTabChange(newValue);
  };

  return (
    <Box>
      <Tabs value={selectedTab} onChange={handleChange} centered>
        <Tab label="Ticker Symbols" />
        <Tab label="Currency Symbols" />
        <Tab label="Commodity Symbols" />
        <Tab label="Index Symbols" />
        <Tab label="Crypto Symbols" />
      </Tabs>
      <Typography sx={{ mt: 2, color: "#D1C286", textAlign: "center" }}>
        Learn about financial symbols and their significance.
      </Typography>
    </Box>
  );
};

export default SymbolTabs;
