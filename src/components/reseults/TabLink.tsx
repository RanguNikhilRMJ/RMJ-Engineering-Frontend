"use client";
import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';

type ExamDetails = {
  sno: number;
  notification: string;
  resultStatus: string;
  details: string;
};

type StudentDetails = {
  sno: number;
  name: string;
  cgpa: number;
  grade: string;
  passFail: string; // This can be 'Pass' or 'Fail'
};

const NotificationResultsTable: React.FC = () => {
  const results: ExamDetails[] = [
    {
      sno: 1,
      notification: 'Mid 1 - 1st Year 1st Sem',
      resultStatus: 'Pass',
      details: 'Additional details about exam 1',
    },
    {
      sno: 2,
      notification: 'Mid 1 - 1st Year 2nd Sem',
      resultStatus: 'Pass',
      details: 'Additional details about exam 2',
    },
    // Add more results as needed
  ];

  // Sample student data
  const studentData: StudentDetails[] = [
    { sno: 1, name: 'John Doe', cgpa: 8.5, grade: 'A', passFail: 'Pass' },
    { sno: 2, name: 'Jane Smith', cgpa: 7.8, grade: 'B', passFail: 'Pass' },
    { sno: 3, name: 'Alice Johnson', cgpa: 9.0, grade: 'A+', passFail: 'Pass' },
    { sno: 4, name: 'Bob Brown', cgpa: 6.5, grade: 'C', passFail: 'Fail' },
    { sno: 5, name: 'Charlie White', cgpa: 7.2, grade: 'B', passFail: 'Pass' },
  ];

  const [open, setOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<ExamDetails | null>(null);

  const handleClickOpen = (details: ExamDetails) => {
    setSelectedDetails(details);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDetails(null);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TableContainer>
        <Table aria-label="notification results table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#874CCC" }}>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>SNO</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>EXAM NOTIFICATION</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>RESULT STATUS</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((row) => (
              <TableRow key={row.sno}>
                <TableCell>{row.sno}</TableCell>
                <TableCell>{row.notification}</TableCell>
                <TableCell>{row.resultStatus}</TableCell>
                <TableCell>
                  <Button onClick={() => handleClickOpen(row)} color="primary">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for showing more details */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Exam Details</DialogTitle>
        <DialogContent>
          {selectedDetails && (
            <>
              <Typography variant="h6" gutterBottom>
                Student Results
              </Typography>
              <TableContainer>
                <Table aria-label="student results table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#874CCC" }}>
                      <TableCell sx={{ fontWeight: "bold", color: "white" }}>SNO</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "white" }}>Name of Student</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "white" }}>CGPA</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "white" }}>Grade</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "white" }}>Pass/Fail</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentData.map((student) => (
                      <TableRow key={student.sno}>
                        <TableCell>{student.sno}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.cgpa}</TableCell>
                        <TableCell>{student.grade}</TableCell>
                        <TableCell>{student.passFail}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotificationResultsTable;
