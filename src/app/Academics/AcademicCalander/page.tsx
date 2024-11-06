"use client"
import React, { useState, useEffect,ChangeEvent} from 'react';
import Collegedp from '@/components/dropdown/Collegedp';
import Coursedp from '@/components/dropdown/Coursedp';
import SemDp from '@/components/dropdown/SemDp';
import YearDp from '@/components/dropdown/YearDp';
import { Grid, Button, AlertColor,useMediaQuery,IconButton,Paper,styled,tableCellClasses,Table,TablePagination,Box,CardContent,Card,CardActions,Typography,TableBody,TableCell,TableContainer,TableHead,TableRow,Dialog,DialogActions,DialogTitle,DialogContent,DialogContentText } from '@mui/material';
import CustomSnackbar from "@/components/CustomSnackbar";
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider,DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import Academicyeardp from '@/components/dropdown/Academicyeardp';
import AcademicType from '@/components/dropdown/AcademicType';
import EditIcon from '@mui/icons-material/Edit';
import Layout from '@/components/Sidemenu/Layout';
import PageTitle from "@/components/PageTitle";
interface Column {
  id: 'year'|'fromdate' | 'todate'|'type'|'Action';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
}
interface SelectedData {
  schoolId: string;
  courseId: string;
  sem: string;
  acadamicid:string;
}

interface Class {
  id:string;
  orgid: string;
  courseid: string;
  sem: string;
  year: string;
  fromdate:string;
  todate:string;
  type:string;
  acadamicid:string;
}

