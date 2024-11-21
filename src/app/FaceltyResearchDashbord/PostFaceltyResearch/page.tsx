"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Typography, MenuItem, Select, Grid } from "@mui/material";
import { DIGITAL_CAMPUS_BASE_URL } from "@/modules/apiConfig";
import { fetchCardDetailstoken } from "@/modules/apitoken";

const PostPutHandler = () => {
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [method, setMethod] = useState<"POST" | "PUT">("POST");
  const [payload, setPayload] = useState<string>("{}");
  const [response, setResponse] = useState<any>(null);

  const apiEndpoints = [
    "/publications/publicationproductUpdateorsave",
    "/publications/Updateorsave",
    "/publications/PublicationsGainingITUpdateorsave",
    "/publications/PublicationsCourtUpdateorsave",
    "/publications/PublicationsContentUpdateorsave",
    "/publications/PublicationsConferenceUpdateorsave",
    "/publications/PublicationsChapterUpdateorsave",
    "/publications/PublicationsCertificationUpdateorsave",
    "/publications/PublicationsCertificationRegistrationUpdateorsave",
    "/publications/PublicationsBookUpdateorsave",
    "/publications/PublicationSeminarsUpdateorsave",
    "/publications/PublicationResearchProjectUpdateorsave",
    "/publications/PublicationResearchOutcomeUpdateorsave",
    "/publications/PublicationProjectStatusUpdateorsave",
    "/publications/PublicationICTToolsUpdateorsave",
    "/publications/PublicationFacultyAwardsUpdateorsave",
    "/publications/PublicationFDPUpdateUpdateorsave",
    "/publications/PublicationConsultancyUpdateorsave",
  ];

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token") || undefined;
      const fullUrl = `${DIGITAL_CAMPUS_BASE_URL}${apiEndpoint}`;

      const parsedPayload = JSON.parse(payload); // Ensure payload is valid JSON
      const result = await fetchCardDetailstoken(fullUrl, method, parsedPayload, token);
      setResponse(result);
    } catch (error) {
      console.error("Error submitting data:", error);
      setResponse({ error: "Failed to process the request. Check the console for details." });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        API POST/PUT Handler
      </Typography>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">Select API Endpoint:</Typography>
          <Select
            fullWidth
            value={apiEndpoint}
            onChange={(e) => setApiEndpoint(e.target.value)}
          >
            {apiEndpoints.map((endpoint, idx) => (
              <MenuItem value={endpoint} key={idx}>
                {endpoint}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1">Select Method:</Typography>
          <Select
            fullWidth
            value={method}
            onChange={(e) => setMethod(e.target.value as "POST" | "PUT")}
          >
            <MenuItem value="POST">POST</MenuItem>
            <MenuItem value="PUT">PUT</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <Typography variant="body1">Payload (JSON):</Typography>
      <TextField
        fullWidth
        multiline
        rows={6}
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        placeholder={`{ "key1": "value1", "key2": "value2" }`}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleSubmit}
        disabled={!apiEndpoint}
      >
        Submit
      </Button>

      {response && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Response:</Typography>
          <pre style={{ backgroundColor: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        </Box>
      )}
    </Box>
  );
};

export default PostPutHandler;
