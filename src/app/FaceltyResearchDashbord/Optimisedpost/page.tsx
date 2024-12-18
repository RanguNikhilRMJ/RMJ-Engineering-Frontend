"use client";
import React, { useState } from "react";
import { Box, Button, Alert,Typography } from "@mui/material";
import AddPublicationDialog from "../../../components/publicationsComponents/Dynamiccomponents/AddPublicationDialog"; // Import the dialog component
import { DIGITAL_CAMPUS_BASE_URL } from "@/modules/apiConfig";
import Layout from '../../../components/Sidemenu/Layout'

const publications = [
  { name: "Publication Product", endpoint: "/publications/publicationproductUpdateorsave" },
  { name: "General Publications", endpoint: "/publications/Updateorsave" },
  { name: "IT Gaining Publications", endpoint: "/publications/PublicationsGainingITUpdateorsave" },
  { name: "Court Publications", endpoint: "/publications/PublicationsCourtUpdateorsave" },
  { name: "Content Publications", endpoint: "/publications/PublicationsContentUpdateorsave" },
  { name: "Conference Publications", endpoint: "/publications/PublicationsConferenceUpdateorsave" },
  { name: "Chapter Publications", endpoint: "/publications/PublicationsChapterUpdateorsave" },
  { name: "Certification Publications", endpoint: "/publications/PublicationsCertificationUpdateorsave" },
  { name: "Certification Registration", endpoint: "/publications/PublicationsCertificationRegistrationUpdateorsave" },
  { name: "Book Publications", endpoint: "/publications/PublicationsBookUpdateorsave" },
  { name: "Seminars Publications", endpoint: "/publications/PublicationSeminarsUpdateorsave" },
  { name: "Research Projects", endpoint: "/publications/PublicationResearchProjectUpdateorsave" },
  { name: "Research Outcomes", endpoint: "/publications/PublicationResearchOutcomeUpdateorsave" },
  { name: "Project Status", endpoint: "/publications/PublicationProjectStatusUpdateorsave" },
  { name: "ICT Tools", endpoint: "/publications/PublicationICTToolsUpdateorsave" },
  { name: "Faculty Awards", endpoint: "/publications/PublicationFacultyAwardsUpdateorsave" },
  { name: "FDP Updates", endpoint: "/publications/PublicationFDPUpdateUpdateorsave" },
  { name: "Consultancy", endpoint: "/publications/PublicationConsultancyUpdateorsave" },
];

function Page() {
  const [open, setOpen] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState("");
  const [publicationData, setPublicationData] = useState<{ [key: string]: string }>({});

  // State for error and success messages
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleClickOpen = (endpoint: string) => {
    setSelectedEndpoint(endpoint);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPublicationData({});
  };

  const handleSubmit = () => {
    console.log("Form submitted");
    handleClose();
  };

  return (
    <>
    <Layout>
      {/* Alert container */}
      {(errorMessage || successMessage) && (
        <Box
          sx={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1300,
          }}
        >
          {errorMessage && <Alert severity="error" variant="filled">{errorMessage}</Alert>}
          {successMessage && <Alert severity="success" variant="filled">{successMessage}</Alert>}
        </Box>
      )}
      <div style={{display:"flex",justifyContent:"center"}}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>
          Generate Bonafide Certificate
        </Typography>
        </div>
      {/* Publication cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {publications.map(({ name, endpoint }) => (
          <Box
            key={endpoint}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "#dcdcdc",
              maxWidth: "250px",
              margin: "20px",
              boxShadow: 3,
              flex: "1 1 30%",
              border: "1px solid black",
            }}
          >
            <h3>{name}</h3>
            <Button variant="contained" color="primary" onClick={() => handleClickOpen(endpoint)}>
              Add
            </Button>
          </Box>
        ))}
      </Box>

      <AddPublicationDialog
        open={open}
        handleClose={handleClose}
        selectedEndpoint={selectedEndpoint}
        publicationData={publicationData}
        setPublicationData={setPublicationData}
        handleSubmit={handleSubmit}
        endpointUrl={`${DIGITAL_CAMPUS_BASE_URL}${selectedEndpoint}`} // Dynamically pass the endpoint URL
        setErrorMessage={setErrorMessage} // Pass error setter
        setSuccessMessage={setSuccessMessage} // Pass success setter
      />
          </Layout>

    </>
  );
}

export default Page;