interface Classfilter {
  id:string;
  orgid: number;
  courseid: number;
  sem: number;
  year: number;
  acadamicid :number;
}
const Page: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [newClass, setNewClass] = useState<Class>({
    id: '',
    orgid: '',
    courseid: '',
    sem: '',
    year: '',
    fromdate: '',
    todate: '',
    type:'',
    acadamicid:'',
  });
  const [selectedData, setSelectedData] = useState<SelectedData>({
    schoolId: '',
    courseId: '',
    sem: '',
    acadamicid:'',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [Message, setMessage] = useState<string | null>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('error');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
    setSelectedData((prev) => ({
      ...prev,
      schoolId: value,
    }));
  };

  const handleCourseSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      courseId: value,
    }));
  };
  
  const handleacadamicidSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      acadamicid: value,
    }));
  };

  const handlesemSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      sem: value,
    })); 
  };
  const handleGet = () => {
    const {
      schoolId,
      courseId,
      sem,
      acadamicid
    } = selectedData;
    if (
      !schoolId || !courseId || !sem ||!acadamicid||
      schoolId === '0' || courseId === '0' ||  sem === '0' ||acadamicid==='0'
    ) {
      setErrorMessage('Please make sure all selections are made and not empty.');
      const selected = `All selections are valid made and not empty: 
      School ID: ${schoolId}, 
      Course ID: ${courseId}, 
      Semester: ${sem}`;
      setMessage(selected);
      setSnackbarOpen(true);
      setSeverity('error');
      setTimeout(() => {
        setSnackbarOpen(false);
        setMessage(null);
      }, 10000);
    } else {
      fetchClassView();
      setErrorMessage('');
    }
  };

  const handleAdd = () => {
    const {
      schoolId,
      courseId,
      sem,
      acadamicid
    } = selectedData;
    if (
      !schoolId || !courseId || !sem ||!acadamicid||
      schoolId === '0' || courseId === '0' ||  sem === '0' ||acadamicid==='0'
    ) {
      setErrorMessage('Please make sure all selections are made and not empty.');
      const selected = `All selections are valid made and not empty: 
      School ID: ${schoolId}, 
      Course ID: ${courseId}, 
      Semester: ${sem}`;
      setMessage(selected);
      setSnackbarOpen(true);
      setSeverity('error');
      setTimeout(() => {
        setSnackbarOpen(false);
        setMessage(null);
      }, 10000);
    } else {
      setErrorMessage('');
      setIsDialogOpen(true);
      fetchClassView();
    }
  };
  const fetchClassView = async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const url = `${DIGITAL_CAMPUS_BASE_URL}/acadamiccalanderview`;
      const schoolData = await fetchCardDetailstoken(url, 'GET',null,token);
      const filteredstaff= schoolData.filter((college: Classfilter) => college.courseid  === parseInt(selectedData.courseId) 
      && college.sem=== parseInt(selectedData.sem) && college.acadamicid === parseInt(selectedData.acadamicid));
      setClasses(filteredstaff);
    } catch (error) {
      console.error('Error fetching class data:', error);
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setMessage(null);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setNewClass({
      id: '',
      orgid: '',
      courseid: '',
      sem: '',
      year: '',
      fromdate: '',
      todate: '',
      type:'',
      acadamicid:'',
    });
  };

  const handleyearSelect = (label: string, value: string) => {
    setNewClass((prev) => ({
      ...prev,
      year: value,
    }));
  };
  const handleChangeDate = (name: string, date: any) => {
    setNewClass((prevData) => ({
      ...prevData,
      [name]: date ? dayjs(date).format('YYYY-MM-DD') : '',
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token') || undefined;
      const requestData = {
        id:newClass.id,
        orgid: selectedData.schoolId,
        courseid: selectedData.courseId,
        sem: selectedData.sem,
        year: newClass.year,
        fromdate:newClass.fromdate,
        todate:newClass.todate,
        type:newClass.type,
        acadamicid:selectedData.acadamicid,
      };
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/acadamiccalander`;
      const apiEndpointclassupdate = `${DIGITAL_CAMPUS_BASE_URL}/acadamiccalanderupdate`;
      if (newClass.id) {
        const updatedData = await fetchCardDetailstoken(apiEndpointclassupdate, 'PUT', requestData,token);
        fetchClassView();
        setMessage(updatedData);
        setSnackbarOpen(true);
        setSeverity('success');
        setTimeout(() => {
          setSnackbarOpen(false);
          setMessage(null);
        }, 5000); 
      } else {
        const registeredData = await fetchCardDetailstoken(apiEndpoint, 'POST', requestData,token);
        console.log(requestData);
        fetchClassView();
        setMessage(registeredData);
        setSnackbarOpen(true);
        setSeverity('success');
        setTimeout(() => {
          setSnackbarOpen(false);
          setMessage(null);
        }, 5000); 
      }
      closeDialog();
    } catch (error: any) {
      console.error('Error handling form submission:', error.message);
      setMessage(error.message);
      setSnackbarOpen(true);
      setSeverity('error');
      setTimeout(() => {
        setSnackbarOpen(false);
        setMessage(null);
      }, 10000); 
    }
  };
  const handletypeSelect = (label: string, value: string) => {
    setNewClass((prev) => ({
      ...prev,
      type: value,
    })); 
  };
  const columns: readonly Column[] = [
    { id: 'year', label: 'year', minWidth: 100 },
    { id: 'fromdate', label: 'fromdate', minWidth: 80 },
    { id: 'todate', label: 'todate', minWidth: 100 },
    { id: 'type', label: 'type', minWidth: 100 },
    { id: 'Action', label: 'Action', minWidth: 100 },
  ];
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor:"rgb(46, 32, 59)",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleEdit = (data: any) => {
    setIsDialogOpen(true);
    populateFormFields(data);
  };
  const populateFormFields = (data: any) => {
    setNewClass({
      id:data.id,
      orgid: data.orgid,
      courseid: data.courseid,
      sem: data.sem,
      year: data.year,
      fromdate:data.fromdate,
      todate:data.todate,
      type:data.type,
      acadamicid:data.acadamicid,
    });
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
    <Layout>
    <PageTitle title='Academic Acalendar'/>
    <CustomSnackbar
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        severity={severity}
        message={Message}
      />
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <Box flexGrow={1} >
      <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>
                    Academic Calendar
                </Typography>
                <Typography variant="body1" paragraph>
                    Easily generate your class Academic Calendar by selecting the academic year and semester. Once you've made your selections, click "Submit" to view and organize your schedule for the semester.
                </Typography>      </Box>
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
          <SemDp onSelectSem={handlesemSelect} selectedSem={selectedData.sem} courseid={parseInt(selectedData.courseId)} />
        </Grid>
        <Grid item xs={6} md={3}>
          <Button type="submit" variant="contained" color="primary" onClick={handleGet}>
            Get
          </Button>

          <Button type="submit" variant="contained" color="success" onClick={handleAdd}>
            Add
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
      {isSmallScreen ? (
  // Render cards for small screens
  classes.map((classItem) => (
    <Card key={classItem.id} style={{ margin: '10px', minWidth: 275 }}>
      <CardContent>
      <Typography variant="h6">ID: {classItem.id}</Typography>
      <Typography variant="body1">year: {classItem.year}</Typography>
      <Typography variant="body1">From Date: {classItem.fromdate}</Typography>
      <Typography variant="body1">To Date: {classItem.todate}</Typography>
      <Typography variant="body1">Type: {classItem.type}</Typography>
    </CardContent>
    <CardActions>
      <Button onClick={() => handleEdit(classItem)}>Edit</Button>
    </CardActions>
    </Card>
  ))
) : (
  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxHeight: 440 }}>
           <Table stickyHeader aria-label="sticky table customized" >
    <TableHead>
    <StyledTableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
    </TableHead>
    <TableBody>
      {classes.map((classItem) => (
        <TableRow key={classItem.id}>
          <TableCell>{classItem.year}</TableCell>
          <TableCell>{classItem.fromdate}</TableCell>
          <TableCell>{classItem.todate}</TableCell>
          <TableCell>{classItem.type}</TableCell>
          <TableCell>
          <IconButton onClick={() => handleEdit(classItem)} aria-label="edit">
    <EditIcon />
  </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  <TablePagination
        rowsPerPageOptions={[10, 25, 100,500]}
        component="div"
        count={classes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
</TableContainer>
</Paper>
)}
<Dialog open={isDialogOpen} onClose={closeDialog}  maxWidth="md" fullWidth>
  <DialogTitle>
  {newClass.id ? 'Selected Academic Calendar Details' : 'Register'}
  </DialogTitle>
  <DialogContent>
  <form onSubmit={handleSubmit}>
  <DialogContentText id="dialog-description">
    <br></br>
 <Grid container spacing={3}>
        <Grid item xs={6} md={4}>
        <YearDp onSelectYear={handleyearSelect} selectedYear={newClass.year} courseid={parseInt(selectedData.courseId)} />
        </Grid>
        <Grid item xs={6} md={4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DemoContainer components={['DatePicker', 'DatePicker']}>
  <DatePicker 
  label="From Date"
  name="fromdate"
  value={newClass.fromdate ? dayjs(newClass.fromdate) : null}
  onChange={(date: Dayjs | null) => handleChangeDate('fromdate', date)}
/>
  </DemoContainer>
</LocalizationProvider>
        </Grid>
        <Grid item xs={6} md={4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DemoContainer components={['DatePicker', 'DatePicker']}>
  <DatePicker 
  label="To Date"
  name="todate"
  value={newClass.todate ? dayjs(newClass.todate) : null}
  onChange={(date: Dayjs | null) => handleChangeDate('todate', date)}
/>
  </DemoContainer>
</LocalizationProvider>
        </Grid>
       <Grid item xs={6} md={4}>
       <AcademicType onSelectType={handletypeSelect} selectedType={newClass.type} />
       </Grid>
      </Grid>
          </DialogContentText>
      <DialogActions>
   <Button type="submit" variant="contained" color="primary">
   {newClass.id ? 'Edit' : 'Register'}
               </Button>
 </DialogActions>
</form>
  </DialogContent>
</Dialog>
    </Layout>
    </>
  );
};

export default Page;
