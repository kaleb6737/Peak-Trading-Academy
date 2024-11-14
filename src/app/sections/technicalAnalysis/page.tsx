'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, Typography, CircularProgress, Box, Tabs, Tab, Button } from '@mui/material';

const TechnicalAnalysisSection = () => { 
    const [currentCategory, setCurrentCategory] = useState('Technical Analysis');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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
            >Back</Button>

            <Typography variant="h4" sx={{ color: '#D1C382', textAlign: 'center', mb: 4 }}>
                {currentCategory} Overview
            </Typography>
        </Box>
    )
};

export default TechnicalAnalysisSection;

