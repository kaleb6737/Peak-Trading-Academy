'use client';

import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Card, CardContent, CardMedia, Button, Grid } from '@mui/material';

const resources = {
  Videos: [
    {
      title: 'Learn Trading Basics',
      description: 'A comprehensive guide to get started with trading.',
      link: 'https://www.youtube.com/watch?v=_YVQN6_nkfs&t=793s',
      thumbnail: 'https://source.unsplash.com/400x300/?trading,business',
    },
    {
      title: 'Understanding Forex',
      description: 'An insightful video about Forex trading strategies.',
      link: 'https://www.youtube.com/results?search_query=Forex+tradign+for+beignner',
      thumbnail: 'https://source.unsplash.com/400x300/?forex,finance',
    },
  ],
  Articles: [
    {
      title: 'Mastering Technical Analysis',
      description: 'A step-by-step article on how to analyze market trends.',
      link: 'https://www.investopedia.com/articles/technical-analysis',
      thumbnail: 'https://source.unsplash.com/400x300/?analysis,chart',
    },
    {
      title: 'The Psychology of Trading',
      description: 'Learn how to manage emotions and stay disciplined.',
      link: 'https://www.tradingpsychology.com/',
      thumbnail: 'https://source.unsplash.com/400x300/?psychology,stock',
    },
  ],
  Websites: [
    {
      title: 'Investopedia',
      description: 'One of the best educational platforms for traders.',
      link: 'https://www.investopedia.com/',
      thumbnail: 'https://source.unsplash.com/400x300/?education,trading',
    },
    {
      title: 'TradingView',
      description: 'A powerful charting tool for market analysis.',
      link: 'https://www.tradingview.com/',
      thumbnail: 'https://source.unsplash.com/400x300/?chart,market',
    },
  ],
};

const ResourceSection = () => {
  const [currentTab, setCurrentTab] = useState('Videos');

  return (
    <Box
      id="resources"
      sx={{
        width: '100vw',
        minHeight: '100vh',
        py: 6,
        px: 4,
        color: '#D1C382',
        animation: 'bgAnimation 10s ease-in-out infinite',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '@keyframes bgAnimation': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center',
          mb: 6,
          color: '#F9D342',
          fontWeight: 'bold',
          textShadow: '2px 2px 10px rgba(255, 223, 0, 0.7)',
        }}
      >
        Explore Our Resources
      </Typography>
      <Tabs
        value={currentTab}
        onChange={(_, newValue) => setCurrentTab(newValue)}
        centered
        sx={{
          mb: 6,
          '& .MuiTabs-indicator': { backgroundColor: '#FFD700' },
          '& .MuiTab-root': {
            color: '#D1C382',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            '&:hover': { color: '#FFD700', transform: 'scale(1.1)' },
          },
          '& .Mui-selected': {
            color: '#FFD700',
            textShadow: '2px 2px 10px rgba(255, 215, 0, 0.8)',
          },
        }}
      >
        {Object.keys(resources).map((category) => (
          <Tab key={category} label={category} value={category} />
        ))}
      </Tabs>
      <Grid container spacing={4} justifyContent="center">
        {resources[currentTab].map((resource, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                bgcolor: 'rgba(38, 38, 38, 0.85)',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 12px 36px rgba(255, 215, 0, 0.6)',
                },
              }}
            >
              <CardMedia
                component="img"
                image={resource.thumbnail}
                alt={`${resource.title} thumbnail`}
                sx={{
                  height: 200,
                  borderRadius: '16px 16px 0 0',
                  transition: 'transform 0.5s ease',
                  '&:hover': { transform: 'scale(1.1)' },
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://via.placeholder.com/400x300?text=Image+Not+Found';
                }}
              />
              <CardContent sx={{ textAlign: 'center', color: '#D1C382' }}>
                <Typography variant="h5" sx={{ mb: 2, color: '#F9D342' }}>
                  {resource.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 4 }}>
                  {resource.description}
                </Typography>
                <Button
                  variant="contained"
                  component="a"
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: '#FFD700',
                    color: '#1a1a1a',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 15px rgba(255, 215, 0, 0.5)',
                    '&:hover': {
                      bgcolor: '#F9D342',
                      boxShadow: '0px 6px 20px rgba(255, 223, 0, 0.7)',
                    },
                  }}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ResourceSection;
