"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { DIGITAL_CAMPUS_BASE_URL } from "@/modules/apiConfig";
const PublicationsConferenceForm: React.FC = () => {
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    authors: "",
    publicationdate: "",
    conference: "",
    volume: "",
    issue: "",
    pages: "",
    facultyid: "",
    conferencetype: "",
    issnnumber: "",
    doinumber: "",
    categorytype: "",
    verificationby: "",
    verifiedstatus: "",
    scopusurl: "",
    uploadfileurl: "",
  });

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleSubmit = async () => {
    console.log("Submitting form with data:", formData);

    if (!formData.title || !formData.authors || !formData.publicationdate || !formData.conference ||!formData.issnnumber ||!formData.doinumber ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("User is not authenticated.");
      return;
    }

    const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/publications/PublicationsConferenceUpdateorsave`;

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Publication submitted successfully!");
        setErrorMessage("");
        setFormData({
          id: 0,
          title: "",
          authors: "",
          publicationdate: "",
          conference: "",
          volume: "",
          issue: "",
          pages: "",
          facultyid: "",
          conferencetype: "",
          issnnumber: "",
          doinumber: "",
          categorytype: "",
          verificationby: "",
          verifiedstatus: "",
          scopusurl: "",
          uploadfileurl: "",
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to submit the publication.");
      }
    } catch (error: any) {
      setErrorMessage(`Error: ${error.message}`);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Submit Conference Publication
      </Typography>

      <Grid container spacing={2}>
        {/* First Row */}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Authors"
            name="authors"
            value={formData.authors}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            type="date"
            label="Publication Date"
            name="publicationdate"
            InputLabelProps={{ shrink: true }}
            value={formData.publicationdate}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Second Row */}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Conference"
            name="conference"
            value={formData.conference}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Volume"
            name="volume"
            value={formData.volume}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Issue"
            name="issnnumber"
            value={formData.issnnumber}
            onChange={handleChange}
          />
        </Grid>

        {/* Third Row */}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Pages"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Faculty ID"
            name="facultyid"
            value={formData.facultyid}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Conference Type"
            name="conferencetype"
            value={formData.conferencetype}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>

      {successMessage && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}
    </Box>
  );
};

export default PublicationsConferenceForm;
