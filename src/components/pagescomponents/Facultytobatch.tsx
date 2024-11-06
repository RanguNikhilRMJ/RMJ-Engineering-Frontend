import React, { useState,useEffect, ChangeEvent } from 'react';
import { Grid, Button,IconButton,AlertColor,TextField,Table,styled,Paper,useMediaQuery,tableCellClasses,TablePagination,Box,CardContent,Card,CardActions,Typography,TableBody,TableCell,TableContainer,TableHead,TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CustomSnackbar from '@/components/CustomSnackbar';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import REgSubjectdp from '../dropdown/REgSubjectdp';
import Batchnamelab from '../dropdown/Batchnamelab';
import Subjecttofacultydp from '../dropdown/Subjecttofacultydp';
interface Column {
    id: 'subjectcode'|'subjectname'|'facultyid'|'batch'|'Action';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
  }
interface tblsubjecttofaculty {
    id: string,
    orgid: string,
    courseid: string,
    branchid: string,
    year: string,
    sem: string,
    regulation: string,
    section: string,
    subjectcode: string,
    facultyid: string,
    acadamicid: string,
    batch: string,
    subjectname:string;
    employeename:string;
    deletestatus:string;
}

interface NoofPeriodProps {
    orgid: number;
    courseId: number;
    year: number;
    sem: number;
    branch: number;
    section: string;
    acadamicid:number;
  }
const Facultytobatch: React.FC<NoofPeriodProps> = ({
    orgid,
    courseId,
    year,
    sem,
    branch,
    section,
    acadamicid
  }) => {
 
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [classes, setClasses] = useState<tblsubjecttofaculty[]>([]);
  const [newClass, setNewClass] = useState<tblsubjecttofaculty>({
    id: '',
orgid: '',
courseid: '',
branchid: '',
year: '',
sem: '',
regulation: '',
section: '',
subjectcode: '',
facultyid: '',
acadamicid: '',
batch: '',
subjectname:'',
employeename:'',
deletestatus:'NA',
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [Message, setMessage] = useState<string | null>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('error');
  useEffect(() => {
    fetchClassView();
  }, []);

  const fetchClassView = async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const Url = `${DIGITAL_CAMPUS_BASE_URL}/getByFacultytoBatchbyParams?acadamicid=${acadamicid}&branchid=${branch}&section=${section}&year=${year}&sem=${sem}`;
      const data = await fetchCardDetailstoken(Url, 'GET',null,token);
      
      setClasses(data);
    } catch (error) {
      console.error('Error fetching class data:', error);
    }
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns: readonly Column[] = [
    { id: 'subjectcode', label: 'subjectcode', minWidth: 80 },
    { id: 'subjectname', label: 'subjectname', minWidth: 100 },
    { id: 'facultyid', label: 'facultyid', minWidth: 100 },
    { id: 'batch', label: 'batch', minWidth: 100},
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
    populateFormFields(data);
  };
  
  const populateFormFields = (data: any) => {
    setNewClass({
        id: data.id,
        orgid: data.orgid,
        courseid: data.courseid,
        branchid: data.branchid,
        year: data.year,
        sem: data.sem,
        regulation: data.regulation,
        section: data.section,
        subjectcode: data.subjectcode,
        facultyid: data.facultyid,
        acadamicid: data.acadamicid,
        batch: data.batch,
        subjectname:data.subjectname,
        employeename:data.employeename,
        deletestatus:data.deletestatus,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setMessage(null);
  };

  
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token') || undefined;
    const apiEndpointbr = `${DIGITAL_CAMPUS_BASE_URL}/allSubjectDetails`;
    const fetchedDatabr = await fetchCardDetailstoken(apiEndpointbr, 'GET',null,token);
    const filteredbr = fetchedDatabr.filter((college: any) => college.subjectcode === newClass.subjectcode);
    const eregulationname = filteredbr[0].regulationname;
    try {
      const requestData = {
        id: newClass.id,
        orgid: orgid,
        courseid: courseId,
        branchid: branch,
        year: year,
        sem: sem,
        acadamicid: acadamicid,
        regulation:eregulationname,
        section: section,
        subjectcode: newClass.subjectcode,
        facultyid: newClass.facultyid,
        batch:newClass.batch,
        deletestatus:'NA',
      };
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/tblfacultytobatch`;
      const apiEndpointclassupdate = `${DIGITAL_CAMPUS_BASE_URL}/tblfacultytobatchupdate`;
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
  
  const handlebranchfelect = (label: string, value: string) => {
    setNewClass((prevNewClass) => ({
        ...prevNewClass,
        batch: value, 
      }));    
  };
  const handlesubjectcodefelect = (label: string, value: string) => {
    setNewClass((prevNewClass) => ({
        ...prevNewClass,
        subjectcode: value, 
      }));    
  };

  const handlefacultyselect = (label: string, value: string) => {
    setNewClass((prevNewClass) => ({
        ...prevNewClass,
        facultyid: value, 
      }));   
  };
  return (
    <>
     <CustomSnackbar
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        severity={severity}
        message={Message}
      />
<Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <Box flexGrow={1} textAlign="center">
      <Typography variant="h5" fontWeight="bold" >Faculty to Batch Details</Typography>
      </Box>
    </Box>
    <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <REgSubjectdp onSelectregSubject={handlesubjectcodefelect} selectedregSubject={newClass.subjectcode} branchid={branch.toString()} 
          year={year.toString()} sem={sem.toString()} acadamicid={acadamicid.toString()} subjecttype='all'/>
        </Grid>
        <Grid item xs={6} md={3}>
        <Subjecttofacultydp onSelectfaculty={handlefacultyselect} selectedfaculty={newClass.facultyid} 
        orgid={orgid}
        year={year}
        sem={sem}
        branch={branch}
        section={section}
        acadamicid={acadamicid}
        subjectcode={newClass.subjectcode}/>
        </Grid>
        <Grid item xs={6} md={3}>
        <Batchnamelab onSelectfaculty={handlebranchfelect} selectedfaculty={newClass.facultyid} 
        orgid={orgid}
        year={year}
        sem={sem}
        branch={branch}
        section={section}
        acadamicid={acadamicid}
        subjectcode={newClass.subjectcode}/>
        </Grid>
        <Grid item xs={6} md={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
          { newClass.id ? 'Edit' : 'Register'}
          </Button>
        </Grid>
      </Grid>


{isSmallScreen ? (
  // Render cards for small screens
  classes.map((classItem) => (
    <Card key={classItem.id} style={{ margin: '10px', minWidth: 275 }}>
      <CardContent>
      <Typography variant="h6">ID: {classItem.id}</Typography>
      <Typography variant="body1">Subject Code: {classItem.subjectcode}</Typography>
      <Typography variant="body1">Subject Name: {classItem.subjectname}</Typography>
      <Typography variant="body1">Facultyid: {classItem.facultyid}</Typography>
    </CardContent>
    <CardActions>
      <Button  onClick={() => handleEdit(classItem)}>Edit</Button>
      {/* <Button onClick={() => handleDelete(classItem)}>Delete</Button> */}
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
             <TableCell>{classItem.subjectcode}</TableCell>
             <TableCell>{classItem.subjectname}</TableCell>
             <TableCell>{classItem.employeename}</TableCell>
             <TableCell>{classItem.batch}</TableCell>
        
          <TableCell>
          <IconButton onClick={() => handleEdit(classItem)} aria-label="edit">
    <EditIcon />
  </IconButton>
  {/* <IconButton onClick={() => handleDelete(classItem)} aria-label="delete">
    <DeleteIcon />
  </IconButton> */}
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
    </>
  );
};

export default Facultytobatch;