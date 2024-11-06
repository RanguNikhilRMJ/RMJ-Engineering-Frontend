"use client"
import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface AttendanceCardProps {
  title: string;
  present: number;
  absent: number;
  leave: number;
  total: number;
  colors: string[];
}
const AttendanceCard: React.FC<AttendanceCardProps> = ({ title, present, absent, leave, total, colors }) => {
    const data = {
      labels: ['Present', 'Absent', 'Leave'],
      datasets: [
        {
          data: [present, absent, leave],
          backgroundColor: colors,
          borderWidth: 1,
        },
      ],
    };
  
    return (
      <Card sx={{ width: '100%', borderRadius: '16px', height: '300px', display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            {title}
          </Typography>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={6}>
              <Doughnut data={data} options={{
                cutout: '70%',
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw}`,
                    },
                  },
                },
              }} />
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                  <Box sx={{ width: 16, height: 16, backgroundColor: colors[0], marginRight: 1 }} /> Present - {present}
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                  <Box sx={{ width: 16, height: 16, backgroundColor: colors[1], marginRight: 1 }} /> Absent - {absent}
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 16, height: 16, backgroundColor: colors[2], marginRight: 1 }} /> Leave - {leave}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
  

export default AttendanceCard