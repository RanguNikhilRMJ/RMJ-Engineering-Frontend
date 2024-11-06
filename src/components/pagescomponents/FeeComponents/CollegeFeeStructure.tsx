"use client"
import React, { useState, useEffect,ChangeEvent} from 'react';
import { Grid,TextField, Button, AlertColor,useMediaQuery,IconButton,Paper,styled,tableCellClasses,Table,TablePagination,Box,CardContent,Card,CardActions,Typography,TableBody,TableCell,TableContainer,TableHead,TableRow,Dialog,DialogActions,DialogTitle,DialogContent,DialogContentText } from '@mui/material';
import CustomSnackbar from "@/components/CustomSnackbar";
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import Fromyeardp from '@/components/dropdown/Fromyeardp';
import Collegedp from '@/components/dropdown/Collegedp';
import Coursedp from '@/components/dropdown/Coursedp';
import EditIcon from '@mui/icons-material/Edit';
import Yearlistdp from '@/components/dropdown/Yearlistdp';

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
  year: string;
  coursetype:string;
  batch:string;
  feestructure:string;
}
const CollegeFeeStructure: React.FC = () => {
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
    year: '',
    coursetype:'',
    batch:'',
    feestructure:'',
  });
  useEffect(() => {
    const usertype = localStorage.getItem('usertype');
    fetchClassView();
  }, []);

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
      <Typography variant="h5" fontWeight="bold" >College Fee Structure Details</Typography>
      </Box>
      <Button onClick={() => setIsDialogOpen(true)} variant="outlined" color="primary">
        Add
      </Button>
    </Box>
     
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
      <Typography variant="body1">feename: {classItem.feename}</Typography>
      <Typography variant="body1">amount: {classItem.amount}</Typography>
      <Typography variant="body1">category: {classItem.category}</Typography>
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
          <TableCell>{classItem.feename}</TableCell>
          <TableCell>{classItem.amount}</TableCell>
          <TableCell>{classItem.category}</TableCell>
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
  {newClass.id ? 'Fee  Details' : 'Register'}
  </DialogTitle>
  <DialogContent>
  <form onSubmit={handleSubmit}>
  <DialogContentText id="dialog-description">
    <br></br>
 <Grid container spacing={3}>
 <Grid item xs={6} md={3}>
          <Collegedp onSelectOrg={handleOrgSelect} selectedOrg={selectedData.schoolId} />
        </Grid>
        <Grid item xs={6} md={3}>
          <Coursedp onSelectcourse={handleCourseSelect} selectedcourse={selectedData.courseId} orgid={selectedData.schoolId} />
        </Grid>
        <Grid item xs={6} md={4}>
        <Fromyeardp onSelectYear={handlefromyearSelect} selectedYear={selectedData.batch} />
        </Grid>
        <Grid item xs={6} md={4}>
       <Yearlistdp onSelectYear={handleyearSelect} selectedYear={selectedData.year} />
        </Grid>
       <Grid item xs={6} md={4}>
       <TextField
      label="Amount"
      value={newClass.amount}
      fullWidth
       type="number"
      onChange={(e) =>
        setNewClass({ ...newClass, amount: e.target.value })
      }
      required margin="normal" sx={{ fontSize: '14px', mr: 2  }}
    />
  
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
    </>
  );
};

export default CollegeFeeStructure;