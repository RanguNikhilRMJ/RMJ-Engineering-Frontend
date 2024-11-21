"use client"
import React, { useEffect,useState } from "react";
import { Grid, Typography, Avatar, Box, Divider,Card } from '@mui/material';
import ResearchDiv from "@/components/FaceltyResearchDashbordComponents/ResearchDiv";
import Layout from '@/components/Sidemenu/Layout';
import { fetchCardDetailstoken } from "@/modules/apitoken";
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
const UserProfile = () => {
  const columns = [
    { field: "StudentRollNo", headerName: "Roll Number", flex: 1 },
    { field: "StudentName", headerName: "Student Name", flex: 1 },
    { field: "Year", headerName: "Year", flex: 1 },
    { field: "College", headerName: "College", flex: 1 },
  ];
 
  interface ResearchData {
    subject: string;
    score: number;
    keys: string[];
    dialogData: any; // Replace `any` with a specific type if possible
  }
  
  const [data, setData] = useState<ResearchData[]>([]);  
  const [dialogData, setDialogData] = useState<any[]>([]); // Replace `any` with a specific type if known
 
  const apiEndpoints = [
    `${DIGITAL_CAMPUS_BASE_URL}/publications/publicationprojectstatusviewfacultyId?facultyId=FAC123`, 
    `${DIGITAL_CAMPUS_BASE_URL}/publications/publicationproductviewfacultyId?facultyId=FAC001`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/publicationicttoolfacultyId?facultyId=FAC001`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/publicationfdpviewfacultyId?facultyId=FAC001`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/publicationfacultyid?facultyId=F123`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/publicationconsultantfacultyId?facultyId=FAC001`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/publicationSeminarsfacultyId?facultyId=faculty001`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/publicationGainingITfacultyId?facultyId=FAC12346`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/ResearchProjectfacultyId?facultyId=faculty001`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/PublicationsCourtfacultyId?facultyId=faculty001`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/PublicationsContentfacultyId?facultyId=faculty001`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/PublicationsConferencefacultyId?facultyId=faculty001`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/PublicationsChapterfacultyId?facultyId=faculty001`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/PublicationsCertificationfacultyId?facultyId=faculty001`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/PublicationsCertificationRegistrationfacultyId?facultyId=faculty001`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/PublicationsBookviewfacultyId?facultyId=faculty001`,
    `${DIGITAL_CAMPUS_BASE_URL}/publications/PublicationResearchOutcomefacultyId?facultyId=faculty001
 `,
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
 // Log each endpoint and its response
 responses.forEach(({ endpoint, data }, index) => {
  console.log(`API ${index + 1}: ${endpoint}`);
  console.log("Response:", data);
});
      // Process the responses to extract keys and send them to the component
      const updatedData = responses.map(({ endpoint, data }) => {
        const subject = endpoint.split("/publications/")[1].split("?")[0];
        const score = Array.isArray(data) ? data.length : 0;
        // Extracting the keys (fields) of the first object in the data array
        const keys = data.length > 0 ? Object.keys(data[0]) : [];
        return { subject, score, keys, dialogData: data }; // Pass keys to the component
      });
 
      setData(updatedData);
    } catch (error) {
      console.error("Error fetching one or more APIs:", error);
    }
  };
 
  useEffect(() => {
    fetchAllApis();
  }, []);
 
  const handleMoreClick = (dialogData: any) => {
    setDialogData(dialogData); // Set dialog data when the More button is clicked
  };
  return (
    <Layout>
    <Grid container spacing={2}>
      {/* Left Panel with ProgressCard components */}
      <Grid container item xs={8} spacing={2}>
      {data.map((item, index) => (    
        <Grid item xs={12} sm={6}  md={4} key={index}>
         <ResearchDiv
                subject={item.subject}
                score={item.score}
                dialogData={item.dialogData}
                columns={columns}
                keys={item.keys} // Passing the keys to the component
                iconColor="green"
              />  
        </Grid>  
      ))}  
    </Grid>  
 
      {/* Right Panel */}
      <Grid item xs={4}>
        <Card sx={{ padding: 2 }}>
          {/* Profile Picture and Details */}
          <Box display="flex" alignItems="center" flexDirection="column" mb={3}>
               {/* User ID */}
          <Typography variant="h6" fontWeight="bold" mb={2}>
            MSMF1AT003
          </Typography>
 
            <Avatar
              alt="User Profile"
              src="/path-to-user-image.jpg"
              sx={{ width: 120, height: 120, mb: 2, border: '2px solid #1976d2' }}
            />
 
            <Box textAlign="center">
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{ borderBottom: '2px solid', borderColor: 'primary.main', display: 'inline-block', pb: 0.5 }}
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
 
 