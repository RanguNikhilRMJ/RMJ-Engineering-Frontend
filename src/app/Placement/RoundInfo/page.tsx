"use client"
import React from 'react';
import {Box,Typography,Container} from '@mui/material';
import Layout from '@/components/Sidemenu/Layout';
import CompanyRegistrationComponent from '@/components/pagescomponents/PlacementComponent/CompanyRegistrationComponent';
const HomePage: React.FC = () => {
  return (
<>
<Layout>

<Box display="flex" justifyContent="center" alignItems="center" mb={2}>
    <Box flexGrow={1} >
      <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>Company Registration Form</Typography>
      <Typography variant="body1" paragraph>
        Add the company name, package, and rounds for the company, then click "Save" to register the new company.
      </Typography>
</Box>
    </Box>
    <Container maxWidth="sm">
      <CompanyRegistrationComponent />
    </Container>
    </Layout>

</>
   
  );
};

export default HomePage;