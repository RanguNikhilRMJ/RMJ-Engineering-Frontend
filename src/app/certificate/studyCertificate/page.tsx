"use client"
import React from 'react';
import { Box, Grid, TextField, MenuItem, Typography, Paper } from '@mui/material';
import Layout from "@/components/Sidemenu/Layout";
import CustomButton from '@/utils/CustomButton';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();

  const openTc = () => {
    router.push('/certificate/studyCertificate/study'); 
  }

  // List of years for the dropdown
  const years = Array.from({ length: 20 }, (_, i) => 2000 + i); // Generates years from 2000 to 2019

  return (
    <>
      <Layout>
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Study and Conduct Certificate
          </Typography>
          <Paper style={{ padding: '20px', marginTop: '20px' }} elevation={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField label="Student Roll Number" variant="outlined" fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField select label="Choose From Year" variant="outlined" fullWidth required>
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField select label="Choose To Year" variant="outlined" fullWidth required>
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField label="Conduct during the period of study was" variant="outlined" fullWidth required />
              </Grid>
            </Grid>
            <br />
            <CustomButton onClick={openTc}>Submit</CustomButton>
          </Paper>
        </Box>
      </Layout>
    </>
  )
}

export default Page;
