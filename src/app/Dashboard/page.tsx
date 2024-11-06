"use client"
import React,{useEffect,useState} from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SmallCard from '@/components/dashbordComponents/SmallCard';
import  FacultyDetails from '@/components/dashbordComponents/FacultyDetails'
import  AppraisalGrid from '@/components/dashbordComponents/apprisals'
import AttendanceTracking from '@/components/dashbordComponents/AttendanceTracking'
import Patents from "@/components/dashbordComponents/patents"
import BacklogsTable from '@/components/table/BacklogsTable';
import Layout from '@/components/Sidemenu/Layout'
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import TimeTableComponent from '@/components/dashbordComponents/TimeTableComponent';
import Menteeslist from '@/components/dashbordComponents/Menteeslist';
const Item = styled(Paper)(({ theme }) => ({
     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f9f9f9',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: theme.shadows[3], // Add this line to set elevation
  }));
 
 
  const backlogsData = [
    { name: 'Section', enrollment: '54321', backlogs: '2' },
    { name: 'Liam Patel', enrollment: '98765', backlogs: '18' },
    { name: 'Sophia Nguyen', enrollment: '67890', backlogs: '5' },
  ];
 
  const headers = ['Name', 'Enrollment', 'Backlogs'];
 
  const   ClasssData= [
    { section: 'A', topic: 'Introduction to Programming', attendance: '2' },
    { section: 'B', topic: 'Data Structures ', attendance: '18' },
    { section: 'C', topic: '67890', attendance: '5' },
  ];
  const Classheaders = ['Section', 'Topic', 'Attendance'];

 
export default function BasicGrid() {
    useEffect(() => {
    fetchClassView();
  }, []);
  const [employeename, setemployeename] = useState<string>('');
  const [designation, setdesignation] = useState<string>('');
  const [branchshortname, setbranchshortname] = useState<string>('');
  const [usertype, setusertype] = useState<string | null>(null);

  const fetchClassView = async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
        const username = localStorage.getItem('username');
        const usertype1 = localStorage.getItem('usertype');
        const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/allEmployeeDetails`;
        const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
        const filteredstaff = fetchedData.filter((college: any) => college.employeid === username);
        const eemployeename = filteredstaff[0].employeename;
        const designation = filteredstaff[0].designation;
        const ebranchid1 = filteredstaff[0].branchid;
        setemployeename(eemployeename);
        setdesignation(designation);
        setusertype(usertype1);
        const apiEndpointbr = `${DIGITAL_CAMPUS_BASE_URL}/tblbranchdtls`;
        const fetchedDatabr = await fetchCardDetailstoken(apiEndpointbr, 'GET',null,token);
        const filteredbr = fetchedDatabr.filter((college: any) => college.branchid ===  ebranchid1);
        const branchshortname1= filteredbr[0].branchshortname;
        const role = `${designation},${branchshortname1} ${usertype1}`;
        setbranchshortname(role);
    } catch (error) {
      console.error('Error fetching class data:', error);
    }
  };
  return (
    <>
    <Layout>
  <Box sx={{ flexGrow: 1, minHeight: '100vh',backgroundColor:"white"}}>
    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={3} >
        <Grid item xs={12} md={4}>
          <TimeTableComponent  hedding="Time Table"/>  
        </Grid>
        <Grid item  xs={12} md={4}>
          <Item>
          <AppraisalGrid/>
          </Item>
        </Grid>
        <Grid item  xs={12} md={4}>
          <Item>
          <FacultyDetails mentorName={employeename} designation={branchshortname}/>
          </Item>
          <Item style={{marginTop:"30px"}}>
            <SmallCard/>
          </Item>
        </Grid>
      </Grid>
    </Box>
    <div style={{marginTop:"1%"}}>
    <Grid container spacing={3}>
        <Grid item md={4} sm={12}>
        <BacklogsTable headers={headers} data={backlogsData} hedding="Backlogs" subHedding="View students with pending assignments or exams."/>
        </Grid>
        <Grid item md={4} sm={12}>
        <BacklogsTable headers={Classheaders} data={ClasssData}  hedding="Today's Class" subHedding="Attendance and completion status."/>
        </Grid>
        <Grid item md={4} sm={12}>
        <Menteeslist headers={Classheaders} hedding="Students List" subHedding="list of all Students."/>  
        </Grid>
      </Grid>  
    </div>
 
    {/* section 3 */}
    <div style={{marginTop:"5%"}}>
    <Grid container spacing={3}>
        <Grid item md={4} sm={12}>
          <Patents/>
        </Grid>
        <Grid item md={8} sm={12}>
            <AttendanceTracking/>
        </Grid>
   
      </Grid>  
    </div>
    {/* <h1>hjhjjbjkdddddddddddddddddddddddddddddddddddddddddddddddddddddbkh</h1> */}
    </Box>
    </Layout>
    </>
 
  );
}