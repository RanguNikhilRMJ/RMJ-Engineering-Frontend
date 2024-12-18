"use client"
import React from 'react';
import { Container } from '@mui/material';
import Layout from '@/components/Sidemenu/Layout';
import CompanyRegistrationComponent from '@/components/pagescomponents/PlacementComponent/CompanyRegistrationComponent';
const HomePage: React.FC = () => {
  return (
    <Layout>
<>
<Container maxWidth="sm">
      <CompanyRegistrationComponent />
    </Container>
</>
    </Layout>
   
  );
};

export default HomePage;