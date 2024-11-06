"use client";

import React from 'react';
import Adminfilter from '@/components/pagescomponents/Adminfilter';
import { Grid, Button, AlertColor,useMediaQuery,IconButton,Paper,styled,tableCellClasses,Table,TablePagination,Box,CardContent,Card,CardActions,Typography,TableBody,TableCell,TableContainer,TableHead,TableRow,Dialog,DialogActions,DialogTitle,DialogContent,DialogContentText } from '@mui/material';
import Layout from '@/components/Sidemenu/Layout';
import PageTitle from "@/components/PageTitle";
interface SelectedData {
  schoolId: string;
  courseId: string;
  acadamicid: string;
  sem: string;
  year: string;
}

const ParentPage: React.FC = () => {
  const handleFormSubmit = (data: SelectedData) => {
    console.log('Selected Data:', data);
    // Perform any action with the submitted data
  };

  return (
    <>
<Layout>
<PageTitle title='Attendance Block'/>
<Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <Box flexGrow={1} >
      <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>
                   Attendance Block
                </Typography>
                <Typography variant="body1" paragraph>
                   Block Attendance for mid exam timing or any events for the selected school, course, academic year and semester.
                </Typography>      </Box>
    </Box>
      <Adminfilter onSubmit={handleFormSubmit} />
</Layout>
     
    </>
  );
};

export default ParentPage;