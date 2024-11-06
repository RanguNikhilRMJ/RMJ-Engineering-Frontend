"use client"
import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import ProgressCard from "@/components/hostalComponents/ProgressCard";
import BacklogsTable from '@/components/hostalComponents/table';
import Layout from '@/components/Sidemenu/Layout';
import { fetchCardDetailstoken } from "@/modules/apitoken";
// import { DIGITAL_CAMPUS_BASE_URL } from "@/modules/apiConfig";
// const   ClasssData= [
//   { section: 'A', topic: 'Introduction to Programming', attendance: '2' },
//   { section: 'B', topic: 'Data Structures ', attendance: '18' },
//   { section: 'C', topic: '67890', attendance: '5' },
// ];
const Classheaders = ['Roll Number', 'Student Name', 'Year/Department','Block','Attendance Status'];
function Page() {
  const [allStudentfacifyData, setAllStudentfacifyData] = useState([]);
  const [hostelPrasentDataFa, setHostelPrasentDataFa] = useState([]);
  const [attendanceAbsentdata, setAttendanceAbsentdata] = useState([]);
  const [digitalCampusPrasentdata, setDigitalCampusPrasentdata] = useState([]);
  const [digitalCampusAbsentdata, setDigitalCampusAbsentdata] = useState([]);

  const columns = [
    { field: 'StudentRollNo', headerName: 'Roll Number', flex: 1 },
    { field: 'StudentName', headerName: 'Student Name', flex: 1 },
    { field: 'Year', headerName: 'Year', flex: 1 },
    { field: 'College', headerName: 'College', flex: 1 },
  ];

  const DigitalCampuscolumns = [
    { field: 'customRollNumber', headerName: 'Roll Number', flex: 1 },
    { field: 'studentName', headerName: 'Student Name', flex: 1 },
    { field: 'customHostelName', headerName: 'Block', flex: 1 },
    { field: 'attendanceStatus', headerName: 'attendanceStatus', flex: 1 },
  ];


  const ceofetchCourseOptions = async () => {
    try {
      const token = localStorage.getItem("token") || undefined;
      const apiEndpoint = `http://production.msmfclasses.com:8080/engineeringprojectfacify/facify/studentsFacifyData`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, "GET", null, token);

      // Ensure data is an array
      setAllStudentfacifyData(fetchedData)
      console.log(allStudentfacifyData)
    } catch (error) {
      console.error("Error fetching school options:", error);
      setAllStudentfacifyData([]); // Set empty array if there's an error
    }
  };
  const HostelPrasentDataFa = async () => {
    try {
      const token = localStorage.getItem("token") || undefined;
      const apiEndpoint = `http://production.msmfclasses.com:8080/engineeringprojectfacify/facify/HostelPrasentData`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, "GET", null, token);
      // Check if fetchedData is an array, then set it
      setHostelPrasentDataFa(fetchedData);
    } catch (error) {
      console.error("Error fetching school options:", error);
      setHostelPrasentDataFa([]); // Set empty array if there's an error
    }
  };
  const AttendanceAbsentdata = async () => {
    try {
      const token = localStorage.getItem("token") || undefined;
      const apiEndpoint = `http://production.msmfclasses.com:8080/engineeringprojectfacify/facify/AttendanceAbsentdata`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, "GET", null, token);

      // Check if fetchedData is an array, then set it
      setAttendanceAbsentdata(fetchedData);
    } catch (error) {
      console.error("Error fetching school options:", error);
      setAttendanceAbsentdata([]); // Set empty array if there's an error
    }
  };
  const DigitalCampusPrasentdata = async () => {
    try {
      const token = localStorage.getItem("token") || undefined;
      const apiEndpoint = `http://production.msmfclasses.com:8080/engineeringprojectfacify/facify/StudentsFilterData`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, "GET", null, token);
      // Check if fetchedData is an array, then set it
      setDigitalCampusPrasentdata(fetchedData);
    } catch (error) {
      console.error("Error fetching school options:", error);
      setDigitalCampusPrasentdata([]); // Set empty array if there's an error
    }
  };
  const DigitalCampusAbsentdata = async () => {
    try {
      const token = localStorage.getItem("token") || undefined;
      const apiEndpoint = `http://production.msmfclasses.com:8080/engineeringprojectfacify/facify/StudentsFilterAbsentData`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, "GET", null, token);
      // Check if fetchedData is an array, then set it
      setDigitalCampusAbsentdata(fetchedData);
    } catch (error) {
      console.error("Error fetching school options:", error);
      setDigitalCampusAbsentdata([]); // Set empty array if there's an error
    }
  };
  useEffect(() => {
    ceofetchCourseOptions();
    HostelPrasentDataFa();
    AttendanceAbsentdata();
    DigitalCampusPrasentdata();
    DigitalCampusAbsentdata();
  },[])

  return (
    <>
    <Layout>
    <Box sx={{ flexGrow: 1, padding: '16px' }}>
      <Grid
        container
        spacing={2}
        justifyContent={{ xs: "center", sm: "center", md: "flex-start" }}
      >
     
        <Grid item xs={12} sm={6} md={3}>
        <ProgressCard
              subject="Digital Campus"
              paragraph={<><strong style={{ color: 'green' }}>Present</strong> in Digital Campus</>}
              score={hostelPrasentDataFa.length}
              dialogData={hostelPrasentDataFa} // Pass your student data here
              columns={columns} // Pass the columns here
              iconColor ="green"
              />
        </Grid> 
         <Grid item xs={12} sm={6} md={3}>
        <ProgressCard
         subject="Digital Campus"
         paragraph={<><strong style={{ color: 'red' }}>Absent</strong> in Digital Campus</>}
         score={attendanceAbsentdata.length}
         dialogData={attendanceAbsentdata} // Pass your student data here
         columns={columns} // Pass the columns here
         iconColor ="red"
         />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ProgressCard
          subject="Faceify"
          paragraph={<><strong style={{ color: 'green' }}>Present</strong> in Faceify</>}
          score={digitalCampusPrasentdata.length}
          dialogData={digitalCampusPrasentdata} // Pass your student data here
          columns={DigitalCampuscolumns} // Pass the columns here
          iconColor ="green"
          />
        </Grid> 
        <Grid item xs={12} sm={6} md={3}>
          <ProgressCard
          subject="Faceify"
          paragraph={<><strong style={{ color: 'red' }}>Absent</strong> in Faceify</>}
          score={digitalCampusAbsentdata.length}
          dialogData={digitalCampusAbsentdata} // Pass your student data here
          columns={DigitalCampuscolumns} // Pass the columns here
          iconColor ="red"
          />
        </Grid> 
      </Grid>

      <Grid container sm={12} sx={{ padding: "50px 0px" }}>
      <Grid item md={12} sm={12} sx={{ padding: "50px 10px" }}>
      <BacklogsTable
      headers={Classheaders}
      data={allStudentfacifyData}
      hedding="List of All Hostal Students"
      subHedding="This table displays the list of all hostal atudents"
    />     
     </Grid>

        </Grid>
    </Box>
    </Layout>

    </>
  );
}

export default Page;
