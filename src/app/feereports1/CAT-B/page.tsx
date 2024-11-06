"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import { Box, Grid, FormControl, InputLabel, MenuItem, Select, Button, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from "@mui/material";
import Layout from '@/components/Sidemenu/Layout';
import axios from 'axios';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import { SelectChangeEvent } from '@mui/material';

interface Student1 {
  studentrollno: string;
  name: string;
  year: string;
  branch: string;
  brandname:string;
  amount1:number;
}
const CatBFeeForm: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    batch: '', // Renamed for batch
    acadamicid: '', // Now used for academic year
    branchid: '',
  });

  const [studentData, setStudentData] =  useState<Student1[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState<string | null>(null); // Token can be either a string or null
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        // Only run this on the client-side
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
      }
    }, []);
  // Updated handleChange to accept name as parameter
  const handleChange = (e: SelectChangeEvent<string>, name: string) => {
    setSearchParams({
      ...searchParams,
      [name]: e.target.value as string,
    });
  };

  const handleNextClick = async () => {
    console.log("hi")
    console.log("Search Params: ", searchParams); // Log to check search params

    try {
      const filteredParams = Object.fromEntries(
        Object.entries(searchParams)
          .filter(([_, value]) => value.trim() !== '')
          .map(([key, value]) => {
            const numericValue = Number(value); // Convert to number
            // Check if the value is a number and an integer
            return [key, !isNaN(numericValue) && Number.isInteger(numericValue) ? numericValue : value];
          })
      );
      

      const response = await axios.get(`${DIGITAL_CAMPUS_BASE_URL}/getByCatBFeeStructureListByParams`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: filteredParams,
      });
      console.log(response); // Log to see the response

      if (response.data.length > 0) {
        setStudentData(response.data);
        setShowTable(true);
        setShowPaymentForm(true);
        setError('');
      } else {
        setError('No user exists');
        setShowTable(false);
        setShowPaymentForm(false);
      }
    } catch (error:any) {
      console.error('Error fetching data', error.response || error.message); // Detailed error log
      setError('Error fetching data');
      setShowTable(false);
      setShowPaymentForm(false);
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
      <Box
        sx={{
          padding: 3,
          backgroundColor: "#fff",
          borderRadius: 2,
          margin: "auto",
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{ marginBottom: 2, fontWeight: "bold" }}
        >
          CAT-B Fee
        </Typography>

        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          {/* Row 1: Choose College, Academic Year, Course */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="college-label">Choose College *</InputLabel>
              <Select
                labelId="college-label"
                value="GPCET"
                label="Choose College *"
                disabled
              >
                <MenuItem value="GPCET">GPCET</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="academic-year-label">Choose Academic Year *</InputLabel>
              <Select
                labelId="academic-year-label"
                value={searchParams.acadamicid}
                label="Choose Academic Year *"
                onChange={(e) => handleChange(e, "acadamicid")} // Pass the name to handleChange
              >
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2025">2025</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="course-label">Choose Course *</InputLabel>
              <Select
                labelId="course-label"
                value="B.Tech"
                label="Choose Course *"
                disabled
              >
                <MenuItem value="B.Tech">B.Tech</MenuItem>
                <MenuItem value="M.Tech">M.Tech</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Row 2: Choose Department, Batch */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="department-label">Choose Department *</InputLabel>
              <Select
                labelId="department-label"
                value={searchParams.branchid}
                label="Choose Department *"
                onChange={(e) => handleChange(e, "branchid")}
              >
                <MenuItem value="1">Civil Engineering</MenuItem>
                <MenuItem value="1">Computer Science</MenuItem>
                <MenuItem value="1">Civil Science</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="batch-label">Choose Batch *</InputLabel>
              <Select
                labelId="batch-label"
                value={searchParams.batch}
                label="Choose Batch *"
                onChange={(e) => handleChange(e, "batch")}
              >
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Next Button */}
        <Grid item xs={12}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextClick} // Call the handleNextClick function on click
            >
              Next
            </Button>
          </div>
        </Grid>

        {/* Table Section */}
        {showPaymentForm && (
          <Box padding={2}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>SNO</TableCell>
                    <TableCell>STUDENT ROLLNO</TableCell>
                    <TableCell>STUDENT NAME</TableCell>
                    <TableCell>BRANCH</TableCell>
                    <TableCell>YEAR</TableCell>
                    <TableCell>AMOUNT</TableCell>
                    <TableCell>PAID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentData.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.studentrollno}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.branch}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          placeholder="Amount"
                          defaultValue={student.amount1 || ''}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box display="flex" justifyContent="flex-end" marginTop={2}>
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default CatBFeeForm;
