'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, Typography, CircularProgress, Box, Tabs, Tab, Button } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import lessonsData from '@/data/lessonsData.json'; // Import lessons JSON

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const fetchSymbolData = async (symbol: string) => {
  if (typeof symbol !== 'string') {
    throw new Error('Symbol must be a string');
  }
  const response = await fetch(`/api/getSymbolData?symbol=${symbol}`);
  if (!response.ok) {
    throw new Error('Failed to fetch symbol data.');
  }
  return await response.json();
};

const generateChartData = (priceHistory: number[]) => ({
  labels: priceHistory.map((_, index) => `Point ${index + 1}`),
  datasets: [
    {
      label: 'Price',
      data: priceHistory,
      borderColor: '#D1C382',
      backgroundColor: 'rgba(209, 195, 130, 0.2)',
      tension: 0.4,
    },
  ],
});

const SymbolsSection = () => {
  const [currentCategory, setCurrentCategory] = useState('Symbols');
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [chartData, setChartData] = useState<{ [key: string]: number[] }>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results: { [key: string]: any } = {};
        const chartResults: { [key: string]: number[] } = {};
        const symbols = Object.keys(lessonsData[currentCategory]?.lessons || {});

        for (const symbol of symbols) {
          const response = await fetchSymbolData(symbol);
          results[symbol] = response;

          // Generate mock price history data or use the provided one
          chartResults[symbol] = response.history || Array.from({ length: 10 }, () => Math.random() * 1000);
        }

        setData(results);
        setChartData(chartResults);
      } catch (error) {
        console.error('Error fetching symbol data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000); // Update every 5 seconds for dynamic price changes
    return () => clearInterval(interval);
  }, [currentCategory]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress sx={{ color: '#D1C382' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Button
        onClick={() => router.back()}
        sx={{
          mb: 4,
          bgcolor: '#D1C382',
          color: '#000',
          '&:hover': { bgcolor: '#DAA520' },
        }}
      >
        Back
      </Button>
      <Typography variant="h4" sx={{ color: '#D1C382', textAlign: 'center', mb: 4 }}>
        {currentCategory} Overview
      </Typography>
      <Box sx={{ bgcolor: '#1a1a1a', color: '#D1C382', borderRadius: '12px', p: 4, mb: 4 }}>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {lessonsData[currentCategory]?.intro}
        </Typography>
      </Box>

      <Tabs
        value={currentCategory}
        onChange={(_, newValue) => setCurrentCategory(newValue)}
        centered
        sx={{
          mb: 4,
          '& .MuiTabs-indicator': { backgroundColor: '#D1C382' },
          '& .MuiTab-root': { color: '#D1C382' },
          '& .Mui-selected': { color: '#DAA520' },
        }}
      >
        {Object.keys(lessonsData).map((category) => (
          <Tab key={category} label={category} value={category} />
        ))}
      </Tabs>

      {Object.keys(lessonsData[currentCategory]?.lessons || {}).map((symbol) => (
        <Box key={String(symbol)} sx={{ mb: 6 }}>
          <Card
            sx={{
              bgcolor: '#1a1a1a',
              color: '#D1C382',
              borderRadius: '12px',
              p: 2,
              mb: 2,
              boxShadow: '0 6px 18px rgba(209, 195, 130, 0.2)',
              '&:hover': { transform: 'scale(1.02)' },
              transition: 'all 0.3s ease',
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {symbol}
              </Typography>
              {data[symbol] ? (
                <>
                  <Typography variant="h6">Price: ${data[symbol].regularMarketPrice}</Typography>
                  <Typography variant="body2">Day High: ${data[symbol].regularMarketDayHigh}</Typography>
                  <Typography variant="body2">Day Low: ${data[symbol].regularMarketDayLow}</Typography>
                  <Typography variant="body2">Market Cap: ${data[symbol].marketCap || 'N/A'}</Typography>
                </>
              ) : (
                <Typography variant="body2">No data available</Typography>
              )}
              <Box sx={{ mt: 4 }}>
                <Line
                  data={generateChartData(chartData[symbol] || [])}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                      x: { ticks: { color: '#D1C382' } },
                      y: { ticks: { color: '#D1C382' } },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ bgcolor: '#262626', color: '#D1C382', borderRadius: '12px', p: 4 }}>
            <Typography variant="body1">{lessonsData[currentCategory]?.lessons[symbol]}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default SymbolsSection;
