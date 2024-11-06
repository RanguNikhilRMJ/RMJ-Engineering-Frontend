"use client"
import React, { useState } from 'react';
import { Box, Button, Grid, TextField, MenuItem, Typography, Checkbox, FormControlLabel,Paper } from '@mui/material';
import Layout from "@/components/Sidemenu/Layout";
import CustomButton from '@/utils/CustomButton';
import { useRouter } from 'next/navigation';

const TransferCertificateForm: React.FC = () => {
  const router = useRouter();

  const [rollNo, setRollNo] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showTC, setshowTC] = useState(false);


  const handleNext = () => {
    if (rollNo) setShowForm(true);
  };
  const openTc =()=>{
    router.push('/certificate/TransferCertificate/TC'); 
   }

  return (
    <Layout>
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Transfer Certificate
      </Typography>
      
      <Paper style={{ padding: '20px', marginTop: '20px' }} elevation={3}>
      <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Student Roll No"
                  variant="outlined"
                  fullWidth
                  required
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                />
            </Grid>
        </Grid>
            <br />
          <CustomButton onClick={handleNext}>Submit</CustomButton>

        </Paper>
        {showForm   && (
        <Paper style={{ padding: '20px', marginTop: '20px' }} elevation={3}>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
            <TextField label="Student Name" variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <TextField label="Father Name" variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <TextField select label="Choose Caste" variant="outlined" fullWidth required>
              <MenuItem value="Caste1">Caste 1</MenuItem>
              <MenuItem value="Caste2">Caste 2</MenuItem>
              {/* Add more options as needed */}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <TextField select label="Choose Religion" variant="outlined" fullWidth required>
              <MenuItem value="Religion1">Religion 1</MenuItem>
              <MenuItem value="Religion2">Religion 2</MenuItem>
              {/* Add more options as needed */}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <TextField label="Date Of Birth (As per SSC)" variant="outlined" fullWidth required type="date" InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <TextField label="Date Of Admission" variant="outlined" fullWidth required type="date" InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <TextField label="Reasons of Leaving" variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <FormControlLabel
              control={<Checkbox />}
              label="Whether the Student Has Paid All Fees Due to College?"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <FormControlLabel
              control={<Checkbox />}
              label="Whether Qualified for Promotion for Higher Class?"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <TextField label="Date on Which Student Left the College" variant="outlined" fullWidth required type="date" InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <TextField label="Date on Which Application for Transfer Certificate was Made" variant="outlined" fullWidth required type="date" InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <TextField select label="Choose Conduct" variant="outlined" fullWidth>
              <MenuItem value="Good">Good</MenuItem>
              <MenuItem value="Average">Average</MenuItem>
              <MenuItem value="Poor">Poor</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <TextField label="Date of Transfer Certificate" variant="outlined" fullWidth required type="date" InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <TextField label="Sub Group" variant="outlined" fullWidth />
          </Grid>
        </Grid>
        <CustomButton onClick={openTc}>Submit</CustomButton>
 
      </Paper>
      )}

    </Box>
    </Layout>

  );
};

export default TransferCertificateForm;
