"use client"
import React from 'react';
import {Box,Typography} from '@mui/material';
import StudentinterviewperComponent from '@/components/pagescomponents/PlacementComponent/StudentinterviewperComponent';
import PageTitle from '@/components/PageTitle';
import Layout from '@/components/Sidemenu/Layout';
const HomePage: React.FC = () => {
  return (
    <>
 <Layout>
 <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <Box flexGrow={1} >
      <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>Student Interivew Details</Typography>
                <Typography variant="body1" paragraph>
                    Easily enter your class Course Objectives by selecting the academic year and semester. Once you've made your selections, click "Submit" to view and organize your schedule for the semester.
                </Typography>
      </Box>
    </Box>
<PageTitle title='Student Interview Performance' />
<StudentinterviewperComponent />
    </Layout>
</>      
  );
};
export default HomePage;