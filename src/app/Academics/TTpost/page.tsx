"use client"
import React, { useState, useEffect } from 'react';
import Collegedp from '@/components/dropdown/Collegedp';
import Coursedp from '@/components/dropdown/Coursedp';
import SemDp from '@/components/dropdown/SemDp';
import YearDp from '@/components/dropdown/YearDp';
import Departmentdp from '@/components/dropdown/Departmentdp';
import SectionDp from '@/components/dropdown/SectionDp';
import { Grid, Button, AlertColor,Box,Typography,FormLabel,Radio,RadioGroup,FormControlLabel,FormControl } from '@mui/material';
import CustomSnackbar from "@/components/CustomSnackbar";
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import Academicyeardp from '@/components/dropdown/Academicyeardp';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider,DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import REgSubjectdp from '@/components/dropdown/REgSubjectdp';
import DayNameDpComponent from '@/components/dropdown/DayNameDpComponent';
import Periodsdp from '@/components/dropdown/Periodsdp';
import TimetableComponent from '@/components/pagescomponents/TimetableComponent';
import PageTitle from "@/components/PageTitle";
import Layout from '@/components/Sidemenu/Layout';
import TTBatchdp from '@/components/dropdown/TTBatchdp';
interface Classfilter {
    id:string;
    orgid: number;
    courseid: number;
    sem: number;
    year: number;
    acadamicid :number;
    type:string;
  }
interface SelectedData {
  schoolId: string;
  courseId: string;
  year: string;
  sem: string;
  branch: string;
  section: string;
  acadamicid:string;
  type: string;
  wef:string;
}

