import React from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CustomButton from '@/utils/CustomButton';

// Define period timings
const periodTimings = ['1', '2', '3', ' ', '4', '5', '6'];

const Timetable: React.FC<{ timetableData: any }> = ({ timetableData }) => {
  return (
    <Box>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
        <CustomButton
          startIcon={<DownloadIcon />}
          onClick={() => console.log('Download initiated!')}
          sx={{ marginBottom: "20px" }} // Additional styles if needed
        >
          Download
        </CustomButton>
      </div>

      {Object.keys(timetableData).map((section) => (
        <Box key={section} mb={4}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
            Section {section}
          </Typography>
          <Table style={{ borderWidth: "5px", borderStyle: "double", borderColor: "black" }}>
            <TableHead>
              <TableRow sx={{ borderWidth: "1.5px", borderColor: "gray" }}>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 'bold', borderRight: "1px solid black", fontFamily: 'Times New Roman' }}
                >
                  DAY
                </TableCell>
                {periodTimings.map((time, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{ fontWeight: 'bold', borderLeft: "1px solid black", fontFamily: 'Times New Roman' }}
                  >
                    {time}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(timetableData[section]).map((day) => {
                const classDetails = timetableData[section][day];

                return (
                  <TableRow key={day} sx={{ borderWidth: "2px", borderColor: "gray" }}>
                    <TableCell align="center" sx={{ fontWeight: 'bold', borderRight: "1px solid black", fontFamily: 'Times New Roman' }}>
                      {day}
                    </TableCell>
                    
                    {/* First half of the periods */}
                    {periodTimings.slice(0, 3).map((periodTime, idx) => {
                      // const classDetail = classDetails.find(item => item.period);
                      // {console.log(classDetails[idx].period)}
                      return (
                        <TableCell key={idx} align="center" sx={{ borderLeft: "1px solid black", borderRight: "1px solid black" }}>
                          {classDetails ? (
                            <div>
                              <strong>{classDetails[idx].subject}</strong><br />
                              {classDetails[idx].instructor}
                            </div>
                          ) : (
                            <div>No Class</div>
                          )}
                        </TableCell>
                      );
                    })}

                    {/* Vertical Lunch Break bar - only in the first row */}
                    {day === Object.keys(timetableData[section])[0] && (
                      <TableCell
                        align="center"
                        sx={{ fontWeight: 'bold', borderLeft: "1px solid black", borderRight: "1px solid black", fontFamily: 'Times New Roman' }}
                        rowSpan={Object.keys(timetableData[section]).length}
                      >
                        Lunch Break
                      </TableCell>
                    )}

                        {/* Second half of the periods (Periods 4-6) */}
                    {periodTimings.slice(4).map((periodTime, idx) => {
                      return (
                        <TableCell key={idx} align="center" sx={{ borderLeft: "1px solid black", borderRight: "1px solid black" }}>
                          {classDetails && classDetails[idx + 3] ? (
                            <div>
                              <strong>{classDetails[idx + 3].subject}</strong><br />
                              {classDetails[idx + 3].instructor}
                            </div>
                          ) : (
                            <div>No Class</div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      ))}
    </Box>
  );
};

export default Timetable;
