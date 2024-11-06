import React from 'react';
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Mock data as JSON
const jsonData = [
  {
    studentRollNo: "20AT1A0254",
    hallTicket: "9860030063",
    studentName: "Kudala Nikitha",
    parentName: "Kudala Sada Samba Siva Reddy",
    phoneNumber: "9381783699",
    college: "GPCET",
    branch: "EEE"
  },
  // Add more data as needed
];

interface DuplicateFeeReceiptsDetailsProps {
  onSelect: () => void;
}

const DuplicateFeeReceiptsDetails: React.FC<DuplicateFeeReceiptsDetailsProps> = ({ onSelect }) => {
  return (
    <Box className="p-4 bg-white shadow-md rounded-md">
      <Typography variant="h6" component="h2" className="mb-4">
        Duplicate Fee Receipts Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STUDENT ROLLNO</TableCell>
              <TableCell>HALLTICKET</TableCell>
              <TableCell>STUDENT NAME</TableCell>
              <TableCell>PARENT NAME</TableCell>
              <TableCell>PHONE NUMBER</TableCell>
              <TableCell>COLLEGE</TableCell>
              <TableCell>BRANCH</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jsonData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.studentRollNo}</TableCell>
                <TableCell>{data.hallTicket}</TableCell>
                <TableCell>{data.studentName}</TableCell>
                <TableCell>{data.parentName}</TableCell>
                <TableCell>{data.phoneNumber}</TableCell>
                <TableCell>{data.college}</TableCell>
                <TableCell>{data.branch}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={onSelect}>Select</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DuplicateFeeReceiptsDetails;
