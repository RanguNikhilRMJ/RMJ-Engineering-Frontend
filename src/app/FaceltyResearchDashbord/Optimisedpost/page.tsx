"use client";
import React, { useState } from 'react';
import { Box, Button, Alert } from '@mui/material';
import AddPublicationDialog from '../../../components/publicationsComponents/Dynamiccomponents/AddPublicationDialog'; // Import the dialog component

const endpoints = [
  '/publications/publicationproductUpdateorsave',
  '/publications/Updateorsave',
  '/publications/PublicationsGainingITUpdateorsave',
  '/publications/PublicationsCourtUpdateorsave',
  '/publications/PublicationsContentUpdateorsave',
  '/publications/PublicationsConferenceUpdateorsave',
  '/publications/PublicationsChapterUpdateorsave',
  '/publications/PublicationsCertificationUpdateorsave',
  '/publications/PublicationsCertificationRegistrationUpdateorsave',
  '/publications/PublicationsBookUpdateorsave',
  '/publications/PublicationSeminarsUpdateorsave',
  '/publications/PublicationResearchProjectUpdateorsave',
  '/publications/PublicationResearchOutcomeUpdateorsave',
  '/publications/PublicationProjectStatusUpdateorsave',
  '/publications/PublicationICTToolsUpdateorsave',
  '/publications/PublicationFacultyAwardsUpdateorsave',
  '/publications/PublicationFDPUpdateUpdateorsave',
  '/publications/PublicationConsultancyUpdateorsave',
];

function Page() {
  const [open, setOpen] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [publicationData, setPublicationData] = useState<{ [key: string]: string }>({});
  
  // State for error and success messages
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleClickOpen = (endpoint: string) => {
    setSelectedEndpoint(endpoint);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPublicationData({});
  };

  const handleSubmit = () => {
    console.log("guiasdhavsdhgvgh");
    handleClose(); 
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {endpoints.map((endpoint) => (
          <Box
            key={endpoint}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: '#fff',
              maxWidth: '250px',
              margin: '20px',
              boxShadow: 3,
              flex: '1 1 30%',
            }}
          >
            <h3>Endpoint: {endpoint.split('/publications/')[1]}</h3>
            <Button variant="contained" color="primary" onClick={() => handleClickOpen(endpoint)}>
              Add
            </Button>
          </Box>
        ))}
      </Box>
      {/* Display alerts in the main page */}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <AddPublicationDialog
        open={open}
        handleClose={handleClose}
        selectedEndpoint={selectedEndpoint}
        publicationData={publicationData}
        setPublicationData={setPublicationData}
        handleSubmit={handleSubmit}
        endpointUrl={`http://production.msmfclasses.com:8081/engineeringv2${selectedEndpoint}`} // Dynamically pass the endpoint URL
        setErrorMessage={setErrorMessage}  // Pass error setter
        setSuccessMessage={setSuccessMessage}  // Pass success setter
      />
    </>
  );
}

export default Page;
