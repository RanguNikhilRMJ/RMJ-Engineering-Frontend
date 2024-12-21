"use client";
import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, Container } from "@mui/material";
import Layout from '@/components/Sidemenu/Layout';
import CompanyRegistrationComponent from '@/components/pagescomponents/PlacementComponent/CompanyRegistrationComponent';
import CompanyForm from '@/components/pagescomponents/PlacementComponent/AllCompanys';
import AppliedStudentsList from '@/components/pagescomponents/PlacementComponent/rounds'
const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0); // State to track the active tab

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue); // Update active tab
  }
  return (
<>
<Layout>

<Box display="flex" justifyContent="center" alignItems="center" mb={2}>
    <Box flexGrow={1} >
        {/* <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>Company Registration</Typography> */}
        
    </Box>
</Box>
{/* Tabs Section */}
<Box>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary" 
          >
            <Tab label="Post Company" sx={{ fontWeight: "bold" }}/>
            <Tab label="View All Companies" sx={{ fontWeight: "bold" }}/>
            <Tab label="Rounds" sx={{ fontWeight: "bold" }} />
          </Tabs>
        </Box>

        {/* Content Based on Active Tab */}
        <Box mt={4}>
          {activeTab === 0 && <CompanyRegistrationComponent />}
          {activeTab === 1 && <CompanyForm />}
          {activeTab === 2 && <AppliedStudentsList />}
        </Box>
    
      {/* <CompanyRegistrationComponent /> */}
    </Layout>

</>
   
  );
};

export default HomePage;