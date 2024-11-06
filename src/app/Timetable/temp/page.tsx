"use client";
import { useState } from 'react';
import { Typography, Grid, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Layout from '@/components/Sidemenu/Layout';
import CustomButton from '@/utils/CustomButton';
import axios from 'axios'; // Importing axios
import { DIGITAL_CAMPUS_BASE_URL } from "@/modules/apiConfig";
import Image from 'next/image'

function Page() {
    const [formData, setFormData] = useState({
        academicYear: "",
        semester: "",
    });
    const [showTable, setShowTable] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [pdfUrl, setPdfUrl] = useState(""); // State to hold PDF blob URL

    const handleChangeform = (e:any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (formData.academicYear && formData.semester) {
            setShowTable(true);
            setErrorMessage(""); // Clear any previous error
    
            try {
                const token = localStorage.getItem("token");
                const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/timetable/section?year=${formData.academicYear}&semester=${Number(formData.semester)}`;
                // Make the GET request using axios and include the Bearer token in the headers
                const response = await axios.get(apiEndpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Sending token in the headers
                    },
                    responseType: 'blob' // Ensure the response is treated as a Blob (PDF file)
                });
    
                // Check for a successful response
                if (response.status !== 200) {
                    throw new Error('Failed to fetch PDF');
                }
    
                // Convert the response to a blob and create a URL
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);
    
                // Set the PDF URL to state to display in an iframe
                setPdfUrl(url);
            } catch (error) {
                console.error('Error fetching PDF:', error);
                setErrorMessage('An error occurred while fetching the timetable.');
            }
        } else {
            setShowTable(false);
            setErrorMessage("An error has occurred. Please fill in the required fields.");
        }
    };

    return (
        <Layout>
            <Box sx={{ margin: 2 }}>
                <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>
                    Generate Student Timetable
                </Typography>
                <Typography variant="body1" paragraph>
                    Easily generate your class timetable by selecting the academic year and semester. Once you've made your selections, click "Submit" to view and organize your schedule for the semester.
                </Typography>

                <Grid container spacing={2}>
                    {/* Academic Year Dropdown */}
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Academic Year</InputLabel>
                            <Select
                                label="Academic Year"
                                name="academicYear"
                                value={formData.academicYear}
                                onChange={handleChangeform}
                            >
                                {Array.from({ length: 4 }, (_, i) => 1 + i).map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Semester Dropdown */}
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Semester</InputLabel>
                            <Select
                                label="Semester"
                                name="semester"
                                value={formData.semester}
                                onChange={handleChangeform}
                            >
                                <MenuItem value="1">1st Semester</MenuItem>
                                <MenuItem value="2">2nd Semester</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12} sm={6} md={4} sx={{ display: "flex", alignItems: "center" }}>
                        <CustomButton onClick={handleSubmit}>Submit</CustomButton>
                    </Grid>
                </Grid>

                {/* Error message display */}
                {errorMessage && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: "60vh",
                        }}
                    > 
                      <Image
                    src="/nodata.svg"
                    width={300}
                    height={300}
                    alt="Picture of the author"
                  />
                  <br />
                 <div style={{display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center"}}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        Something went wrong
                    </Typography>
                    <Typography variant="body1" color="error" >
                        {errorMessage}
                    </Typography>
                    </div>

                      
                      
                    </Box>
                )}
                {/* Display PDF in an iframe if pdfUrl is available */}
                {pdfUrl && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6">Timetable PDF:</Typography>
                        <iframe src={pdfUrl} width="100%" height="600px"></iframe>
                    </Box>
                )}
            </Box>
        </Layout>
    );
}

export default Page;
