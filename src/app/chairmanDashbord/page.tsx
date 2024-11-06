"use client";
import React, { useState, useEffect } from "react";
import StatCard from "@/components/chairmanDashbordComponents/statcard";
import { Grid, Alert, Snackbar } from "@mui/material";
import AttendanceCard from "@/components/chairmanDashbordComponents/AttendanceCard";
import Layout from "@/components/Sidemenu/Layout";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { fetchCardDetailstoken } from "@/modules/apitoken";
import { DIGITAL_CAMPUS_BASE_URL } from "@/modules/apiConfig";
import Link from 'next/link'

const data = [
  {
    title: "Students",
    count: 1250,
    delta: "+2200",
    imageSrc: "student.png",
    trendColor: "skyblue",
    avatars: ["/path/to/avatar1.png", "/path/to/avatar2.png", "/path/to/avatar3.png"],
  },
  {
    title: "Teachers",
    count: 50,
    delta: "+340",
    imageSrc: "man.webp",
    trendColor: "orange",
    avatars: ["/path/to/avatar4.png", "/path/to/avatar5.png"],
  },
  {
    title: "Staff",
    count: 18000,
    delta: "+160",
    imageSrc: "https://kuwaitembassy.lk/wp-content/uploads/2019/09/agent-icon.jpg",
    trendColor: "red",
    avatars: [],
  },
];

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [NoofStudentsBelow65, setNoofStudentsBelow65] = useState(0);

  // Move ceofetchCourseOptions inside Dashboard component
  const ceofetchCourseOptions = async () => {
    try {
      setOpen(false);
      const token = localStorage.getItem("token") || undefined;
      const username = localStorage.getItem("username");
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/studentslessthan65percentattendance`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, "GET", null, token);
      console.log("fetchedData",fetchedData);
      setNoofStudentsBelow65(fetchedData[0].noOfStudents);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching school options:", error);
    }
  };

  useEffect(() => {
    ceofetchCourseOptions();
    const timer = setTimeout(() => {
      setOpen(false);
    }, 50000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "#ca2424",
            color: "#fff",
          },
        }}
      >
        <DialogTitle>
          <Typography style={{ fontWeight: "bold" }}>
          <span style={{fontSize:"20px"}}>{NoofStudentsBelow65} students have attendance below 65%.</span>  
            <br />
            <br />
            
            To view detaild report   <Button sx={{color:"white"}}> <Link href="/chairmanDashbord/below65report" >Click Here</Link> </Button>  
          </Typography>
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="text" style={{ color: "white" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Layout>
        <div style={{ backgroundColor: "#fdf9f1", margin: "0px", padding: "0px", height: "100vh" }}>
          <div style={{ margin: "16px" }}>
            <Grid container spacing={3}>
              {data.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <StatCard {...item} />
                </Grid>
              ))}
            </Grid>
          </div>
          <br />
          <br />
          <div style={{ margin: "16px" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <AttendanceCard
                  title="Student Attendance"
                  present={0}
                  absent={2227}
                  leave={0}
                  total={2227}
                  colors={["#4f9cf7", "#B3D4FC", "#555555"]}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <AttendanceCard
                  title="Teaching Staff Attendance"
                  present={0}
                  absent={248}
                  leave={0}
                  total={248}
                  colors={["#FF8C00", "#FF6347", "#ADD8E6"]}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <AttendanceCard
                  title="Support Staff Attendance"
                  present={0}
                  absent={14}
                  leave={0}
                  total={14}
                  colors={["#1E90FF", "#00BFFF", "#87CEFA"]}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
