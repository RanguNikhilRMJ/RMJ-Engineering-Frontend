"use client"
import React from 'react';
import Layout from '@/components/Sidemenu/Layout'
import { Box, Typography } from '@mui/material';
import NotificationResultsTable from '@/components/reseults/NotificationResultsTable'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
export default function App() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabsData = [
    { 
      label: 'Item One', 
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo aperiam inventore labore nesciunt doloremque distinctio eligendi, corporis ipsum blanditiis facilis reprehenderit beatae consequatur voluptatum, exercitationem rem esse voluptas aspernatur dicta.', 
      value: '1' 
    },
    { label: 'Item Two', content: 'Item Two', value: '2' },
    { label: 'Item Three', content: 'Item Three', value: '3' },
  ];
  const examResults = [
    { sno: 1, notification: 'I M.TECH I SEM EXTERNAL EXAMINATION March 2024', resultStatus: 'Pass', details: 'Additional details about exam 1' },
    { sno: 2, notification: 'I M.TECH II Semester [R23] End Regular Examinations July 2024', resultStatus: 'Pass', details: 'Additional details about exam 2' },
  ];
    const midExamResults = [
      // 1st Year
      { sno: 1, notification: 'First Year, Semester 1' , details: 'Additional details about exam 1' },
      { sno: 2, notification: 'First Year, Semester 1' , details: 'Additional details about exam 2' },
      { sno: 3, notification: 'Second Year, Semester 1', details: 'Additional details about exam 3' },
      { sno: 4, notification: 'Second Year, Semester 2', details: 'Additional details about exam 4' },
      // 2nd Year
      { sno: 5, notification: 'Third Year, Semester 1', details: 'Additional details about exam 5' },
      { sno: 6, notification: 'Third Year, Semester 2', details: 'Additional details about exam 6' },
      { sno: 7, notification: 'Forth Year, Semester 1', details: 'Additional details about exam 7' },
      { sno: 8, notification: 'Forth Year, Semester 2', details: 'Additional details about exam 8' },
    ];
  return(
    <>
            <Layout>
            <Box sx={{ margin: 2 }}>
      <Typography variant="h5" component="h1" sx={{fontWeight:"bold"}} gutterBottom>
        Student Examination Results
      </Typography>
      <Typography variant="body1" paragraph>
      This table displays all the external exam results written by the student 
      </Typography>
    </Box>
        <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab  label="Comprehensive Semester Results"  value="1"  sx={{fontWeight:"bold"}} />
          <Tab label="Mid-Term Examination Results" value="2" sx={{fontWeight:"bold"}}   />
          </TabList>
        </Box>
        <TabPanel value="1">   
            <NotificationResultsTable results={examResults} />
            <br />
            <Typography variant="h5" component="h1" sx={{fontWeight:"bold"}} gutterBottom>
               Merks memo
             </Typography>
             <Typography variant="body1" paragraph>
              this table represent all the final results of the student
             </Typography>
            <NotificationResultsTable results={examResults} />

        </TabPanel >
        <TabPanel value="2">   
            <NotificationResultsTable results={midExamResults} />
        </TabPanel >

        </TabContext>
    </Box>

      {/* <TabLink tabs={tabsData} />; */}
      </Layout>

      
    </>
  )
}
