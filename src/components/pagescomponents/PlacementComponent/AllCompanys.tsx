"use client"

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  AlertColor,
  Box,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
} from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import CustomSnackbar from "@/components/CustomSnackbar";
import Layout from '@/components/Sidemenu/Layout';

interface FormData {
  logoUrl:string;
  companyName: string;
  companyShortName: string;
  packageName: string;
  registertype: string;
  status: boolean; 

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
  const [dataList, setDataList] = useState<FormData[]>([]);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(validationSchema) as any,
  });

  // const fetchPlacementDetails = async () => {
  //   try {
  //     const token = localStorage.getItem('token') || undefined;
  //     const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/api/placement/getAllPlacementDetails`;
  //     const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET', null, token);
  //     setDataList(fetchedData || []);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const fetchPlacementDetails = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/companies/');
      const fetchedData = await response.json();
      setDataList(fetchedData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // const submitPlacementData = async (data: FormData) => {
  //   const requestData = {
  //     packageName: data.packageName,
  //     registertype: data.registertype,
  //     companyName: data.companyName,
  //     companyShortName: data.companyShortName,
  //     logoUrl:data.logoUrl,
  //   };

  //   try {
  //     const token = localStorage.getItem('token') || undefined;
  //     const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/api/placement/createPlacementId`;
  //     const registeredData = await fetchCardDetailstoken(apiEndpoint, 'POST', requestData, token);

  //     if (registeredData) {
  //       setMessage('Company Registered Successfully!');
  //       setSeverity('success');
  //       fetchPlacementDetails();
  //       setOpen(false)
  //       } else {
  //       setMessage('Failed to register the company.');
  //       setSeverity('error');
  //     }
  //   } catch (error) {
  //     console.error('Error submitting data:', error);
  //     setMessage('An error occurred while submitting the form.');
  //     setSeverity('error');
  //   } finally {
  //     setSnackbarOpen(true);
  //     setTimeout(() => {
  //       setSnackbarOpen(false);
  //       setMessage(null);
  //     }, 5000);
  //   }
  // };

  useEffect(() => {
    fetchPlacementDetails();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setMessage(null);
  };

  return (
    <>
      <Box >
        {/* <CustomSnackbar
          open={isSnackbarOpen}
          onClose={handleCloseSnackbar}
          severity={severity}
          message={Message}
        /> */}

        {/* <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
          sx={{ marginBottom: '20px' }}
        >
          Open Company Form
        </Button> */}

        {/* <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
          <DialogTitle>Company Registration</DialogTitle>
          <DialogContent>
            <form>
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
                label="Company logo Image url"
                fullWidth
                margin="normal"
                {...register('logoUrl')}
                error={!!errors.logoUrl}
                helperText={errors.logoUrl?.message}
              />
              <TextField
                select
                label="Package"
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: '10px' }}
              >
                Submit
              </Button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog> */}

        {/* {dataList.length > 0 && (
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              All Submitted Companies:
            </Typography>
            <Box
              component="table"
              sx={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: '20px',
                '& th, & td': {
                  border: '1px solid #ddd',
                  padding: '10px',
                  textAlign: 'left',
                },
                '& th': {
                  backgroundColor: '#f4f4f4',
                  fontWeight: 'bold',
                },
                '& tr:nth-of-type(even)': {
                  backgroundColor: '#f9f9f9',
                },
                '& tr:hover': {
                  backgroundColor: '#eaf2f8',
                },
              }}
            >
              <Box component="thead">
                <Box component="tr">
                <Box component="th">Company logo</Box>
                  <Box component="th">Company Name</Box>
                  <Box component="th">Short Name</Box>
                  <Box component="th">Package</Box>
                  <Box component="th">Registration Type</Box>
                </Box>
              </Box>
              <Box component="tbody">
                {dataList.map((item, index) => (
                  <Box component="tr" key={index}>
                    <Box component="td">
                      <Avatar src={item.logoUrl} alt={item.companyName} />
                    </Box>                   
                    <Box component="td">{item.companyName}</Box>
                    <Box component="td">{item.companyShortName}</Box>
                    <Box component="td">{item.packageName}</Box>
                    <Box component="td">{item.registertype}</Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )} */}

{dataList.length > 0 && (
  <Box >
    <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>
      All  Companies:
    </Typography>
      <Typography variant="body1" paragraph>
        List of all Registered company 
    </Typography>
    <Box
      component="table"
      sx={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        '& th, & td': {
          border: '1px solid #ddd',
          padding: '10px',
          textAlign: 'left',
        },
        '& th': {
          backgroundColor: '#f4f4f4',
          fontWeight: 'bold',
        },
        '& tr:nth-of-type(even)': {
          backgroundColor: '#f9f9f9',
        },
        '& tr:hover': {
          backgroundColor: '#eaf2f8',
        },
      }}
    >
      <Box component="thead">
        <Box component="tr">
          <Box component="th">Company logo</Box>
          <Box component="th">Company Name</Box>
          <Box component="th">Package</Box>
          <Box component="th">Registration Type</Box>
          <Box component="th">Rounds</Box>
          <Box component="th">Status</Box> {/* New header */}

        </Box>
      </Box>
      <Box component="tbody">
        {dataList.map((item, index) => (
          <Box component="tr" key={item._id}>
            <Box component="td">
              <Avatar src={item.logoUrl} alt={item.name} />
            </Box>
            <Box component="td">{item.name}</Box>
            <Box component="td">{item.packageType}</Box>
            <Box component="td">{item.placementType}</Box>
            {/* <Box component="td">{item.}</Box> */}
            <Box component="td">{item.rounds.map((round) => round.name).join(', ')}</Box> {/* Display rounds as comma-separated */}
               {/* Add the new button column */}
              <Box component="td">
              <Switch
                        checked={item.status}
                        onChange={(e) =>
                          toggleStatus(item._id, e.target.checked)
                        }
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#4caf50', // Green color for the switch circle
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#4caf50', // Green color for the switch track
                          },
                        }}
                      />
                 </Box>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
)}


      </Box>
    </>

  );
};

export default CompanyForm;
