import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

interface ScheduleItem {
  time: string;
  room: string;
  subject: string;
  type: string;
}

interface ScheduleTableProps {
  schedule: ScheduleItem[];
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedule }) => {
  return (
    <>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>Time</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>Room No.</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>Subject</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>Type</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule.map((item, index) => (
            <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
              <TableCell align="center">
                <Typography variant="body1" sx={{ color: '#555' }}>{item.time}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1" sx={{ color: '#555' }}>{item.room}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1" sx={{ color: '#555' }}>{item.subject}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1" sx={{ color: '#555' }}>{item.type}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ScheduleTable;
