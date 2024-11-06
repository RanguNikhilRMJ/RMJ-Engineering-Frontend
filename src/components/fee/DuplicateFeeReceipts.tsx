import React from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';

interface DuplicateFeeReceiptsFormProps {
  onNext: () => void;
  setFormData: React.Dispatch<React.SetStateAction<{
    phoneNumber: string;
    name: string;
    hallticket: string;
    studentRollNo: string;
    batch: number;
    year: number;
    feeName: string;
    amount: number;
    academicId: number;
    category: string;
  }>>; // Properly typed setFormData
}

const DuplicateFeeReceiptsForm: React.FC<DuplicateFeeReceiptsFormProps> = ({ onNext, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box className="p-4 bg-white shadow-md rounded-md">
      <Typography variant="h6" component="h2" className="mb-4">
        Duplicate Fee Receipts
      </Typography>
      <Grid container spacing={2}>
        {/* Phone Number Input */}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            name="phoneNumber"
            onChange={handleChange}
            className="bg-gray-100"
          />
        </Grid>
        {/* Name Input */}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            onChange={handleChange}
            className="bg-gray-100"
          />
        </Grid>
        {/* Hallticket Input */}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Hallticket"
            variant="outlined"
            name="hallticket"
            required
            onChange={handleChange}
            className="bg-gray-100"
          />
        </Grid>
        {/* Student Rollno Input */}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Student Rollno"
            variant="outlined"
            name="studentRollNo"
            onChange={handleChange}
            className="bg-gray-100"
          />
        </Grid>
      </Grid>
      {/* Next Button */}
      <Box className="mt-4 flex justify-center">
        <Button variant="contained" color="primary" onClick={onNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default DuplicateFeeReceiptsForm;
