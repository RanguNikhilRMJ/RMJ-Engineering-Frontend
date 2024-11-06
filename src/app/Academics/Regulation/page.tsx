"use client"
import React, { useState, useEffect,ChangeEvent} from 'react';
import Collegedp from '@/components/dropdown/Collegedp';
import Coursedp from '@/components/dropdown/Coursedp';
import { Grid, Button,TextField,FormLabel,Radio,RadioGroup,FormControlLabel,FormControl,AlertColor,useMediaQuery,IconButton,Paper,styled,tableCellClasses,Table,TablePagination,Box,CardContent,Card,CardActions,Typography,TableBody,TableCell,TableContainer,TableHead,TableRow,Dialog,DialogActions,DialogTitle,DialogContent,DialogContentText } from '@mui/material';
import CustomSnackbar from "@/components/CustomSnackbar";
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import EditIcon from '@mui/icons-material/Edit';
import Layout from '@/components/Sidemenu/Layout';
import PageTitle from '@/components/PageTitle';
interface Column {
  id: 'regulation'|'batch' | 'regulationtype'|'Action';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
}
interface SelectedData {
  schoolId: string;
  courseId: string;
}

interface Class {
  id:string;
  orgid: string;
  courseid: string;
  regulation: string;
  batch: number;
  regulationtype:string;
  deletestatus:string;
}

interface Classfilter {
  id:string;
  orgid: number;
  courseid: number;
}
const Page: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [newClass, setNewClass] = useState<Class>({
    id: '',
    orgid: '',
    courseid: '',
    regulation: '',
    batch: 0,
    regulationtype:'',
    deletestatus: 'NA',
  });
  const [selectedData, setSelectedData] = useState<SelectedData>({
    schoolId: '',
    courseId: '',
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

  const handleGet = () => {
    const {
      schoolId,
      courseId
    } = selectedData;
    if (
      !schoolId || !courseId ||
      schoolId === '0' || courseId === '0'
    ) {
      setErrorMessage('Please make sure all selections are made and not empty.');
      const selected = `All selections are valid made and not empty: 
      School ID: ${schoolId}, 
      Course ID: ${courseId}`;
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
      courseId
    } = selectedData;
    if (
      !schoolId || !courseId ||
      schoolId === '0' || courseId === '0'
    ) {
      setErrorMessage('Please make sure all selections are made and not empty.');
      const selected = `All selections are valid made and not empty: 
      School ID: ${schoolId}, 
      Course ID: ${courseId}, `;
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
      const url = `${DIGITAL_CAMPUS_BASE_URL}/tblregulation1view`;
      const schoolData = await fetchCardDetailstoken(url, 'GET',null,token);
      const filteredstaff= schoolData.filter((college: Classfilter) => college.courseid  === parseInt(selectedData.courseId));
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
      regulation: '',
      batch: 0,
      regulationtype: '',
      deletestatus:'NA',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token') || undefined;
      const requestData = {
        id:newClass.id,
        orgid: selectedData.schoolId,
        courseid: selectedData.courseId,
        regulation: newClass.regulation,
        regulationtype: newClass.regulationtype,
        batch:newClass.batch,
        deletestatus:newClass.deletestatus,
      };
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/tblregulation1`;
      const apiEndpointclassupdate = `${DIGITAL_CAMPUS_BASE_URL}/tblregulation1update`;
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
  const columns: readonly Column[] = [
    { id: 'regulation', label: 'regulation', minWidth: 100 },
    { id: 'batch', label: 'batch', minWidth: 80 },
    { id: 'regulationtype', label: 'regulationtype', minWidth: 100 },
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
      batch: data.batch,
      regulationtype: data.regulationtype,
      deletestatus:data.deletestatus,
      regulation:data.regulation,
    });
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeregulation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewClass((prev) => ({
        ...prev,
        regulation: value,
      }));
  }; const handleChangePeriodCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Check if the value is a number or empty (allowing deletion)
    if (/^\d*$/.test(value) || value === '') {
        setNewClass((prev) => ({
        ...prev,
        batch: parseInt(value, 10),
      }));
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClass((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
    <Layout>
    <PageTitle title='Leave Apply' />
    <CustomSnackbar
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        severity={severity}
        message={Message}
      />
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <Box flexGrow={1} textAlign="center">
           <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>Regulation Details</Typography>
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
      <Typography variant="body1">Regulation: {classItem.regulation}</Typography>
      <Typography variant="body1">batch: {classItem.batch}</Typography>
      <Typography variant="body1">Regulation Type: {classItem.regulationtype}</Typography>
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
          <TableCell>{classItem.regulation}</TableCell>
          <TableCell>{classItem.batch}</TableCell>
          <TableCell>{classItem.regulationtype}</TableCell>
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
  {newClass.id ? 'Selected Regulation Details' : 'Register Regulation'}
  </DialogTitle>
  <DialogContent>
  <form onSubmit={handleSubmit}>
  <DialogContentText id="dialog-description">
    <br></br>
 <Grid container spacing={3}>
        <Grid item xs={6} md={4}>
        <TextField
            label="Regulations"
            value={newClass.regulation}
            onChange={handleChangeregulation}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={4}>
        <TextField
            label="batch"
            value={newClass.batch}
            onChange={handleChangePeriodCount}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={4}>
        <FormControl>
  <FormLabel id="demo-radio-buttons-group-label">Regulation Type</FormLabel>
  <RadioGroup row aria-labelledby="category-radio-group-label1" value={newClass.regulationtype} name="regulationtype" onChange={handleChange}>
              <FormControlLabel value="Jntu" control={<Radio />} label="Jntu" />
              <FormControlLabel value="Autonomous" control={<Radio />} label="Autonomous" />
            </RadioGroup>
</FormControl>
        </Grid>
      
      </Grid>
          </DialogContentText>
      <DialogActions>
   <Button type="submit" variant="contained" color="primary">
   {newClass.id ? 'Edit' : 'Register '}
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
