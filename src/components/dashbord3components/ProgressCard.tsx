// components/ProgressCard.tsx
import React from 'react';
import { Card, CardContent, Typography, CircularProgress, Box, Avatar } from '@mui/material';

interface ProgressCardProps {
  subject: string;
  score: string;
  percentage: number;
  date: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ subject, score, percentage, date }) => {
  return (
    // <Card sx={{ width: 200, padding: 2, borderRadius: 3 }}>
        <div>
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <Typography variant="h6">λ</Typography>
          </Avatar>
        <Typography variant="h6" textAlign="center">
        {subject}
        </Typography>
        </Box>

        <Typography variant="h5" textAlign="center" sx={{ marginY: 1 }}>
          {score}
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" position="relative">
          <CircularProgress variant="determinate" value={percentage} size={60} />
          <Box
            position="absolute"
            top={0}
            left={0}
            bottom={0}
            right={0}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h6">{`${percentage}%`}</Typography>
          </Box>
        </Box>
        </div>
    //</Card> */}
  );
};

export default ProgressCard;
