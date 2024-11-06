"use client"
import React, { useState, useEffect,ChangeEvent} from 'react';
import { Grid, Button, AlertColor,useMediaQuery,TextField,Paper,styled,tableCellClasses,Table,TablePagination,Box,CardContent,Card,CardActions,Typography,TableBody,TableCell,TableContainer,TableHead,TableRow,Dialog,DialogActions,DialogTitle,DialogContent,DialogContentText } from '@mui/material';
import CustomSnackbar from "@/components/CustomSnackbar";
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider,DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import LeavePurpuse from '@/components/dropdown/Leave/LeavePurpuse';
import LeaveTypedp from '@/components/dropdown/Leave/LeaveTypedp';
import Layout from '@/components/Sidemenu/Layout';
import PageTitle from '@/components/PageTitle';
interface SelectedData {
  id:string;
  leavepurpose: string;
  leavetype: string;
  leavedate: string;
  Reason:string;
}


const Leaveapply: React.FC = () => {

  const [selectedData, setSelectedData] = useState<SelectedData>({
    id:'',
    leavepurpose: '',
    leavetype:'',
    leavedate: '',
  Reason:'',
  });

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [Message, setMessage] = useState<string | null>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('error');

  const handleGet = () => {
    const { leavepurpose, leavetype, leavedate, Reason } = selectedData;
    if (
      !leavepurpose || !leavetype || !leavedate || !Reason ||
      leavepurpose === '0' || leavetype === '0'
    ) {
      setErrorMessage('Please make sure all selections are made and not empty.');
      
      const nullFields = [];
      if (!leavepurpose || leavepurpose === '0') nullFields.push('leavepurpose');
      if (!leavetype || leavetype === '0') nullFields.push('leavetype');
      if (!leavedate) nullFields.push('date');
      if (!Reason) nullFields.push('Reason');
      
      const selected = `The following fields are empty or not valid: ${nullFields.join(', ')}`;
      setMessage(selected);
      setSnackbarOpen(true);
      setSeverity('error');
      setTimeout(() => {
        setSnackbarOpen(false);
        setMessage(null);
      }, 10000);
    } else {
      setErrorMessage('');

      setMessage('All selections are valid.');
      setSnackbarOpen(true);
      setSeverity('success');
      setTimeout(() => {
        setSnackbarOpen(false);
        setMessage(null);
      }, 5000);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setMessage(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedData((prevClass) => ({
      ...prevClass,
      [name]: value,
    }));
  };
  const handleleavepurposeSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      leavepurpose: value,
    }));
  };
  const handleChangeDate = (name: string, date: any) => {
    setSelectedData((prevData) => ({
      ...prevData,
      [name]: date ? dayjs(date).format('YYYY-MM-DD') : '',
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token') || undefined;
      const username = localStorage.getItem('username');
      const requestData = {
        id:selectedData.id,
        emplyeeid:username,
        leaveduration:selectedData.leavetype,
        LeavePurpuse:selectedData.leavepurpose,
        date:selectedData.leavedate,
        leavestatus:'pending',
        acadamicid:'',
        approvedby:'pending',
        reason:selectedData.Reason,
        principalapproved:'pending',
        specialofficerapproved:'pending',
        hodapproved:'pending',
      };
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/applyleave`;
      const registeredData = await fetchCardDetailstoken(apiEndpoint, 'POST', requestData,token);
      setMessage(registeredData);
      setSnackbarOpen(true);
      setSeverity('success');
      setTimeout(() => {
        setSnackbarOpen(false);
        setMessage(null);
      }, 5000); 
     
    } catch (error: any) {
      console.error('Error handling form submission:', error.message);
      setMessage(error.message);
      setSnackbarOpen(true);
      setSeverity('error');
      setTimeout(() => {
        setSnackbarOpen(false);
        setMessage(null);
      }, 10000); 
    }
  };
  const handletypeSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
        ...prev,
        leavetype: value,
      }));
  };

  return (
    <>
    <Layout>
        <PageTitle title='Leave Apply' />
      <CustomSnackbar
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        severity={severity}
        message={Message}
      />
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <Box flexGrow={1} textAlign="center">
          <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>Leave Apply</Typography>
          <Typography variant="body1" paragraph>
              Easily generate your class timetable by selecting the academic year and semester. Once you've made your selections, click "Submit" to view and organize your schedule for the semester.
          </Typography>
      </Box>
    </Box>
      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DemoContainer components={['DatePicker', 'DatePicker']}>
  <DatePicker 
  label="Date"
  name="leavedate"
  value={selectedData.leavedate ? dayjs(selectedData.leavedate) : null}
  onChange={(date: Dayjs | null) => handleChangeDate('leavedate', date)}
/>
  </DemoContainer>
</LocalizationProvider>
        </Grid>
        <Grid item xs={6} md={3}>
        <LeavePurpuse onSelectleavepurpuse={handleleavepurposeSelect} selectedleavepurpuse={selectedData.leavepurpose} />
        </Grid>
        <Grid item xs={6} md={3}>
        <LeaveTypedp onSelectleavetype={handletypeSelect} selectedleavetype={selectedData.leavetype} />
        </Grid>
        <Grid item xs={6} md={3}>
        <TextField
            label="Reason"
            name="Reason"
            value={selectedData.Reason}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={3}>
        <form onSubmit={handleSubmit}>
          <Button type="submit" variant="contained" color="primary">
            Leave Approve
          </Button>
        </form>
        </Grid>
      </Grid>
      {errorMessage && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <p style={{ color: 'red' }}>{errorMessage}</p>
          </Grid>
        </Grid>
      )}
    
    </Layout>
    </>
  );
};

export default Leaveapply;
