"use client";
import React, { useState,useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
} from "@mui/material";
import Layout from "@/components/Sidemenu/Layout";
import CustomButton from "@/utils/CustomButton";
import { useRouter } from "next/navigation";
import { fetchCardDetailstoken } from "@/modules/apitoken";
import { DIGITAL_CAMPUS_BASE_URL } from "@/modules/apiConfig";

const TransferCertificateForm: React.FC = () => {
  const router = useRouter();
  const [rollNo, setRollNo] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showTC, setShowTC] = useState(false);
  const [studentData, setStudentData] = useState<any>(null); // To hold API response data
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  // Define state for each form field
  const [studentName, setStudentName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [selectedCaste, setSelectedCaste] = useState('');
  const [selectedReligion, setSelectedReligion] = useState('');
  const [dob, setDob] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [reasonForLeaving, setReasonForLeaving] = useState('');
  const [feesPaid, setFeesPaid] = useState(false);
  const [qualifiedForPromotion, setQualifiedForPromotion] = useState(false);
  const [dateLeft, setDateLeft] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [conduct, setConduct] = useState('');
  const [tcDate, setTcDate] = useState('');
  const [subGroup, setSubGroup] = useState('');
  const handleNext = async () => {
    if (rollNo) {
      try {
        const token = localStorage.getItem("token") || undefined;
        const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/studentOrganizationInfo?studentrollno=${rollNo}`;
        const data = await fetchCardDetailstoken(apiEndpoint, "GET", null, token);
        console.log(data.response)
        if (data && data.length > 0) {
          setStudentData(data); // Store the fetched data
          setShowForm(true);    // Show the next section if data is returned
          setErrorMessage("");  // Clear any previous error message
        } else {
          setStudentData(null); // Clear previous student data
          setErrorMessage("Roll No not found"); // Set error message if no data is returned
          setShowForm(false);   // Keep form hidden if no data is returned
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("An error occurred while fetching data. Please try again."); // Set generic error message on failure
        setShowForm(false); // Keep form hidden on error
      }
    }
  };
  useEffect(() => {
    if (studentData && studentData.length > 0) {
      console.log(studentData[0]); // Logs orgid when studentData is updated
    }
  }, [studentData]); 
  const handleSubmit  = async() => {
    // Validate required fields 
    if ( !reasonForLeaving || !feesPaid ||!qualifiedForPromotion ||!dateLeft ||!applicationDate|| !tcDate||!conduct||!subGroup) {
      console.log("Some required fields are missing.");
      return;
    }

    const payload = {
      // student_name: studentName,
      // father_name: fatherName,
      // caste: selectedCaste,
      // religion: selectedReligion,
      // dob,
      // admission_date: admissionDate,
      orgid:studentData[0].orgId,
      studentrollno:studentData[0].studentrollno,
      reason: reasonForLeaving,
      feedue: feesPaid ? "Yes" : "No",
      qualifiedforheigherclass: qualifiedForPromotion ? "Yes" : "No",
      dateofleft: dateLeft,
      dateofapplicationtransfer: applicationDate,
      conduct,
      dateofcertification: tcDate,
      subgroup: subGroup,
    };

    try {
      const token = localStorage.getItem("token") || undefined;
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/generate`;
      const response = await fetchCardDetailstoken(apiEndpoint, 'POST', payload, token);

      if (response.ok) {
        // alert("Transfer certificate submitted successfully!");
        console.log("Transfer certificate submitted successfully!");
        router.push(`/certificate/TransferCertificate/TC?studentrollno=${studentData[0].studentrollno}`);
      } else {
        console.error("Failed to submit transfer certificate");
        alert("Failed to submit transfer certificate");

        setShowForm(false); 
      }
    } catch (error:any) {
      alert("An error occurred while submitting. Please try again.");
      setShowForm(false); 
      console.error("Error submitting transfer certificate:", error.message);
    }
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Transfer Certificate
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
          <CustomButton onClick={handleNext}>Submit</CustomButton>
        </Paper>
        {showForm   && (
      //   <Paper style={{ padding: '20px', marginTop: '20px' }} elevation={3}>
      //   <Grid container spacing={3}>
      //       <Grid item xs={12} sm={6} md={4}>
      //       <TextField label="Student Name" variant="outlined" fullWidth required />
      //     </Grid>
      //     <Grid item xs={12} sm={6} md={4}>
      //     <TextField label="Father Name" variant="outlined" fullWidth required />
      //     </Grid>
      //     <Grid item xs={12} sm={6} md={4}>
      //     <TextField select label="Choose Caste" variant="outlined" fullWidth required>
      //         <MenuItem value="Caste1">Caste 1</MenuItem>
      //         <MenuItem value="Caste2">Caste 2</MenuItem>
      //         {/* Add more options as needed */}
      //       </TextField>
      //     </Grid>
      //     <Grid item xs={12} sm={6} md={4}>
      //     <TextField select label="Choose Religion" variant="outlined" fullWidth required>
      //         <MenuItem value="Religion1">Religion 1</MenuItem>
      //         <MenuItem value="Religion2">Religion 2</MenuItem>
      //         {/* Add more options as needed */}
      //       </TextField>
      //     </Grid>
      //     <Grid item xs={12} sm={6} md={4}>
      //     <TextField label="Date Of Birth (As per SSC)" variant="outlined" fullWidth required type="date" InputLabelProps={{ shrink: true }} />
      //     </Grid>
      //     <Grid item xs={12} sm={6} md={4}>
      //     <TextField label="Date Of Admission" variant="outlined" fullWidth required type="date" InputLabelProps={{ shrink: true }} />
      //     </Grid>
      //     <Grid item xs={12} sm={6} md={4}>
      //     <TextField label="Reasons of Leaving" variant="outlined" fullWidth required />
      //     </Grid>
      //     <Grid item xs={12} sm={6} md={4}>
      //     <FormControlLabel
      //         control={<Checkbox />}
      //         label="Whether the Student Has Paid All Fees Due to College?"
      //       />
      //     </Grid>
      //     <Grid item xs={12} sm={6} md={4}>
      //     <FormControlLabel
      //         control={<Checkbox />}
      //         label="Whether Qualified for Promotion for Higher Class?"
      //       />
      //     </Grid>
      //     <Grid item xs={12} sm={6} md={4}>
      //     <TextField label="Date on Which Student Left the College" variant="outlined" fullWidth required type="date" InputLabelProps={{ shrink: true }} />
      //     </Grid>
      //     <Grid item xs={12} sm={6} md={4}>
      //     <TextField label="Date on Which Application for Transfer Certificate was Made" variant="outlined" fullWidth required type="date" InputLabelProps={{ shrink: true }} />
      //     </Grid>
      //     <Grid item xs={12} sm={6} md={4}>
      //     <TextField select label="Choose Conduct" variant="outlined" fullWidth>
      //         <MenuItem value="Good">Good</MenuItem>
      //         <MenuItem value="Average">Average</MenuItem>
      //         <MenuItem value="Poor">Poor</MenuItem>
      //       </TextField>
      //     </Grid>
      //     <Grid item xs={12} sm={6} md={4}>
      //     <TextField label="Date of Transfer Certificate" variant="outlined" fullWidth required type="date" InputLabelProps={{ shrink: true }} />
      //     </Grid>
      //     <Grid item xs={12} sm={6} md={4}>
      //     <TextField label="Sub Group" variant="outlined" fullWidth />
      //     </Grid>
      //   </Grid>
      //   <CustomButton onClick={openTc}>Submit</CustomButton>
 
      // </Paper>
      <Paper style={{ padding: '20px', marginTop: '20px' }} elevation={3}>
      <Grid container spacing={3}>
        {/* Form fields with event handlers */}
        {/* <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Student Name"
            variant="outlined"
            fullWidth
            required
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Father Name"
            variant="outlined"
            fullWidth
            required
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Choose Caste"
            variant="outlined"
            fullWidth
            required
            value={selectedCaste}
            onChange={(e) => setSelectedCaste(e.target.value)}
          >
            <MenuItem value="Caste1">Caste 1</MenuItem>
            <MenuItem value="Caste2">Caste 2</MenuItem>
          </TextField>
        </Grid> */}
        {/* <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Choose Religion"
            variant="outlined"
            fullWidth
            required
            value={selectedReligion}
            onChange={(e) => setSelectedReligion(e.target.value)}
          >
            <MenuItem value="Religion1">Religion 1</MenuItem>
            <MenuItem value="Religion2">Religion 2</MenuItem>
          </TextField>
        </Grid> */}
        {/* <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Date Of Birth (As per SSC)"
            variant="outlined"
            fullWidth
            required
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </Grid> */}
        {/* <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Date Of Admission"
            variant="outlined"
            fullWidth
            required
            type="date"
            InputLabelProps={{ shrink: true }}
            value={admissionDate}
            onChange={(e) => setAdmissionDate(e.target.value)}
          />
        </Grid> */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Reasons of Leaving"
            variant="outlined"
            fullWidth
            required
            value={reasonForLeaving}
            onChange={(e) => setReasonForLeaving(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControlLabel
            control={<Checkbox checked={feesPaid} onChange={() => setFeesPaid(!feesPaid)} />}
            label="Whether the Student Has Paid All Fees Due to College?"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControlLabel
            control={<Checkbox checked={qualifiedForPromotion} onChange={() => setQualifiedForPromotion(!qualifiedForPromotion)} />}
            label="Whether Qualified for Promotion for Higher Class?"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Date on Which Student Left the College"
            variant="outlined"
            fullWidth
            required
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dateLeft}
            onChange={(e) => setDateLeft(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Date on Which Application for Transfer Certificate was Made"
            variant="outlined"
            fullWidth
            required
            type="date"
            InputLabelProps={{ shrink: true }}
            value={applicationDate}
            onChange={(e) => setApplicationDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Choose Conduct"
            variant="outlined"
            fullWidth
            value={conduct}
            onChange={(e) => setConduct(e.target.value)}
          >
            <MenuItem value="Good">Good</MenuItem>
            <MenuItem value="Average">Average</MenuItem>
            <MenuItem value="Poor">Poor</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Date of Transfer Certificate"
            variant="outlined"
            fullWidth
            required
            type="date"
            InputLabelProps={{ shrink: true }}
            value={tcDate}
            onChange={(e) => setTcDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Sub Group"
            variant="outlined"
            fullWidth
            value={subGroup}
            onChange={(e) => setSubGroup(e.target.value)}
          />
        </Grid>
      </Grid>
      <CustomButton onClick={handleSubmit}>Submit</CustomButton>
    </Paper>
      )}

    </Box>
    </Layout>

  );
};

export default TransferCertificateForm;
