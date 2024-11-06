"use client";
import React, { useState } from 'react';
import { Box, Grid, TextField, MenuItem, Typography, Paper, FormControl, InputLabel, Select } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import Layout from "@/components/Sidemenu/Layout";
import CustomButton from '@/utils/CustomButton';
import { useRouter } from 'next/navigation';
import { SelectChangeEvent } from '@mui/material/Select';

const TransferCertificateForm: React.FC = () => {
  const router = useRouter();

  const [rollNo, setRollNo] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    dateOfBirth: null as Dayjs | null,
    interType: '',
    degreeType: 'No',
  });

  const handleNext = () => {
    if (rollNo) setShowForm(true);
  };

  const openTc = () => {
    router.push('/certificate/custodianCertificate/custodian');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleDateChange = (date: Dayjs | null) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: date,
    }));
  };

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

        {showForm && (
          <Paper style={{ padding: '20px', marginTop: '20px' }} elevation={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Student Name"
                  name="studentName"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.studentName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Father Name"
                  name="fatherName"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.fatherName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Date Of Birth (As per SSC)"
                  variant="outlined"
                  fullWidth
                  required
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth required>
                  <InputLabel>Secondary Education Type</InputLabel>
                  <Select
                    name="degreeType"
                    value={formData.degreeType}
                    onChange={handleChange}
                  >
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="DEGREE CERTIFICATE">Intermidiate CERTIFICATE</MenuItem>
                    <MenuItem value="B-TECH CERTIFICATE">Diploma CERTIFICATE</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth required>
                  <InputLabel>Degree Type</InputLabel>
                  <Select
                    name="degreeType"
                    value={formData.degreeType}
                    onChange={handleChange}
                  >
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="DEGREE CERTIFICATE">DEGREE CERTIFICATE</MenuItem>
                    <MenuItem value="B-TECH CERTIFICATE">B-TECH CERTIFICATE</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <br />
            <CustomButton onClick={openTc}>Open TC</CustomButton>
          </Paper>
        )}
      </Box>
    </Layout>
  );
};

export default TransferCertificateForm;
