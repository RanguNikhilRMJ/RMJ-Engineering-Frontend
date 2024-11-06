"use client";
import React, { useState,useEffect} from 'react';
import { Grid, Button, Box } from '@mui/material';
import Collegedp from '@/components/dropdown/Collegedp';
import Coursedp from '@/components/dropdown/Coursedp';
import Academicyeardp from '@/components/dropdown/Academicyeardp';
import YearDp from '@/components/dropdown/YearDp';
import SemDp from '@/components/dropdown/SemDp';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
interface SelectedData {
  schoolId: string;
  courseId: string;
  acadamicid: string;
  sem: string;
  year: string;
}

interface Props {
  onSubmit: (data: SelectedData) => void;
}

const Adminfilter: React.FC<Props> = ({ onSubmit }) => {
  const [selectedData, setSelectedData] = useState<SelectedData>({
    schoolId: '',
    courseId: '',
    acadamicid: '',
    sem: '',
    year: '',
  });
  useEffect(() => {
    const usertype = localStorage.getItem('usertype');
    if (usertype === "ceo") {
    } else {
      ceofetchCourseOptions();
    }
  }, []);
  const ceofetchCourseOptions = async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const username = localStorage.getItem('username');
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/allEmployeeDetails`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
      const filteredstaff = fetchedData.filter((college: any) => college.employeid === username);
      const ebranchid1 = filteredstaff[0].branchid;
      const eorgid = filteredstaff[0].orgid;
      setSelectedData((prev) => ({
        ...prev,
        schoolId: eorgid,
      }));
      const apiEndpointbr = `${DIGITAL_CAMPUS_BASE_URL}/tblbranchdtls`;
      const fetchedDatabr = await fetchCardDetailstoken(apiEndpointbr, 'GET',null,token);
      const filteredbr = fetchedDatabr.filter((college: any) => college.branchid === ebranchid1);
      const ecourseid = filteredbr[0].courseid;
      setSelectedData((prev) => ({
        ...prev,
        courseId: ecourseid,
      }));
      const url = `${DIGITAL_CAMPUS_BASE_URL}/Acadamicyearview`;
      const academicData = await fetchCardDetailstoken(url, 'GET',null,token);
      const filteredacademic= academicData.filter((college: any) => college.orgid  === eorgid);
      const filteredacademic1= academicData.filter((college: any) => college.orgid  === eorgid && college.status==='Present');
      const eacadamicid = filteredacademic1[0].acadamicid;
      setSelectedData((prev) => ({
        ...prev,
        acadamicid: eacadamicid,
      }));
    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  };

  const handleOrgSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({ ...prev, schoolId: value }));
  };

  const handleCourseSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({ ...prev, courseId: value }));
  };

  const handleAcadamicIdSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({ ...prev, acadamicid: value }));
  };

  const handleYearSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({ ...prev, year: value }));
  };

  const handleSemSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({ ...prev, sem: value }));
  };

  const handleSubmit = () => {
    onSubmit(selectedData);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <Collegedp onSelectOrg={handleOrgSelect} selectedOrg={selectedData.schoolId} />
        </Grid>
        <Grid item xs={6} md={3}>
          <Coursedp onSelectcourse={handleCourseSelect} selectedcourse={selectedData.courseId} orgid={selectedData.schoolId} />
        </Grid>
        <Grid item xs={6} md={3}>
          <Academicyeardp onSelectacademic={handleAcadamicIdSelect} selectedacademic={selectedData.acadamicid} orgid={selectedData.schoolId} />
        </Grid>
        <Grid item xs={6} md={3}>
          <YearDp onSelectYear={handleYearSelect} selectedYear={selectedData.year} courseid={parseInt(selectedData.courseId)} />
        </Grid>
        <Grid item xs={6} md={3}>
          <SemDp onSelectSem={handleSemSelect} selectedSem={selectedData.sem} courseid={parseInt(selectedData.courseId)} />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Adminfilter;