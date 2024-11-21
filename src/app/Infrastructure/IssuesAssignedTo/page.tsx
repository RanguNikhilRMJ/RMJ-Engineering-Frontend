"use client"; // Ensure this is client-side only

import { Suspense, useState,useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Select, 
  MenuItem ,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  Grid,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import Layout from "@/components/Sidemenu/Layout";
import { fetchCardDetailstoken } from "@/modules/apitoken";
import { DIGITAL_CAMPUS_BASE_URL } from "@/modules/apiConfig";
import CustomButton from "@/utils/CustomButton";
import Image from 'next/image'

// Styled component for elevation
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f9f9f9",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: theme.shadows[3],
}));

// Issue interface for type safety
interface Issue {
  orgid: number;
  issueType: string;
  description: string;
  reportedDate: string;
  status: string;
  resolvedDate: string;
  issueId:any;
}

const StudentList = () => {
  const [search, setSearch] = useState("");
  const [loading] = useState(false);
  const [error] = useState("");
  const [pendingData, setPendingData] = useState<Issue[] | undefined>();
  const [selectedIssueType, setSelectedIssueType] = useState("");

  const fetchPendingData = async (status: string) => {
    try {
      const token = localStorage.getItem("token") || undefined;
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/organizationissues/status?status=${status}`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, "GET", null, token);

      if (Array.isArray(fetchedData)) {
        setPendingData(fetchedData);
      } else {
        console.error("Data is not an array");
        setPendingData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setPendingData([]);
    }
  };


  const handleDropdownChange = async (event: any) => {
    const issueType = event.target.value as string; // Get the selected value
    setSelectedIssueType(issueType); // Update state immediately
    try {
      const token = localStorage.getItem("token") || undefined;
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/organizationissues/issueType?issueType=${issueType}`; // Use issueType from event
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, "GET", null, token);
  
      if (Array.isArray(fetchedData)) {
        setPendingData(fetchedData); // Update state with fetched data
        console.log("Fetched data:", fetchedData); // Log to verify
      } else {
        console.error("Data is not an array");
        setPendingData([]); // Reset data if API response is invalid
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setPendingData([]); // Handle errors gracefully
    }
  };
  const handleResolveIssue  = async (issueid:any) => {
    const id =issueid
    try {
      const token = localStorage.getItem("token") || undefined;
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/organizationissues/resolveid?id=${id}`; // Use issueType from event
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, "PUT",null, token);
     console.log(fetchedData)
      if (fetchedData) {
        alert(fetchedData)
        fetchPendingData("Pending")
   
      } else {
        console.error("Data is not an array");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setPendingData([]); // Handle errors gracefully
    }
  }
  // Fetch data from API
  const fetchDigitalCampusAbsentData = async () => {
    try {
      const token = localStorage.getItem("token") || undefined;
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/infraIssuesview`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, "GET", null, token);

      // Check if fetchedData is an array, then set it
      if (Array.isArray(fetchedData)) {
        setPendingData(fetchedData);
      } else {
        console.error("Data is not an array");
        setPendingData([]); // Set empty array if the data format is incorrect
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setPendingData([]); // Set empty array if there's an error
    }
  };

  // Use useEffect to fetch data on component mount
  useEffect(() => {
    fetchDigitalCampusAbsentData();
  }, []);

  const paramValue = useSearchParams();
  console.log(paramValue.get("paramName"));

  return (
    <Layout>
      <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "97%",
            height: "300px",
            marginTop: "20px",
            borderRadius: "5px",
            background: "linear-gradient(to top,#9CECFB,  #3b51ff,#0052D4 )",
            zIndex: "-10",
            position: "absolute",
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <div>
            <Typography variant="h5" component="h2" style={{ color: "white" }}>
              Infrastructure Module
            </Typography>
            <div style={{ display: "flex", marginTop: "40px" }}>
              <Typography variant="body1" component="h2" style={{ color: "white" }}>
                Search to view the list of data
              </Typography>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "90%",
            backgroundColor: "red",
            margin: "10% 0",
            borderRadius: "5px",
          }}
        >
          <Paper elevation={3} style={{ padding: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
        <Select
          value={selectedIssueType || ""}
          onChange={handleDropdownChange}
          variant="outlined"
          size="small"
          displayEmpty
          style={{ minWidth: "200px" }}
        >
          <MenuItem value="" disabled>
            Select Issue
          </MenuItem>
          <MenuItem value="PLUMBING">PLUMBING</MenuItem>
          <MenuItem value="ELECTRICAL">ELECTRICAL</MenuItem>
          <MenuItem value="CARPENTRY">CARPENTRY</MenuItem>
          <MenuItem value="AC">AC</MenuItem>
        </Select>
              <div >
                <CustomButton onClick={() => fetchPendingData("Pending")} sx={{marginRight:"10px"}}>Pending</CustomButton>
                <CustomButton onClick={() => fetchPendingData("Resolved")}>Resolved</CustomButton>
              </div>
            </div>

            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                <CircularProgress />
              </Box>
            ) : error ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "60vh",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Something went wrong
                </Typography>
                <Typography variant="body1" color="error">
                  {error}
                </Typography>
              </Box>
            ) : pendingData && pendingData.length > 0 ? (
              <Grid item md={4} sm={12}>
                <TableContainer>
                  <Table>
                    <TableHead sx={{ backgroundColor: "rgb(46 32 59)", fontWeight: "bold" }}>
                      <TableRow>
                        <TableCell sx={{ color: "white" }}>SI No</TableCell>
                        <TableCell sx={{ color: "white" }}>Org ID</TableCell>
                        <TableCell sx={{ color: "white" }}>Issue Type</TableCell>
                        <TableCell sx={{ color: "white" }}>Description</TableCell>
                        <TableCell sx={{ color: "white" }}>Reported Date</TableCell>
                        <TableCell sx={{ color: "white" }}>Status</TableCell>
                        <TableCell sx={{ color: "white" }}>
                          {pendingData.some(issue => issue.status === "Pending") ? "Change Status" : ""}
                        </TableCell>
                        <TableCell sx={{ color: "white" }}>
                          {pendingData.some(issue => issue.status === "Pending") ? "" : "Resolved Date"}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pendingData.map((issue: Issue, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{issue.orgid}</TableCell>
                          <TableCell>{issue.issueType}</TableCell>
                          <TableCell>{issue.description}</TableCell>
                          <TableCell>
                            {issue.reportedDate ? new Date(issue.reportedDate).toLocaleDateString() : "-"}
                          </TableCell>
                          <TableCell>{issue.status}</TableCell>
                          <TableCell>
                            {/* Render the "Resolved" button only if the status is "Pending" */}
                            {issue.status === "Pending" && (
                              <button
                                style={{
                                  backgroundColor: "green",
                                  color: "white",
                                  border: "none",
                                  padding: "5px 10px",
                                  cursor: "pointer",
                                  borderRadius: "4px",
                                }}
                                onClick={() => handleResolveIssue(issue.issueId)} // Define this function
                              >
                                Resolve
                              </button>
                            )}
                          </TableCell>
                          <TableCell>
                            {issue.resolvedDate}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

            ) : (
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
                src="/nodata1.svg"
                width={300}
                    height={300}
                    alt="Picture of the author"
                  />
             
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Something went wrong
                </Typography>
                <Typography variant="body1" color="error">
                  something went wrong
                </Typography>
              </div>
            </Box>
            )}
          </Paper>
        </div>
      </div>
    </Layout>
  );
};

export default function StudentListWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StudentList />
    </Suspense>
  );
}
