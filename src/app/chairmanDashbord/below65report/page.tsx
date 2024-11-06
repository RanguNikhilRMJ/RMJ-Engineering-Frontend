"use client"
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Chip,
  Button,
  Paper,
} from "@mui/material";
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Layout from '@/components/Sidemenu/Layout'
import EditIcon from "@mui/icons-material/Edit";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { fetchCardDetailstoken } from "@/modules/apitoken";
import { DIGITAL_CAMPUS_BASE_URL } from "@/modules/apiConfig";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
interface Student {
  studentRollNo: string;
  name: string;
  percentage: number;
  noOfStudents: number;
}
const StudentList = () => {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
      gender: "female",
      status: "Enabled",
      academicYear: "2024",
    });
    
    // Initialize AllStudentsListBelow65 as an empty array
    const [AllStudentsListBelow65, setAllStudentsListBelow65] = useState<Student[]>([]);
  
    const ceofetchCourseOptions = async () => {
      try {
        const token = localStorage.getItem("token") || undefined;
        const username = localStorage.getItem("username");
        const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/studentslessthan65percentattendance`;
        const fetchedData = await fetchCardDetailstoken(apiEndpoint, "GET", null, token);
  
        // Check if fetchedData is an array, otherwise handle it
        if (Array.isArray(fetchedData)) {
          setAllStudentsListBelow65(fetchedData);
        } else {
          console.error("Fetched data is not an array:", fetchedData);
        }
  
        console.log(fetchedData);
      } catch (error) {
        console.error("Error fetching school options:", error);
      }
    };
  
    useEffect(() => {
      ceofetchCourseOptions();
    }, []);
  
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
                List of all students below 65% attendance
              </Typography>
              <div style={{ display: "flex", marginTop: "40px" }}>
                <Typography variant="body1" component="h2" style={{ color: "white" }}>
                  Total No of Students
                </Typography>
                <Typography variant="body1" component="h2" style={{ color: "white" }}>
                  -
                </Typography>
                <Typography variant="body1" component="h1" style={{ color: "white",fontWeight:"bold" }}>
                { AllStudentsListBelow65[0]?.noOfStudents || "N/A"}
                </Typography>
              </div>
            </div>
          </div>
  
          <div style={{ width: "90%", margin: "10% 0", position: "relative", borderRadius: "5px" }}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <TableContainer component={Paper}>
              <Table>
                  <TableHead style={{ backgroundColor: "rgb(46, 32, 59)" }}>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold",textAlign:"center" }}>Name</TableCell>
                      <TableCell style={{ fontWeight: "bold",textAlign:"center" }}>Year</TableCell>
                      <TableCell style={{ fontWeight: "bold",textAlign:"center" }}>Percentage</TableCell>
                      <TableCell style={{ fontWeight: "bold",textAlign:"center" }}>Profile</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {AllStudentsListBelow65.map((student,index) => (
                      <TableRow key={index}>
                        <TableCell style={{textAlign:"center"}}>{student.name}</TableCell>
                        <TableCell style={{textAlign:"center"}}>{student.studentRollNo}</TableCell>
                        <TableCell style={{textAlign:"center"}}>{student.percentage}</TableCell>
                        <TableCell style={{textAlign:"center"}}>
                          <IconButton color="primary">
                            <Link href="/dashbord3" target="_blank" rel="noopener noreferrer">
                              <RemoveRedEyeIcon sx={{color:"#919191"}} />
                            </Link>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
      </Layout>
    );
  };
  
  export default StudentList;
  