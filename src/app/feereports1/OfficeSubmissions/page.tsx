// components/ExpenditureForm.tsx
"use client"
import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Input, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import OfficeSubmissions from "@/components/fee/subnav"
import Layout from '@/components/Sidemenu/Layout';

const ExpenditureForm: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [amount, setAmount] = useState<string>('');
  const [particulars, setParticulars] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Add form submission logic here
    console.log('Form submitted');
  };
  const handleChangeDate = (date: Dayjs | null) => {
    setSelectedDate(date);
  };
  return (
    <Layout>
      <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>
                    Generate Student Timetable
                </Typography>
                <Typography variant="body1" paragraph>
                    Easily generate your class timetable by selecting the academic year and semester. Once you've made your selections, click "Submit" to view and organize your schedule for the semester.
                </Typography>
    <Box padding={2}>
      <Typography variant="h5" gutterBottom>
        Office Submissions - Expenditure
      </Typography>
      <OfficeSubmissions />

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
        
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Choose Date"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} fullWidth required />
              )}
            />
          </LocalizationProvider> */}

<LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    label="Select Date"
                    name="Date"
                    value={selectedDate ? dayjs(selectedDate) : null}
                    onChange={(date: Dayjs | null) => handleChangeDate(date)}
                  />
                </DemoContainer>
              </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Amount *"
            variant="outlined"
            fullWidth
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Particulars *"
            variant="outlined"
            fullWidth
            required
            value={particulars}
            onChange={(e) => setParticulars(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="To Whom Amount is Dispatched *"
            variant="outlined"
            fullWidth
            required
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Remarks *"
            variant="outlined"
            fullWidth
            required
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" color="error" gutterBottom>
            Upload File (If Any Bill Please Upload PDF Only) *
          </Typography>
          <Input
            type="file"
            inputProps={{ accept: '.pdf' }}
            fullWidth
            onChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
    </Layout>
  );
};

export default ExpenditureForm;
