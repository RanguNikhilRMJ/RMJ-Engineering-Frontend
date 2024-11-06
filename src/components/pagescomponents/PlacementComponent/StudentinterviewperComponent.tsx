"use client"
import React, { useState, useEffect,ChangeEvent} from 'react';
import { Grid,TextField, Button, AlertColor,useMediaQuery,IconButton,Paper,styled,tableCellClasses,Table,TablePagination,Box,CardContent,Card,CardActions,Typography,TableBody,TableCell,TableContainer,TableHead,TableRow,Dialog,DialogActions,DialogTitle,DialogContent,DialogContentText } from '@mui/material';
import CustomSnackbar from "@/components/CustomSnackbar";
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import Collegedp from '@/components/dropdown/Collegedp';
import Coursedp from '@/components/dropdown/Coursedp';
import EditIcon from '@mui/icons-material/Edit';
import Batchdp from '@/components/dropdown/Batchdp';
import InterviewRounddp from '@/components/dropdown/InterviewRounddp';
interface Column {
  id: 'year'|'fromyear' | 'toyear'|'amount'|'discount'|'Action';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
}

interface Class {
  id:string;
  feename: string;
  amount: string;
  category: string;
}
interface SelectedData {
  schoolId: string;
  courseId: string;
  companyid:string;
  batch:string;
  InterviewRound:string;
}
const StudentinterviewperComponent: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [newClass, setNewClass] = useState<Class>({
    id: '',
    feename: '',
    amount: '',
    category:'',
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [Message, setMessage] = useState<string | null>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('error');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedData, setSelectedData] = useState<SelectedData>({
    schoolId: '',
    courseId: '',
    companyid: '',
    batch:'',
    InterviewRound:'',
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
      
      
    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  };

  const fetchClassView = async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const url = `${DIGITAL_CAMPUS_BASE_URL}/ViewAllHostelFeeStructure1`;
      const schoolData = await fetchCardDetailstoken(url, 'GET',null,token);
      setClasses(schoolData);
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
        feename: '',
        amount: '',
        category:'',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token') || undefined;
      const requestData = {
        id:newClass.id,
        feename: newClass.feename,
        amount: newClass.amount,
        category: newClass.category,
      };
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/AddHostelFeeStructure1`;
      const apiEndpointclassupdate = `${DIGITAL_CAMPUS_BASE_URL}/UpdateHostelFeeStructure1`;
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
 
  const handleyearSelect = (label: string, value: string) => {
    setNewClass((prev) => ({
      ...prev,
      year: value,
    })); 
  };
  const columns: readonly Column[] = [
    { id: 'year', label: 'year', minWidth: 100 },
    { id: 'fromyear', label: 'fromyear', minWidth: 80 },
    { id: 'toyear', label: 'toyear', minWidth: 100 },
    { id: 'amount', label: 'amount', minWidth: 100 },
    { id: 'discount', label: 'discount', minWidth: 100 },
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
      feename: data.feename,
      amount: data.amount,
      category: data.category,
    });
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOrgSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      schoolId: value,
    }));
  };
  const handlefromyearSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      batch: value,
    })); 
  };
  const handleCourseSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      courseId: value,
    }));
  };
  const handleInterviewRoundselect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      InterviewRound: value,
    }));
  };
 
  return (
    <>
 <Grid container spacing={3}>
 <Grid item xs={6} md={3}>
          <Collegedp onSelectOrg={handleOrgSelect} selectedOrg={selectedData.schoolId} />
        </Grid>
        <Grid item xs={6} md={3}>
          <Coursedp onSelectcourse={handleCourseSelect} selectedcourse={selectedData.courseId} orgid={selectedData.schoolId} />
        </Grid>
      
        <Grid item xs={6} md={4}>
       <Batchdp onSelectYear={handleyearSelect} selectedYear={selectedData.batch} />
        </Grid>
       <Grid item xs={6} md={4}>
       <InterviewRounddp onSelectInterviewRound={handleInterviewRoundselect} selectedInterviewRound={selectedData.InterviewRound}/>
       </Grid>
       
      </Grid>
    </>
  );
};

export default StudentinterviewperComponent;