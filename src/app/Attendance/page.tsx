// src/components/Timetable.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from '@mui/material';

const Timetable: React.FC = () => {
    // src/data/timetableData.ts
 const timetableData = [
    {
      day: "Monday",
      classes: [
        { time: "9:00 AM", subject: "Mathematics" },
        { time: "10:00 AM", subject: "Physics" },
        { time: "11:00 AM", subject: "Chemistry" },
      ],
    },
    {
      day: "Tuesday",
      classes: [
        { time: "9:00 AM", subject: "English" },
        { time: "10:00 AM", subject: "Biology" },
        { time: "11:00 AM", subject: "History" },
      ],
    },
    // Add more days and classes as needed...
  ];
  
  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        Teacher Timetable
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center"><strong>Day</strong></TableCell>
            <TableCell align="center"><strong>Time</strong></TableCell>
            <TableCell align="center"><strong>Subject</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timetableData.map((dayData, index) => (
            <React.Fragment key={index}>
              {dayData.classes.map((classData, idx) => (
                <TableRow key={idx}>
                  {idx === 0 && (
                    <TableCell align="center" rowSpan={dayData.classes.length}>
                      {dayData.day}
                    </TableCell>
                  )}
                  <TableCell align="center">{classData.time}</TableCell>
                  <TableCell align="center">{classData.subject}</TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Timetable;
