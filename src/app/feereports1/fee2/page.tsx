// components/FeePaymentForm.tsx
"use client"
import React, { useState } from 'react';
import Layout from '@/components/Sidemenu/Layout';
import { Box, TextField, Checkbox, Button, FormGroup, FormControlLabel, RadioGroup, Radio, FormLabel, FormControl, TableBody, Table, TableContainer, TableCell, TableRow, TableHead, Typography, Paper,
} from '@mui/material';
 
const FeePaymentForm: React.FC = () => {
  const [showTable, setShowTable] = useState(false);

  const feeItems = [
  { id: 1, name: 'Books Fee' },
  { id: 2, name: 'JNTU FEE' },
  { id: 3, name: 'JNTUA Fee' },
  { id: 4, name: 'Miscellaneous Fee' },
  { id: 5, name: 'ReRegistration Fee' },
  { id: 6, name: 'Training Fee' },
  { id: 7, name: 'Tuition Fee' },
  ];
  const handleNextClick = () => {
    setShowTable(true);
  };
  return (
    <Layout>
      <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>
          Generate Student Timetable
      </Typography>
      <Typography variant="body1" paragraph>
          Easily generate your class timetable by selecting the academic year and semester. Once you've made your selections, click "Submit" to view and organize your schedule for the semester.
      </Typography>
      <Box sx={{ padding: 3 }}>
      <Box sx={{ marginBottom: 3 }}>
      <FormGroup row>
      <TextField
            label="Choose Date *"
            type="date"
            defaultValue="2024-08-31"
            InputLabelProps={{
                shrink: true
            }}
            sx={{ marginRight: 2 }}
      />
      <TextField label="Student Rollno" value="1La1to0460" sx={{ marginRight: 2 }} />
      {/* <TextField label="Manual Receipt No" sx={{ marginRight: 2 }} /> */}
      {/* <TextField label="Manual Receipt No" value="3" /> */}
      </FormGroup>
      </Box>
      <Button variant="contained" color="primary" sx={{ marginBottom: 3 }} onClick={handleNextClick}>Next</Button>
       <Typography variant="h6" sx={{ marginBottom: 2 }}>Fee Payment Details</Typography>
       {showTable && (

       <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
      <Table>
      <TableHead>
      <TableRow>
      <TableCell>Select</TableCell>
      <TableCell>Fee Name</TableCell>
      <TableCell>Amount</TableCell>
      <TableCell>Being Paid</TableCell>
      </TableRow>
      </TableHead>
      <TableBody>
            {feeItems.map((item) => (
            <TableRow key={item.id}>
            <TableCell>
            <Checkbox />
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>
            <TextField fullWidth />
            </TableCell>
            <TableCell>
            <TextField fullWidth />
            </TableCell>
            </TableRow>
               ))}
  </TableBody>
  </Table>
  </TableContainer>
       )}

<FormControl component="fieldset" sx={{ marginBottom: 3 }}>
<FormLabel component="legend">Select Payment Type</FormLabel>
<RadioGroup row aria-label="payment-type" name="payment-type">
<FormControlLabel value="cash" control={<Radio />} label="Cash" />
<FormControlLabel value="dd" control={<Radio />} label="DD" />
<FormControlLabel value="cheque" control={<Radio />} label="Cheque" />
<FormControlLabel value="eazypay" control={<Radio />} label="EazyPay" />
</RadioGroup>
</FormControl>
      <Button variant="contained" color="primary">Submit</Button>
</Box>
</Layout>
  );

};
 
export default FeePaymentForm;

 