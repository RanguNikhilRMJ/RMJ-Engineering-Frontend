"use client"
import React from 'react';
import CompanyForm from '@/components/pagescomponents/PlacementComponent/CompanyForm';
import { Container } from '@mui/material';
import Layout from '@/components/Sidemenu/Layout';
const HomePage: React.FC = () => {
  return (
    <Layout>
<>
<Container maxWidth="sm">
      <CompanyForm />
    </Container>
</>
    </Layout>
   
  );
};

export default HomePage;