"use client";
import React, { useState } from 'react';
import { Box, Typography, TextField, Container, MenuItem, Select, FormControl, InputLabel, Grid, Alert } from '@mui/material';
import Image from 'next/image';
import Layout from '@/components/Sidemenu/Layout';
import CustomButton from '@/utils/CustomButton';
import { fetchCardDetailstoken } from "@/modules/apitoken";
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';

function Page() {
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [issueDescription, setIssueDescription] = useState<string>('');
  const [roomNumber, setRoomNumber] = useState<string>('');
  const [assignedTo, setAssignedTo] = useState<string>('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [serverError, setServerError] = useState<string>('');

  const icons = [
    { link: '/plasting.png', name: 'Plastering' },
    { link: '/plumbing.png', name: 'Plumbing' },
    { link: '/carpentery.png', name: 'Carpentry' },
    { link: '/Electrical.png', name: 'Electrical' },
    { link: '/Ac.webp', name: 'Air conditioning' },
    { link: '/cleaning.png', name: 'Housekeeping' },
    { link: '/security.png', name: 'Security' },
  ];

  const branches = ['Block 1', 'Block 2', 'Block 3', 'Block 4'];

  const handleSelectBlock = (index: string) => {
    setSelectedBlock(index);
  };

  const handleSubmit = async () => {
    if (!selectedBlock || !selectedBranch || !issueDescription || !roomNumber || !assignedTo) {
      setAlertOpen(true);
      return;
    }
  
    const payload = {
      room: {
        block: {
          block_name: selectedBlock,
          orgid: 1,
          incharge: {
            orgid: 1,
            name: assignedTo,
            contactInfo: "NA",
          },
        },
        orgid: 1,
        roomNumber: parseInt(roomNumber, 10),
      },
      roomid: parseInt(roomNumber, 10),
      orgid: 1,
      issue_type: selectedBlock,
      description: issueDescription,
      reporteddate: new Date().toISOString().split("T")[0],
      status: "pending",
      resolveddate: "",
    };
  
    try {
      const token = localStorage.getItem("token") || undefined;
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/createinfraIssues`;
  
      const response = await fetchCardDetailstoken(apiEndpoint, "POST", payload, token);
  
      if (response) {
        // Clear form values and display success message
        setSelectedBlock(null);
        setSelectedBranch("");
        setIssueDescription("");
        setRoomNumber("");
        setAssignedTo("");
        setSuccessMessage("Issue submitted successfully!");
        setServerError("");
        setAlertOpen(false);
      } else {
        setServerError("Failed to submit the issue.");
        console.log("else executeed")
      }
    } catch (error: any) {
      setServerError(`Error: ${error.message}`);
      console.log("catch executeed")
    }
  };
  

  return (
    <>
      <Layout>
        <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>Select a Work:</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, flexWrap: "wrap" }}>
            {icons.map((block, index) => (
              <div key={index}>
                <Box
                  onClick={() => handleSelectBlock(block.name)}
                  sx={{
                    width: 100,
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: selectedBlock === block.name ? '#4caf50' : '#e0e0e0',
                    color: selectedBlock === block.name ? '#fff' : '#000',
                    border: '2px solid #ccc',
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                      backgroundColor: selectedBlock === block.name ? '#388e3c' : '#cfd8dc',
                    },
                  }}
                >
                  <Image src={block.link} width={100} height={100} alt={`${block.name} icon`} />
                </Box>
                <Typography variant="body2" sx={{ marginTop: 1 }}>{block.name}</Typography>
              </div>
            ))}
          </Box>
        </Container>

        <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>Enter Issues for Selected Work With Room Number:</Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Select Branch</InputLabel>
            <Select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              label="Select Branch"
            >
              {branches.map((branch, index) => (
                <MenuItem key={index} value={branch}>
                  {branch}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            variant="outlined"
            label="Room Number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Issue Description"
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Assigned To"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <Grid item xs={12} sm={6} md={4} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <CustomButton onClick={handleSubmit}>Submit</CustomButton>
          </Grid>

          {alertOpen && <Alert severity="warning">Please fill in all required fields.</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {serverError && <Alert severity="error">{serverError}</Alert>}

        </Container>
      </Layout>
    </>
  );
}

export default Page;