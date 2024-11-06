import React, { useState,useEffect, ChangeEvent } from 'react';
import { Grid, Button,IconButton,AlertColor,Checkbox,Table,styled,Paper,useMediaQuery,tableCellClasses,TablePagination,Box,CardContent,Card,CardActions,Typography,TableBody,TableCell,TableContainer,TableHead,TableRow } from '@mui/material';
import CustomSnackbar from '@/components/CustomSnackbar';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';

interface tblsubjecttofaculty {
    id: string,
    studentrollno: string,
    name: string,
    feestatus:boolean,
}

interface NoofPeriodProps {
    orgid: string;
    courseId: string;
    year: string;
    sem: string;
    branch: string;
    section: string;
    acadamicid:string;
    subjectcode:string;
  }
const AddsemRegistration: React.FC<NoofPeriodProps> = ({
    orgid,
    courseId,
    year,
    sem,
    branch,
    section,
    acadamicid,
    subjectcode
  }) => {
 
  const [classes, setClasses] = useState<tblsubjecttofaculty[]>([]);
  const [Message, setMessage] = useState<string | null>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('error');
  useEffect(() => {
    fetchClassView();
  }, []);

  const fetchClassView = async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const Url = `${DIGITAL_CAMPUS_BASE_URL}/findbyStudentDetils?subjectcode=${subjectcode}&acadamicid=${acadamicid}&branchid=${branch}&year=${year}&sem=${sem}`;
      const data = await fetchCardDetailstoken(Url, 'GET',null,token);
      const filteredstaff = data.filter((college: any) => college.section === section);
      setClasses(filteredstaff);
    } catch (error) {
      console.error('Error fetching class data:', error);
    }
  };

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

  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setMessage(null);
  };

  const handleGenerateJSON = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token') || undefined;
      const fee = classes.filter((classItem) => classItem.feestatus);
      const attendanceData = fee.map((fee) => ({
        id: '0',
        branchid: branch,
        courseid: courseId,
        studentrollno: fee.studentrollno,
        subjectcode: subjectcode,
        year:year,
        sem: sem,
        acadamicid: acadamicid,
        deletestatus:'NA',
      }));
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/StudenttosubjectBulkSave`;
      const registeredData = await fetchCardDetailstoken(apiEndpoint, 'POST', attendanceData,token);
        fetchClassView();
        setMessage(registeredData);
        setSnackbarOpen(true);
        setSeverity('success');
        setTimeout(() => {
          setSnackbarOpen(false);
          setMessage(null);
        }, 5000);
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
      <Typography variant="h5" fontWeight="bold" >Student's Not Register to Selected Subject</Typography>
      </Box>
    </Box>
   
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxHeight: 440 }}>
           <Table stickyHeader aria-label="sticky table customized" >
    <TableHead>
    <StyledTableRow>
              <StyledTableCell align="center">
             STUDENTROLLNO
              </StyledTableCell>
              <StyledTableCell align="center">
            Name
              </StyledTableCell>
             
              <StyledTableCell>
             Action
              </StyledTableCell>
   </StyledTableRow>
    </TableHead>
    <TableBody>
      {classes.map((classItem,index) => (
        <TableRow key={index}>
             <TableCell>{classItem.studentrollno}</TableCell>
             <TableCell>{classItem.name}</TableCell>
             <TableCell>
      
            </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
 
</TableContainer>
<Button variant="contained" color="primary" onClick={handleGenerateJSON}>Submit</Button>
</Paper>
    </>
  );
};

export default AddsemRegistration;