"use client"
import React, { useState, useEffect } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, TextField, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Button, Paper,FormLabel } from '@mui/material';
import TransportFeeDialog from '@/components/fee/TransportFeeDialog/TransportFeeDialog';
import Layout from '@/components/Sidemenu/Layout';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Box, Select, InputLabel} from '@mui/material';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import {fetchCardDetails} from '@/modules/api';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { Stack, Alert } from '@mui/material';

interface Student {
  studentrollno: string;
  name: string;
  feename: string;
  seattype: string;
  amount:number;
  paid:number;
  due:number;
  phoneno:number;
  beingPaid:number;
}

interface Student1 {
  studentrollno: string;
  name: string;
  fathername: string;
  branchshortname: string;
  brandname:string;
  batch:string;
}
const FeePaymentForm: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState(''); // To store the message
  type AlertType = 'error' | 'info' | 'success' | 'warning';
  const [alertType, setAlertType] = useState<AlertType>('info'); // Default value
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());
  const [showTable, setShowTable] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);
  const [paymentType, setPaymentType] = useState('Cash');
  const [beingPaid, setBeingPaid] = useState('');
  const [total, setTotal] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    phoneno: '',
    name: '',
    hallticket: '',
    studentrollno: '',
  });
  const [studentData, setStudentData] = useState<Student1[]>([]);
  const [error, setError] = useState('');
  const [pickupPoint, setPickupPoint] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [feeDetails, setFeeDetails] = useState<Student[]>([]); // Explicitly define the type
  const [selectedStudent, setSelectedStudent] = useState<Student1 | null>(null);
  const [amountError, setAmountError] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null); // Token can be either a string or null

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Only run this on the client-side
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);


  const handlePickupPointChange = (event: any) => {
    setPickupPoint(event.target.value as string);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };
 
  const handleUpdate = async () => {
    try {
      // Prepare request data
      const requestData = {
        studentrollno: selectedStudent, // Use selected student's roll number
        route: pickupPoint, // Selected pickup pointstudentrollno
        bus: 'Bus XYZ', // Specify bus details if applicable
        amount: Number(amount), // Convert amount to a number
        acadamicid: 1, // Set the academic ID
        year: new Date().getFullYear(), // Get the current year
      };
  
      // Define API endpoint
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/addTransportDetails`;
  
      // Send request to API
      if (apiEndpoint) {
        setAlertMessage('Transport details updated successfully.');
        setAlertType('success'); // Set success alert
      } else {
        setAlertMessage(apiEndpoint || 'Failed to update transport details.');
        setAlertType('error'); // Set error alert
      }
    } catch (error) {
      setAlertMessage('Error updating transport details.');
      setAlertType('error'); // Set error alert in case of exception
    }

    console.log(`Pickup Point: ${pickupPoint}, Amount: ${amount}`);
  
    // Close the dialog after the operation
    handleCloseDialog();
  };
  
 
  const handleOpenDialog = (student:any) => {
    setSelectedStudent(student);  // Store selected student in state

    setDialogOpen(true);
  };
 
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const index = Number(event.target.value); // Assuming value is the index
    setSelectedRowIndex(checked ? index : null);
  };

  const handlePaymentTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentType(event.target.value);
  };

  const handleBeingPaidChange = (event:any, feeIndex:any) => {
    const newAmount = Number(event.target.value);
    const dueAmount = Number(feeDetails[feeIndex].due); // Access the due amount for the current row
  console.log(newAmount+" : "+ dueAmount )
    if (newAmount > dueAmount) {
      setAmountError(true);
    } else {
      setAmountError(false);
    }
    // Update state or logic for handling the payment amount
    const updatedFeeDetails = [...feeDetails];
    updatedFeeDetails[feeIndex].beingPaid = newAmount;
    setFeeDetails(updatedFeeDetails);

  };

  const handleSubmit = () => {
    console.log('Payment Submitted');
    // Add logic to submit payment details
  };
  const handleChange = (e:any) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextClick = async () => {
    try {
      const filteredParams = Object.fromEntries(
        Object.entries(searchParams).filter(([_, value]) => value.trim() !== '')
      );

      const response = await axios.get('http://localhost:9999/findByDynamicParamsViewStudentFeeDetails1', {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the request headers 
        },
        params: filteredParams,
      });

      if (response.data.length > 0) {
        setStudentData(response.data);
        setShowTable(true);
        setError('');
      } else {
        setError('No user exists');
        setShowTable(false);
      }
    } catch (error) {
      setError('Error fetching data');
      setShowTable(false);
    }
  };
  const handlePaidClick = async (studentrollno: string) => {
    try {
      const response = await axios.get(`http://localhost:9999/viewStudentFeeDetailsByStudentRollNo`, {
        headers: {
          Authorization: ` Bearer ${token}`, // Pass token in the request headers
        },
        params: { studentrollno },
      });

      setShowPaymentForm(true);
      setFeeDetails(response.data);
    } catch (error) {
      console.error('Error fetching fee details:', error);
    }
  };

  return (
    <Layout>
      <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>
          Generate Student Timetable
      </Typography>
      <Typography variant="body1" paragraph>
          Easily generate your class timetable by selecting the academic year and semester. Once you've made your selections, click "Submit" to view and organize your schedule for the semester.
      </Typography>
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
    
      <Typography variant="h5" gutterBottom>
        Fee Payment
      </Typography>
      {/* Form Section */}
      <Grid container spacing={3}>
      {/* Choose Date */}
      {/* <Grid item xs={12} sm={6} md={4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Choose Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} fullWidth required />
            )}
          />
        </LocalizationProvider>
      </Grid> */}

      {/* Phone Number */}
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label="Phone Number"
          name="phoneno"
          value={searchParams.phoneno}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
          placeholder="Phone Number"
        />
      </Grid>

      {/* Name */}
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label="Name"
          name="name"
          value={searchParams.name}
          onChange={handleChange}
          fullWidth
          placeholder="Name"
        />
      </Grid>

      {/* Hallticket */}
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label="Hallticket"
          name="hallticket"
          value={searchParams.hallticket}
          onChange={handleChange}
          fullWidth
          required
          placeholder="Hallticket"
        />
      </Grid>

      {/* Student Rollno */}
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label="Student Rollno"
          name="studentrollno"
          value={searchParams.studentrollno}
          onChange={handleChange}
          fullWidth
          placeholder="Student Rollno"
        />
      </Grid>

      {/* Next Button */}
      <Grid item xs={12}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextClick}
          >
            Next
          </Button>
        </div>
      </Grid>
    </Grid>
      {/* Table Section */}
      {showTable && (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead >
              <TableRow sx={{backgroundColor:"#1976D2",color:"white"}}>
                <TableCell sx={{color:"white"}}>Student Roll Num</TableCell>
                <TableCell sx={{color:"white"}}>Student Name</TableCell>
                <TableCell sx={{color:"white"}}>Parent Name</TableCell>
                <TableCell sx={{color:"white"}}>Branch</TableCell>
                <TableCell sx={{color:"white"}}>Batch</TableCell>
                <TableCell sx={{color:"white"}}>College</TableCell>
                <TableCell sx={{color:"white"}}>Pay Fee</TableCell>
                <TableCell sx={{color:"white"}}>Services</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Example Row Data */}
              {studentData.length > 0 ? (
                 studentData.map((student, index) => (
            <TableRow key={index}>
              <TableCell>{student.studentrollno}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.fathername}</TableCell>
              <TableCell>{student.branchshortname}</TableCell>
              <TableCell>{student.batch}</TableCell>
              <TableCell>{student.brandname}</TableCell>
              <TableCell>
                <Button color="primary" onClick={() => handlePaidClick(student.studentrollno)}>
                  {/* {student.feeStatus} */} pay fee
                </Button>
              </TableCell>
              <TableCell>
                <Button color="primary"  onClick={() => handleOpenDialog(student)}>
                  Transport Fee/Route Change
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} align="center">
              No data available
            </TableCell>
          </TableRow>
        )}
              {/* Add more rows as needed */}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Payment Form Section */}
      {/* {showPaymentForm && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Fee Payment Details
          </Typography>
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
          <TableRow sx={{backgroundColor:"#1976D2",color:"white"}}>
              <TableCell  sx={{color:"white"}}>SELECT</TableCell>
              <TableCell  sx={{color:"white"}}>YEAR</TableCell>
              <TableCell  sx={{color:"white"}}>FEE NAME</TableCell>
              <TableCell  sx={{color:"white"}}>AMOUNT</TableCell>
              <TableCell  sx={{color:"white"}}>PAID</TableCell>
              <TableCell  sx={{color:"white"}}>DUE</TableCell>
              <TableCell  sx={{color:"white"}}>BEING PAYED</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectedRow}
                  onChange={handleCheckboxChange}
                />
              </TableCell>
              <TableCell>4</TableCell>
              <TableCell>Tuition Fee</TableCell>
              <TableCell>100000</TableCell>
              <TableCell>0</TableCell>
              <TableCell>100000</TableCell>
              <TableCell>
                <TextField
                  value={beingPaid}
                  onChange={handleBeingPaidChange}
                  fullWidth
                  disabled={!selectedRow}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Select Payment Type
      </Typography>
      <div style={{ display: "grid",
  placeItems: "center"}}>
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="payment-type"
          name="paymentType"
          value={paymentType}
          onChange={handlePaymentTypeChange}
        >
          <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
          <FormControlLabel value="DD" control={<Radio />} label="DD" />
          <FormControlLabel value="Cheque" control={<Radio />} label="Cheque" />
          <FormControlLabel value="EazyPay" control={<Radio />} label="EazyPay" />
        </RadioGroup>
      </FormControl>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body1">
          Total: {total}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
        </div>
        </div>
      )} */}
      {/* Payment Form Section */}
      {showPaymentForm && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Fee Payment Details
          </Typography>
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976D2", color: "white" }}>
                  <TableCell sx={{ color: "white" }}>SELECT</TableCell>
                  <TableCell sx={{ color: "white" }}>studentrollno</TableCell>
                  <TableCell sx={{ color: "white" }}>NAME</TableCell>
                  {/* <TableCell sx={{ color: "white" }}>branch</TableCell>
                  <TableCell sx={{ color: "white" }}>batch</TableCell> */}
                  <TableCell sx={{ color: "white" }}>feename</TableCell>
                  <TableCell sx={{ color: "white" }}>seattype</TableCell>
                  <TableCell sx={{ color: "white" }}>amount</TableCell>
                  <TableCell sx={{ color: "white" }}>paid</TableCell>
                  <TableCell sx={{ color: "white" }}>due</TableCell>
                  <TableCell sx={{ color: "white" }}>phoneno</TableCell>
                  <TableCell sx={{ color: "white" }}>paying Amount</TableCell>


                </TableRow>
              </TableHead>
              <TableBody>
                {feeDetails.map((fee, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox checked={selectedRow} onChange={handleCheckboxChange} />
                    </TableCell>
                    {/* <TableCell>{fee.year}</TableCell>
                    <TableCell>{fee.feeName}</TableCell>
                    <TableCell>{fee.amount}</TableCell>
                    <TableCell>{fee.paid}</TableCell>
                    <TableCell>{fee.due}</TableCell> */}
                     <TableCell>{fee.studentrollno}</TableCell>
                     <TableCell>{fee.name}</TableCell>
                     {/* <TableCell>{fee.branch}</TableCell>
                     <TableCell>{fee.batch}</TableCell> */}
                     <TableCell>{fee.feename}</TableCell>
                     <TableCell>{fee.seattype}</TableCell>
                     <TableCell>{fee.amount}</TableCell>
                     <TableCell>{fee.paid}</TableCell>
                     <TableCell>{fee.due}</TableCell>
                     <TableCell>{fee.phoneno}</TableCell>
                    <TableCell>
                    <TextField
                      value={fee.beingPaid || ''}
                      onChange={(e) => handleBeingPaidChange(e, index)}
                      fullWidth
                      error={!!amountError}
                      helperText={!amountError ? "enter amount below fee due " : "amount is grater than fee due" }
                    />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <br /> 
      <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
      <FormLabel component="legend">Select Payment Type</FormLabel>
      <RadioGroup row aria-label="payment-type" name="payment-type">
      <FormControlLabel value="cash" control={<Radio />} label="Cash" />
      <FormControlLabel value="dd" control={<Radio />} label="DD" />
      <FormControlLabel value="cheque" control={<Radio />} label="Cheque" />
      <FormControlLabel value="eazypay" control={<Radio />} label="EazyPay" />
      </RadioGroup>
      </FormControl>
      <div>
        {!amountError &&(
      <Button variant="contained" color="primary">Submit</Button>

        )}
      </div>
      </div>

        </div>
      )}
        {/* <TransportFeeDialog open={dialogOpen} onClose={handleCloseDialog} /> */}
    {/* Embedded TransportFeeDialog Code */}
     <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Transport Fee / Route Change</DialogTitle>
          <DialogContent>
            <Box mb={2} p={1} style={{ backgroundColor: '#FFF3CD', borderRadius: '5px' }}>
            <Typography variant="body2" color="textSecondary">
              🚨 Transport Fee / Route Change for {selectedStudent?.name} ({selectedStudent?.studentrollno})
            </Typography>
            </Box>
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">Pickup points *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Pickup points *"
                value={pickupPoint}
                onChange={handlePickupPointChange}
              >
                <MenuItem value="PUMP HOUSE">PUMP HOUSE</MenuItem>
                <MenuItem value="POINT A">POINT A</MenuItem>
                <MenuItem value="POINT B">POINT B</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Amount *"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              fullWidth
              margin="normal"
              placeholder="Enter amount"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
            <Button onClick={handleUpdate} color="primary">Update</Button>
          </DialogActions>
        </Dialog> 

        {/* Display Alert based on the message */}
        {alertMessage && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity={alertType}>
            {alertMessage}
          </Alert>
        </Stack>
      )}
          </Paper>
          </Layout>
  );
};

export default FeePaymentForm;
