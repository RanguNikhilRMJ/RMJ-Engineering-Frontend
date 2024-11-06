"use client"
import React, { useState } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, Typography, AppBar, Toolbar, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';

type ExamDetails = {
  sno: number;
  notification: string;
  resultStatus?: string; // Make this field optional
  details: string;
};

interface NotificationResultsTableProps {
  results: ExamDetails[];
}

const NotificationResultsTable: React.FC<NotificationResultsTableProps> = ({ results }) => {
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
    <Paper elevation={2}  sx={{ width: '100%', typography: 'body1' }}>
      <TableContainer>
        <Table aria-label="notification results table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgb(46 32 59)"}}>
              <TableCell sx={{ fontWeight: "bold", color: "white", minHeight: 20 }}>SNO</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white", minHeight: 20 }}>EXAM NOTIFICATION</TableCell>
              {results.some((row) => row.resultStatus) && (
                <TableCell sx={{ fontWeight: "bold", color: "white", minHeight: 20 }}>RESULT STATUS</TableCell>
              )}
              <TableCell sx={{ fontWeight: "bold", color: "white", minHeight: 20 }}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((row, index) => (
              <TableRow
                key={row.sno}
                sx={{
                  // backgroundColor: index % 2 === 0 ? 'rgba(135, 76, 204, 0.1)' : 'white', // Alternate row color
                  '&:hover': { backgroundColor: '#e9e9e9' }, // Hover effect
                }}
              >
                <TableCell sx={{ padding: '6px 16px', minHeight: 20 }}>{row.sno}</TableCell>
                <TableCell sx={{ padding: '6px 16px', minHeight: 20 }}>{row.notification}</TableCell>
                {row.resultStatus && (
                  <TableCell sx={{ padding: '6px 16px', minHeight: 20 }}>{row.resultStatus}</TableCell>
                )}
                <TableCell sx={{ padding: '6px 16px', minHeight: 20 }}>
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
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar sx={{ position: 'relative', backgroundColor: "black" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Close
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogTitle>Exam Details</DialogTitle>
        <DialogContent>
          {selectedDetails && (
            <>
                
                  <Typography variant="body1" paragraph>
                  This is the details report of your marks
                  </Typography>
                  <Paper elevation={2}  sx={{ width: '100%', typography: 'body1' }}>

              <TableContainer>
                <Table aria-label="student results table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#e9e9e9" }}>
                      <TableCell sx={{ fontWeight: "bold", color: "black" }}>SNO</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "black" }}>Name of Student</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "black" }}>CGPA</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "black" }}>Grade</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "black" }}>Pass/Fail</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>student.sno</TableCell>
                      <TableCell>student.name</TableCell>
                      <TableCell>student.cgpa</TableCell>
                      <TableCell>student.grade</TableCell>
                      <TableCell>student.passFail</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              </Paper >

            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper >
  );
};

export default NotificationResultsTable;
