// components/AttendanceTracking.tsx

import React, { useState } from 'react';

import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Tab,
  Tabs,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from '@mui/material';

interface AttendanceData {
  name: string;
  enrollment: string;
  attendance: string;
  colorClass: string;
}

const attendanceData: { [key: string]: AttendanceData[] } = {
  'less-65': [
    { name: 'John Doe', enrollment: '12345', attendance: '60%', colorClass: 'bg-red-200' },
    { name: 'Jane Smith', enrollment: '67890', attendance: '62%', colorClass: 'bg-yellow-200' },
    { name: 'Bob Johnson', enrollment: '13579', attendance: '63%', colorClass: 'bg-yellow-200' },
  ],
  'less-50': [
    { name: 'Alice Williams', enrollment: '24680', attendance: '48%', colorClass: 'bg-red-200' },
    { name: 'David Lee', enrollment: '97531', attendance: '45%', colorClass: 'bg-red-200' },
  ],
  'more-90': [
    { name: 'Sarah Connor', enrollment: '55555', attendance: '95%', colorClass: 'bg-green-200' },
    { name: 'Kyle Reese', enrollment: '66666', attendance: '92%', colorClass: 'bg-green-200' },
  ],
};

const AttendanceTracking: React.FC = () => {
  const theme = useTheme();

  const [tabValue, setTabValue] = useState('less-65');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Card   sx={{boxShadow: theme.shadows[3], backgroundColor:"#f9f9f9"   }}>
      <CardHeader
        title={<Typography variant="h5" color="text.primary" sx={{ fontWeight: 'bold' }} >Attendance Tracking</Typography>}
        subheader={<Typography variant="body2" color="text.secondary">Monitor student attendance.</Typography>}
      />
      <CardContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="attendance tabs">
            <Tab label="Less than 65%" value="less-65" />
            <Tab label="Less than 50%" value="less-50" />
            <Tab label="More than 90%" value="more-90" />
          </Tabs>
        </Box>
        {Object.keys(attendanceData).map((key) => (
          <TabPanel key={key} value={tabValue} index={key}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead style={{backgroundColor: "rgb(46 32 59)" }}>
                  <TableRow>
                    <TableCell sx={{fontWeight:"bold",color:"white"}}>Name</TableCell>
                    <TableCell sx={{fontWeight:"bold",color:"white"}}>Enrollment</TableCell>
                    <TableCell sx={{fontWeight:"bold",color:"white"}}>Attendance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceData[key].map((row) => (
                    <TableRow key={row.enrollment} className={row.colorClass}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.enrollment}</TableCell>
                      <TableCell>{row.attendance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        ))}
      </CardContent>
    </Card>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default AttendanceTracking;
