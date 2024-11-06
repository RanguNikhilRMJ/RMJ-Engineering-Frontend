// components/CompanyForm.tsx

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  MenuItem,
  Typography,
   AlertColor,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import CustomSnackbar from "@/components/CustomSnackbar";
interface FormData {
  companyName: string;
  companyShortName: string;
  packageName: string;
  registertype: string;
}

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company Name is required'),
  companyShortName: Yup.string().required('Short Name is required'),
 
  packageName: Yup.string().required('Package selection is required'),
  registertype: Yup.string().required('Registration Type is required'),
});

const CompanyForm: React.FC = () => {
  const [Message, setMessage] = useState<string | null>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('error');
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [dataList, setDataList] = useState<FormData[]>([]);
  
  // State for controlling dialog visibility
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: yupResolver(validationSchema) as any,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token') || undefined;
        const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/api/placement/getAllPlacementDetails`;
        const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
        setDataList(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: FormData) => {
    
    const requestData = {
      packageName: data.packageName,
      registertype: data.registertype,
      companyName: data.companyName,
     
      companyShortName: data.companyShortName,
    };
    // Submit formData to your API endpoint
    try {
      const token = localStorage.getItem('token') || undefined;
      const registeredData = await fetchCardDetailstoken(
        `${DIGITAL_CAMPUS_BASE_URL}/api/placement/createPlacementId`,
        "POST",
        requestData,
        token
      );
      if (registeredData.status === 200) {
        setMessage(registeredData.ok);
      setSnackbarOpen(true);
      setSeverity('success');
      setTimeout(() => {
        setSnackbarOpen(false);
        setMessage(null);
      }, 5000);
      } else {
        alert(registeredData.status);
          }
      
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/api/placement/getAllPlacementDetails`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
      setDataList(fetchedData);

      // Set the submitted data to state for viewing
      setSubmittedData(data);
      
      // Close the dialog after submission
      setOpen(false);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setMessage(null);
  };
  return (
    <Box>
      <CustomSnackbar
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        severity={severity}
        message={Message}
      />
      {/* Button to open the dialog */}
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Open Company Form
      </Button>

      {/* Dialog for the form */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Company Registration</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Company Name"
              fullWidth
              margin="normal"
              {...register('companyName')}
              error={!!errors.companyName}
              helperText={errors.companyName?.message}
            />

            <TextField
              label="Company Short Name"
              fullWidth
              margin="normal"
              {...register('companyShortName')}
              error={!!errors.companyShortName}
              helperText={errors.companyShortName?.message}
            />

           
            <TextField
              select
              label="package"
              fullWidth
              margin="normal"
              {...register('packageName')}
              error={!!errors.packageName}
              helperText={errors.packageName?.message}
            >
              <MenuItem value="basic">Basic</MenuItem>
              <MenuItem value="premium">Premium</MenuItem>
            </TextField>

            <TextField
              select
              label="Registration Type"
              fullWidth
              margin="normal"
              {...register('registertype')}
              error={!!errors.registertype}
              helperText={errors.registertype?.message}
            >
              <MenuItem value="individual">Individual</MenuItem>
              <MenuItem value="business">Business</MenuItem>
            </TextField>

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display submitted data */}
      {/* {submittedData && (
        <Box mt={4}>
          <Typography variant="h6">Submitted Data:</Typography>
          <Typography><strong>Company Name:</strong> {submittedData.companyName}</Typography>
          <Typography><strong>Company Short Name:</strong> {submittedData.companyShortName}</Typography>
          <Typography><strong>Package:</strong> {submittedData.packageName}</Typography>
          <Typography><strong>Registration Type:</strong> {submittedData.registerType}</Typography>
        </Box>
      )} */}

      {/* Display list of all submissions */}
      {dataList.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">All Submitted Companies:</Typography>
          {dataList.length > 0 ? (
  dataList.map((item, index) => (
    <Box key={index} mb={2}>
      <Typography><strong>Company Name:</strong> {item.companyName}</Typography>
      <Typography><strong>Company Short Name:</strong> {item.companyShortName}</Typography>
      <Typography><strong>Package:</strong> {item.packageName}</Typography>
      <Typography><strong>Registration Type:</strong> {item.registertype}</Typography>
    </Box>
  ))
) : (
  <Typography>No data</Typography> // Display this message when there is no data
)}
        </Box>
      )}
    </Box>
  );
};

export default CompanyForm;