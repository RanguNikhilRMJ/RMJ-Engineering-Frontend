import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { PieChart } from '@mui/x-charts/PieChart';
import CircularProgress from '@mui/material/CircularProgress';
import {  Box, useTheme } from '@mui/material';

function SmallCard() {

  return (

    <Box  >
    <Grid container >
        <Grid item xs={6}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" display="block"  gutterBottom>
              95%
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              student attendance
            </Typography>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div style={{height:"100%"}}>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'series A' },
                  { id: 1, value: 15, label: 'series B' },
                  { id: 2, value: 20, label: 'series C' },
          

                  
                ],
                innerRadius: 30,
                outerRadius: 20,
                paddingAngle: 7,

              },
            ]}
            width={200}
            height={100}
          />         
          {/* <CircularProgressWithLabel value={progress} /> */}
          </div>
        </Grid>
    </Grid>

        </Box>
  );
}

export default SmallCard;
