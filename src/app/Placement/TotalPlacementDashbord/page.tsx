"use client"
import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Props {
  branch: string; // The branch for which you want to fetch and display the data
  totalPlacements: number; // Total placements count for the branch
  totalSelected: number;  // Total students selected for the branch
}

const TotalPlacementComponent: React.FC<Props> = ({ branch, totalPlacements, totalSelected }) => {
  const router = useRouter();

  return (
    <Card className="shadow-lg p-4 rounded-lg">
      <CardContent>
        <Typography variant="h6" className="mb-4 font-bold">
          {`Branch: ${branch}`}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" className="text-gray-700">
              Total Placements:
            </Typography>
            <Typography variant="h5" className="text-blue-500">
              {totalPlacements}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" className="text-gray-700">
              Total Selected:
            </Typography>
            <Typography variant="h5" className="text-green-500">
              {totalSelected}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalPlacementComponent;
