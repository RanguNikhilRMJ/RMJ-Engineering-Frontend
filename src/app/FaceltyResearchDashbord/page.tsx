"use client";
import React, { useEffect, useState } from "react";
import { Grid, Typography, Avatar, Box, Divider, Card } from "@mui/material";
import ResearchDiv from "@/components/FaceltyResearchDashbordComponents/ResearchDiv";
import Layout from "@/components/Sidemenu/Layout";
import { fetchCardDetailstoken } from "@/modules/apitoken";
import { DIGITAL_CAMPUS_BASE_URL } from "@/modules/apiConfig";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const UserProfile = () => {
  interface ResearchData {
    subject: string;
    score: number;
    keys: string[];
    dialogData: any;
  }

  const [data, setData] = useState<ResearchData[]>([]);

  // API endpoints
  const apiEndpoints = [
    `${DIGITAL_CAMPUS_BASE_URL}/publications/publicationprojectstatusviewfacultyId?facultyId=FAC123`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/publicationproductviewfacultyId?facultyId=FAC123`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/publicationicttoolfacultyId?facultyId=FAC123`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/publicationfdpviewfacultyId?facultyId=FAC123`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/publicationfacultyid?facultyId=FAC123`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/publicationconsultantfacultyId?facultyId=FAC123`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/publicationSeminarsfacultyId?facultyId=FAC123`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/publicationGainingITfacultyId?facultyId=FAC123`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/ResearchProjectfacultyId?facultyId=FAC123`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/PublicationsCourtfacultyId?facultyId=FAC123`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/PublicationsContentfacultyId?facultyId=FAC123`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/PublicationsConferencefacultyId?facultyId=FAC123`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/PublicationsChapterfacultyId?facultyId=FAC123`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/PublicationsCertificationfacultyId?facultyId=FAC123`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/PublicationsCertificationRegistrationfacultyId?facultyId=FAC123`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/PublicationsBookviewfacultyId?facultyId=FAC123`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/PublicationResearchOutcomefacultyId?facultyId=FAC123`,
  ];

  // Custom names for the endpoints
  const customNames = [
    "Project Status",
    "Product View",
    "ICT Tools",
    "FDP Views",
    "General Faculty Data",
    "Consultancy",
    "Seminars",
    "IT Skills",
    "Research Projects",
    "Court Publications",
    "Content Development",
    "Conferences",
    "Chapters",
    "Certifications",
    "Certification Registrations",
    "Books",
    "Research Outcomes",
  ];

  const fetchAllApis = async () => {
    const token = localStorage.getItem("token") || undefined;
    try {
      const responses = await Promise.all(
        apiEndpoints.map((endpoint) =>
          fetchCardDetailstoken(endpoint, "GET", null, token).then((data) => ({
            endpoint,
            data,
          }))
        )
      );

      const updatedData = responses.map(({ data }, index) => {
        const subject = customNames[index]; // Use custom name
        const score = Array.isArray(data) ? data.length : 0;
        const keys = data.length > 0 ? Object.keys(data[0]) : [];
        return { subject, score, keys, dialogData: data };
      });

      setData(updatedData);
    } catch (error) {
      console.error("Error fetching one or more APIs:", error);
    }
  };

  useEffect(() => {
    fetchAllApis();
  }, []);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid container item xs={8} spacing={2}>
          {data.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ResearchDiv
                subject={item.subject}
                score={item.score}
                dialogData={item.dialogData}
                columns={item.keys.map((key) => ({ field: key, headerName: key }))} // Dynamically generate columns
                keys={item.keys}
                putEndpoint={`${DIGITAL_CAMPUS_BASE_URL}/publications/PublicationsGainingITUpdateorsave`}
                swaggerFields={{
                  id: 0,
                  typeofcertificationprogram: "string",
                  certificationprogramtitle: "string",
                  certificationprogramduration: "string",
                  uploadcertificate: "string",
                  certificationprogram: "string",
                  certificationprogramamount: 0,
                  facultyid: "string",
                  certificationdate: "",
                  certificationtype: "string",
                  verificationby: "string",
                  verifiedstatus: "string",
                }}
              />
            </Grid>
          ))}
        </Grid>

        {/* Right Panel */}
        <Grid item xs={4}>
          <Card sx={{ padding: 2, backgroundColor: "#dcdcdc", border: "1px solid black" }}>
            <Box display="flex" alignItems="center" flexDirection="column" mb={3}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                MSMF1AT003
              </Typography>
              <Avatar
                alt="User Profile"
                src="/path-to-user-image.jpg"
                sx={{ width: 120, height: 120, mb: 2, border: "2px solid #1976d2" }}
              />
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    borderBottom: "2px solid",
                    borderColor: "primary.main",
                    display: "inline-block",
                    pb: 0.5,
                  }}
                >
                  About
                </Typography>
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                  Name: John Doe
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Role: Professor
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Phone: (123) 456-7890
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Email: johndoe@example.com
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" mt={2}>
              About: Experienced in research and teaching with contributions across various fields...
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default UserProfile;
