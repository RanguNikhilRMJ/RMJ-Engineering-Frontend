"use client"
import React,{useState,useEffect} from 'react'
import PageTitle from '@/components/PageTitle';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import {Button,Table,IconButton,styled,AlertColor,AppBar,Slide,Grid,FormLabel,FormControl,Divider,ListItemButton,ListItemText,List,Toolbar,tableCellClasses,TablePagination,Box,Radio,RadioGroup,FormControlLabel,TableBody,CardContent,Card,CardActions,Typography,TableCell,TableContainer,TableHead,TableRow,Paper,TextField,Modal,Dialog,DialogActions,DialogTitle,DialogContent} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CustomSnackbar from "@/components/CustomSnackbar";
import Layout from '@/components/Sidemenu/Layout';
interface Column {
    id: 'subdate'|'employeeid'|'employeename'|'branchshortname' | 'leaveduration'|'leavepurpose'|'reason'|'casualleave'|'onduty'|'Action';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
  }
interface SelectedData {
    id: string;
    subdate: string;
    employeeid: string;
    leaveduration: string;
    leavepurpose: string;
    reason: string;
    leavestatus:string;
    branchshortname: string;
    employeename:string;
    casualleave:string;
    onduty:string;
  }

  const Leaveapprovial: React.FC = () => {
    const [leaves, setleaves] = useState<SelectedData[]>([]);
    
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [Message, setMessage] = useState<string | null>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('error');
    useEffect(() => {
        fetchCourseOptions();
      }, []);
    
      const fetchCourseOptions = async () => {
        try {
          const token = localStorage.getItem('token') || undefined;
            const usertype = localStorage.getItem('usertype');
            const username = localStorage.getItem('username');
        if (usertype === "ceo") {
            const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/getByCEOApprovalList`;
            const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
            setleaves(fetchedData);
        }
         else if (usertype === "principal") {
            const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/forpricipalLeavestatus?username=${username}`;
            const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
            setleaves(fetchedData);
        }else if (usertype === "hod") {
            const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/LeavestatusForHOD?username=${username}`;
            const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
            setleaves(fetchedData);
        }else if (usertype === "DEAN ADMINISTRATION") {
            const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/getByDeanApprovalList`;
            const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
            setleaves(fetchedData);
        }
        } catch (error) {
          console.error('Error fetching school options:', error);
        }
      };

      const columns: readonly Column[] = [
        { id: 'subdate', label: 'Date', minWidth: 50 },
        { id: 'employeename', label: 'employeename', minWidth: 50 },
        { id: 'branchshortname', label: 'Branch', minWidth: 80 },
        { id: 'leaveduration', label: 'Leave Duration', minWidth: 50 },
        { id: 'leavepurpose', label: 'leave purpose', minWidth: 50 },
        { id: 'reason', label: 'reason', minWidth: 150 },
        { id: 'casualleave', label: 'casualleave', minWidth: 50 },
        { id: 'onduty', label: 'onduty', minWidth: 50 },
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

      const handleapprove = async (classItem: SelectedData) => {
        try {
          const token = localStorage.getItem('token') || undefined;
            const usertype = localStorage.getItem('usertype');
            const username = localStorage.getItem('username');
            if (usertype === "principal") {
                const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/Principalapproved?id=${classItem.id}&principalapproved=yes&approvedby=${usertype}`;
                const response = await fetchCardDetailstoken(apiEndpoint, 'PUT',null,token);
                const apiP = `${DIGITAL_CAMPUS_BASE_URL}/Leavestatus?id=${classItem.id}`;
                const responseP = await fetchCardDetailstoken(apiEndpoint, 'PUT');

            }else if (usertype === "hod") {
                const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/Hodapproved?id=${classItem.id}&HODapproved=yes&approvedby=${usertype}`;
                const response = await fetchCardDetailstoken(apiEndpoint, 'PUT',null,token);
                const apiP = `${DIGITAL_CAMPUS_BASE_URL}/Leavestatus?id=${classItem.id}`;
                const responseP = await fetchCardDetailstoken(apiEndpoint, 'PUT',null,token);
            }else if (usertype === "DEAN ADMINISTRATION") {
                const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/DeenAprovedLeave?principalapproved=yes&leavestatus=yes&approvedby=${usertype}$id=${classItem.id}`;
                const response = await fetchCardDetailstoken(apiEndpoint, 'PUT',null,token);
            }

        } catch (error) {
          console.error('Error approving leave:', error);
        }
      };
    
      const handlecancel = async (classItem: SelectedData) => {
        try {
            const usertype = localStorage.getItem('usertype');
            const token = localStorage.getItem('token') || undefined;
            if (usertype === "principal") {
                const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/Principalapproved?id=${classItem.id}&principalapproved=No&approvedby=${usertype}`;
                const response = await fetchCardDetailstoken(apiEndpoint, 'PUT',null,token);
               
                const apiP = `${DIGITAL_CAMPUS_BASE_URL}/Leavestatus?id=${classItem.id}`;
                const responseP = await fetchCardDetailstoken(apiEndpoint, 'PUT',null,token);

                setMessage(responseP);
      setSnackbarOpen(true);
      setSeverity('success');
      setTimeout(() => {
        setSnackbarOpen(false);
        setMessage(null);
      }, 5000); 
            }else if (usertype === "hod") {
                const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/Hodapproved?id=${classItem.id}&HODapproved=No&approvedby=${usertype}`;
                const response = await fetchCardDetailstoken(apiEndpoint, 'PUT',null,token);
               
                const apiP = `${DIGITAL_CAMPUS_BASE_URL}/Leavestatus?id=${classItem.id}`;
                const responseP = await fetchCardDetailstoken(apiEndpoint, 'PUT',null,token);
                setMessage(responseP);
                setSnackbarOpen(true);
                setSeverity('success');
                setTimeout(() => {
                  setSnackbarOpen(false);
                  setMessage(null);
                }, 5000); 

            }else if (usertype === "DEAN ADMINISTRATION") {
                const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/DeenAprovedLeave?principalapproved=No&leavestatus=No&approvedby=${usertype}$id=${classItem.id}`;
                const response = await fetchCardDetailstoken(apiEndpoint, 'PUT',null,token);
                 setMessage(response);
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
      const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
        setMessage(null);
      };
  return (
    <>
    <Layout>
    <CustomSnackbar
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        severity={severity}
        message={Message}
      />
    <PageTitle title='Leaves approval' />
    <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <Box flexGrow={1} textAlign="center">
      <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>Leaves approval</Typography>
                <Typography variant="body1" paragraph>
                    Easily generate your class timetable by selecting the academic year and semester. Once you've made your selections, click "Submit" to view and organize your schedule for the semester.
                </Typography>
      </Box>
    </Box>
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
      {leaves && leaves.length > 0 &&leaves.map((classItem) => (
        <TableRow key={classItem.id}>
          <TableCell>{classItem.employeename}</TableCell>
          <TableCell>{classItem.branchshortname}</TableCell>
          <TableCell>{classItem.leaveduration} </TableCell>
          <TableCell>{classItem.leavepurpose}</TableCell>
          <TableCell>{classItem.reason}</TableCell>
          <TableCell>{classItem.casualleave}</TableCell>
          <TableCell>{classItem.onduty}</TableCell>
          <TableCell>
          <IconButton onClick={() => handleapprove(classItem)} aria-label="approve">
   <CheckIcon/>
  </IconButton>
  <IconButton onClick={() => handlecancel(classItem)} aria-label="cancel">
   <ClearIcon/>
  </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
</Paper>
    </Layout>
    </>
  )
}
export default Leaveapprovial;