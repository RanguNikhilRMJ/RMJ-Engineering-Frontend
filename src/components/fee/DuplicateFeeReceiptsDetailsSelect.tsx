import React from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

interface FormData {
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
}

interface Props {
  formData: FormData;
}

const DuplicateFeeReceiptsDetailsSelect: React.FC<Props> = ({ formData }) => {
  const data = [
    { receiptNo: 'GPCET/201816655', date: '23/04/2021', amount: 20000 },
    { receiptNo: 'GPCET/201818518', date: '31/07/2021', amount: 20000 },
    { receiptNo: 'GPCET/201823472', date: '03/12/2021', amount: 20000 },
    { receiptNo: 'GPCET/201827210', date: '24/03/2022', amount: 20000 },
    { receiptNo: 'GPCET/201829842', date: '12/05/2022', amount: 20000 },
    { receiptNo: 'GPCET/201831434', date: '10/06/2022', amount: 20000 },
  ];

  return (
    <Box className="p-4 bg-white shadow-md rounded-md">
      <Typography variant="h6" component="h2" className="mb-4">
        Duplicate Fee Receipts Details
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Receipt No</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.receiptNo}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>
                <Button variant="text" color="primary">
                  Select
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default DuplicateFeeReceiptsDetailsSelect;
