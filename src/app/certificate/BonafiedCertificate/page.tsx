"use client";
import React, { useState } from "react";
import BonafideCertificate from "@/components/certificate/BonafideCertificate";
import Layout from "@/components/Sidemenu/Layout";
import { Box, Grid, TextField, Typography, Paper } from "@mui/material";
import { fetchCardDetailstoken } from "@/modules/apitoken";
import { DIGITAL_CAMPUS_BASE_URL } from "@/modules/apiConfig";
import CustomButton from "@/utils/CustomButton";
import { useRouter } from "next/navigation";

const ExamplePage = () => {
  const router = useRouter();
  const [rollNo, setRollNo] = useState<string>("");
  const [certificateData, setCertificateData] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchBonafideData = async () => {
    if (!rollNo.trim()) {
      setErrorMessage("Roll number is required.");
      return;
    }
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token") || undefined;
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/getBonifiedCertificates?studentRollNo=${rollNo}`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, "GET", null, token);

      if (Array.isArray(fetchedData) && fetchedData.length > 0) {
        setCertificateData(fetchedData);
        router.push(`/certificate/BonafiedCertificate/bonafied?studentrollno=${rollNo}`);
      } else {
        setCertificateData([]);
        setErrorMessage("No certificate data found.");
      }
    } catch (error:any) {
      console.error("Error fetching data:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <Layout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>
          Generate Bonafide Certificate
        </Typography>
        <Paper style={{ padding: "20px", marginTop: "20px" }} elevation={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Student Roll No"
                variant="outlined"
                fullWidth
                required
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                error={!!errorMessage}
                helperText={errorMessage}
              />
            </Grid>
          </Grid>
          <br />
          <CustomButton onClick={fetchBonafideData}>Submit</CustomButton>
        </Paper>

        {certificateData === null ? null : certificateData.length > 0 ? (
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Certificate data successfully fetched. Redirecting...
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ marginTop: 2, color: "red" }}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Layout>
  );
};

export default ExamplePage;