const ClassComponent: React.FC = () => {
  const [selectedData, setSelectedData] = useState<SelectedData>({
    schoolId: '',
    courseId: '',
    year: '',
    sem: '',
    branch: '',
    section: '',
    acadamicid:'',
    type: '',
    wef:'',
  });

  const [datatype, setdatatype] = useState<string>('');
  const [dataclone, setdataclone] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [Message, setMessage] = useState<string | null>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('error');
  const [subjectcode, setsubjectcode] = useState<string>('');
  const [tdayname, setdayname] = useState<string>('');
  const [tperiod, setperiod] = useState<string>('');
  const [tfromdate, settfromdate] = useState<string>('');
  const [tenddate, settenddate] = useState<string>('');
  const [ttbatch, setttbatch] = useState<string>('');
  const [formData, setFormData] = useState({
    fromDate: '',
    endDate: '',
    dayName: '',
    acadamicid: '',
    sem: '',
    subjectCode: '',
    batchName: 'All',
    courseid: '',
    subjectName:  '',
    orgid: '',
    year: '',
    section: '',
    branchid:'',
    period:'',
  });
  const handleOrgSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      schoolId: value,
    })); 
    setdatatype('');
  };

  const handleCourseSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      courseId: value,
    }));
    setdatatype('');
  };

  const handleyearSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      year: value,
    }));
    setdatatype('');
  };

  const handlesemSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      sem: value,
    }));
      setdatatype('');
  };

  const handlebranchSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      branch: value,
    }));
      setdatatype('');
  };

  const handlesectionSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      section: value,
    })); 
      setdatatype('');
  };
  const handleacadamicidSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      acadamicid: value,
    })); 
    setdatatype('');
  };
  const handleChangeDate = (name: string, date: any) => {
    setSelectedData((prevData) => ({
      ...prevData,
      [name]: date ? dayjs(date).format('YYYY-MM-DD') : '',
    }));
    
    setdatatype('');
  };
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
      const ebranchshortname = filteredbr[0].branchshortname;
      const ecourseid = filteredbr[0].courseid;
      setSelectedData((prev) => ({
        ...prev,
        courseId: ecourseid,
      }));
      const ebranchid = filteredbr[0].branchid;
      if (ebranchshortname === "HS") {

      } else {
        setSelectedData((prev) => ({
          ...prev,
          branch: ebranchid,
        }));
      }
      
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

  const handleSubmit = () => {
    setdatatype('');
    const {
      schoolId,
      courseId,
      year,
      sem,
      branch,
      section,
      type,
      acadamicid,
      wef
    } = selectedData;
    if (
      !schoolId || !courseId || !year || !sem || !branch || !section || !type ||!acadamicid||!wef||
      schoolId === '0' || courseId === '0' || year === '0' || sem === '0' || branch === '0' || section === '0' || type === '0'||acadamicid==='0'
    ) {
      setErrorMessage('Please make sure all selections are made and not empty.');
      const selected = `All selections are valid made and not empty: 
      School ID: ${schoolId}, 
      Course ID: ${courseId}, 
      Year: ${year}, 
      Semester: ${sem}, 
      Branch: ${branch}, 
      Section: ${section}, 
      Type: ${type}`;

      setMessage(selected);
      setSnackbarOpen(true);
      setSeverity('error');
      setTimeout(() => {
        setSnackbarOpen(false);
        setMessage(null);
      }, 10000);
    } else {
        setFormData((prev) => ({
            ...prev,
            acadamicid: selectedData.acadamicid,
          }));
          setFormData((prev) => ({
            ...prev,
            section: selectedData.section,
          }));
          setFormData((prev) => ({
            ...prev,
            branchid: selectedData.branch,
          }));
          setFormData((prev) => ({
            ...prev,
            year: selectedData.year,
          }));
          setFormData((prev) => ({
            ...prev,
            sem: selectedData.sem,
          }));
          setFormData((prev) => ({
            ...prev,
            orgid: selectedData.schoolId,
          }));
          setFormData((prev) => ({
            ...prev,
            courseid: selectedData.courseId,
          }));
        setErrorMessage('');
        setdatatype("get");
    }
  };
  const handleclone = () => {
    if(selectedData.type==="All"){
        setttbatch("All");  
    }
    fetchfromdatetodate();
    setErrorMessage('');
    setdataclone("get");
  };
  const fetchfromdatetodate = async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
        const url = `${DIGITAL_CAMPUS_BASE_URL}/acadamiccalanderview`;
        const schoolData = await fetchCardDetailstoken(url, 'GET',null,token);
        const filteredstaff= schoolData.filter((college: Classfilter) => college.courseid  === parseInt(selectedData.courseId) 
        && college.sem=== parseInt(selectedData.sem) && college.acadamicid === parseInt(selectedData.acadamicid) && college.type=== "Starting and Ending dates");
        const efromdate = filteredstaff[0].fromdate;
        const etodate = filteredstaff[0].todate;
        settfromdate(efromdate);
        settenddate(etodate);
          
    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setMessage(null);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedData((prev) => ({
        ...prev,
        type: value,
      }));
  };
  const handlesubjectcodefelect = (label: string, value: string) => {
    setsubjectcode(value);  

      setFormData({
        ...formData,
        subjectName:label,
      });
  };

  const handledaynameselect = (label: string, value: string) => {
    setdayname(value);   
  };

  const handleperiodselect = (label: string, value: string) => {
    setperiod(value);   
  };
  const handlettbatchselect = (label: string, value: string) => {
    if(selectedData.type==="Batch"){
        setttbatch(value);   
    }else{
        setttbatch("All");   
    }
  };
  return (
    <>
    <Layout>
         <PageTitle title='TT Creation'/>
      <CustomSnackbar
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        severity={severity}
        message={Message}
      />
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <Box flexGrow={1} >
      <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>Time Table Creation Details</Typography>
          <Typography variant="body1" paragraph>
              Easily generate your class timetable by selecting the academic year and semester. Once you've made your selections, click "Submit" to view and organize your schedule for the semester.
          </Typography>
      </Box>
    </Box>
      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <Collegedp onSelectOrg={handleOrgSelect} selectedOrg={selectedData.schoolId} />
        </Grid>
        <Grid item xs={6} md={3}>
          <Coursedp onSelectcourse={handleCourseSelect} selectedcourse={selectedData.courseId} orgid={selectedData.schoolId} />
        </Grid>
        <Grid item xs={6} md={3}>
          <Academicyeardp onSelectacademic={handleacadamicidSelect} selectedacademic={selectedData.acadamicid} orgid={selectedData.schoolId} />
        </Grid>
        <Grid item xs={6} md={3}>
          <Departmentdp onSelectbranch={handlebranchSelect} selectedbranch={selectedData.branch} courseid={selectedData.courseId} />
        </Grid>
        <Grid item xs={6} md={3}>
          <YearDp onSelectYear={handleyearSelect} selectedYear={selectedData.year} courseid={parseInt(selectedData.courseId)} />
        </Grid>
        <Grid item xs={6} md={3}>
          <SemDp onSelectSem={handlesemSelect} selectedSem={selectedData.sem} courseid={parseInt(selectedData.courseId)} />
        </Grid>
        <Grid item xs={6} md={3}>
          <SectionDp onSelectSection={handlesectionSelect} selectedSection={selectedData.section} branchId={selectedData.branch} />
        </Grid>
        <Grid item xs={6} md={3}>
        <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Time Table Type</FormLabel>
  <RadioGroup row aria-labelledby="category-radio-group-label1" value={selectedData.type} name="regulationtype" onChange={handleChange}>
              <FormControlLabel value="All" control={<Radio />} label="All" />
              <FormControlLabel value="Batch" control={<Radio />} label="Batch" />
            </RadioGroup>
</FormControl>
        </Grid>
        <Grid item xs={6} md={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DemoContainer components={['DatePicker', 'DatePicker']}>
  <DatePicker 
  label="With Effect From"
  name="fromdate"
  value={selectedData.wef ? dayjs(selectedData.wef) : null}
  onChange={(date: Dayjs | null) => handleChangeDate('wef', date)}
/>
  </DemoContainer>
</LocalizationProvider>
        </Grid>
        <Grid item xs={6} md={3}>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Get
          </Button>
        </Grid>
      </Grid>
      {errorMessage && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <p style={{ color: 'red' }}>{errorMessage}</p>
          </Grid>
        </Grid>
      )}
      {datatype==="get" && (
        <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
        <REgSubjectdp onSelectregSubject={handlesubjectcodefelect} selectedregSubject={subjectcode} branchid={selectedData.branch} 
          year={selectedData.year} sem={selectedData.sem} acadamicid={selectedData.acadamicid} subjecttype='all'/>
        </Grid>
        <Grid item xs={6} md={3}>
        <DayNameDpComponent onSelectDayName={handledaynameselect} selectedDayName={tdayname}/>
        </Grid>
        <Grid item xs={6} md={3}>
        <Periodsdp onSelectperiod={handleperiodselect} selectedperiod={tperiod} branch={parseInt(selectedData.branch)} 
          year={parseInt(selectedData.year)} sem={parseInt(selectedData.sem)} acadamicid={parseInt(selectedData.acadamicid)} section={selectedData.section} />
        </Grid>
        <Grid item xs={6} md={3}>
        <TTBatchdp onSelectfaculty={handlettbatchselect} selectedfaculty={ttbatch} branch={parseInt(selectedData.branch)} 
          year={parseInt(selectedData.year)} sem={parseInt(selectedData.sem)} acadamicid={parseInt(selectedData.acadamicid)} section={selectedData.section}
          subjectcode={subjectcode} />
        </Grid>
        <Grid item xs={6} md={3}>
          <Button type="submit" variant="contained" color="primary" onClick={handleclone}>
            Get
          </Button>
        </Grid>
      </Grid>
      
      )}

{datatype==="get" && (
       <TimetableComponent fromDate={tfromdate} endDate={tenddate} dayName={tdayname} acadamicid={selectedData.acadamicid} sem={selectedData.sem}
       year={selectedData.year} subjectCode={subjectcode} batchName={ttbatch} courseid={selectedData.courseId} branchid={selectedData.branch} orgid={selectedData.schoolId}
       section={selectedData.section} wef={selectedData.wef} period={tperiod}
       />
      )}

        </Layout>
    </>
  );
};

export default ClassComponent;