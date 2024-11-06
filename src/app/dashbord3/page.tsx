"use client";
import React from "react";
import { Grid, Paper, Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import ScheduleTable from "@/components/dashbord3components/profile";
import StudentDetails from "@/components/dashbord3components/StudentDetails";
import Announcements from "@/components/dashbord3components/Announcements";
import ProgressCard from "@/components/dashbord3components/ProgressCard";
import Layout from '@/components/Sidemenu/Layout'
interface Student1 {
  studentrollno: string;
  name: string;
  fatherName: string;
  branch:string;
  batch:string;
  image:string;
}
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G"];

const studentData: Student1 = {
  image: "https://via.placeholder.com/150",
  name: "John Doe",
  fatherName: "Richard Doe",
  branch: "Computer Science",
  studentrollno: "123456",
  batch:'2024',
};

const scheduleData = [
  { time: "09-10 AM", room: "34-604", subject: "DBMS130", type: "Tutorial" },
  { time: "10-11 AM", room: "34-604", subject: "DBMS130", type: "Lecture" },
  { time: "01-02 PM", room: "33-309", subject: "MTH166", type: "Lecture" },
];

const announcementsData = [
  {
    category: "Academic",
    description: "Summer training internship with Live Projects.",
    timeAgo: "2 Minutes Ago",
  },
  {
    category: "Co-curricular",
    description: "Global internship opportunity by Student organization.",
    timeAgo: "10 Minutes Ago",
  },
  {
    category: "Examination",
    description: "Instructions for Mid Term Examination.",
    timeAgo: "Yesterday",
  },
];

const CustomGrid = () => {
  return (
    <>
        <Layout>

    <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: "rgb(253, 249, 241)" }}>
      <Grid container spacing={3}>
        {/* First Main Column */}
        <Grid item xs={8}>
          <Grid container spacing={3}>
            {/* First Row of the First Main Column */}
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {/* First Column with Two Rows and Two Columns */}
                <Grid item xs={6}>
                  <Grid container spacing={3} style={{ height: "60vh" }}>
                    <Grid item xs={6}>
                      <Paper
                        sx={{
                          height: "27vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 3,
                          backgroundColor: "#ffffff",
                          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <ProgressCard
                          subject="Fee Due"
                          score="12/14"
                          percentage={86}
                          date="Last month"
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper
                        sx={{
                          height: "27vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 3,
                          backgroundColor: "#ffffff",
                          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <ProgressCard
                          subject="Attendance"
                          score="12/14"
                          percentage={86}
                          date="Last month"
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper
                        sx={{
                          height: "27vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 3,
                          backgroundColor: "#ffffff",
                          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <ProgressCard
                          subject="Backlogs"
                          score="12/14"
                          percentage={86}
                          date="Last month"
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper
                        sx={{
                          height: "27vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 3,
                          backgroundColor: "#ffffff",
                          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            color: "#3f51b5",
                          }}
                        >
                          Career Support
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Second Column in the First Row */}
                <Grid item xs={6}>
                  <Paper
                    sx={{
                      height: "57vh",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: 2,
                      borderRadius: 3,
                      backgroundColor: "#ffffff",
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Announcements announcements={announcementsData} />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            {/* Second Row of the First Main Column */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  height: "35vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 3,
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <ScheduleTable schedule={scheduleData} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Second Main Column */}
        <Grid item xs={4}>
          <Grid container spacing={3} direction="column">
            {/* Student Details */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  height: "20vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 3,
                  backgroundImage:
                    'url("https://s3-alpha-sig.figma.com/img/3919/ab65/d31e5d8dedad60c0c37d00468607d2eb?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k5LDnL4Se2FL3824ZRJJyvmRLdHvjF5OQMpfRY87-fRzCPTpfYh6euKB1gfaJnXP-PGzDTsxTmiIPWrseM2rOkRSts2Gj9aeqsSOqzvPm4-cF0PS~~1DJF87OARg05Q1qXqF7uA0sZVefEH80x-qftYW~eOyMG~psQyfPxtB-SXLMDfUhEd16AVb6LvUzw3fXfwviwoxxo8eJ44BhzNsmMn1wbhxGiOQuR2ePpFbkBXnkBi5WqcdgvLwAtEQ~1MY8kGQEXuyGYGVXBpZSaM4H5-F0uA6xlykUMjLHYYrdEWF7DTcrCt57LRdjUeiN9LHoYSmEHq2Xtnqx-RgY3jQ1w__")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <StudentDetails student={studentData} />
              </Paper>
            </Grid>

            {/* Bar Chart */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  height: "73vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 3,
                  borderRadius: 3,
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography variant="h4" gutterBottom style={{fontWeight:"bold"}}>
                  Performance Overview
                </Typography>
                <BarChart
                  xAxis={[{ scaleType: "band", data: xLabels }]}
                  series={[{ data: uData }, { data: pData }]}
                  height={300}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    </Layout>

    </>

  );
};

export default CustomGrid;
