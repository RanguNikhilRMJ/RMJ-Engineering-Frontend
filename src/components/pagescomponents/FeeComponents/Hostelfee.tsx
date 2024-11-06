"use client"
import React, { useState, useEffect,ChangeEvent} from 'react';
import { Grid,TextField, Button, AlertColor,useMediaQuery,IconButton,Paper,styled,tableCellClasses,Table,TablePagination,Box,CardContent,Card,CardActions,Typography,TableBody,TableCell,TableContainer,TableHead,TableRow,Dialog,DialogActions,DialogTitle,DialogContent,DialogContentText } from '@mui/material';
import CustomSnackbar from "@/components/CustomSnackbar";
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import Fromyeardp from '@/components/dropdown/Fromyeardp';
import Toyeardp from '@/components/dropdown/Toyeardp';
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
  fromyear: string;
  toyear: string;
  amount: string;
  discount: string;
  year:string;
}

const Hostelfee: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [newClass, setNewClass] = useState<Class>({
    id: '',
    fromyear: '',
    toyear: '',
    amount: '',
    discount: '',
    year:'',
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
        fromyear: '',
        toyear: '',
        amount: '',
        discount: '',
        year:'',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token') || undefined;
      const requestData = {
        id:newClass.id,
        fromyear: newClass.fromyear,
        toyear: newClass.toyear,
        amount: newClass.amount,
        discount: newClass.discount,
        year:newClass.year,
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
  const handlefromyearSelect = (label: string, value: string) => {
    setNewClass((prev) => ({
      ...prev,
      fromyear: value,
    })); 
  };
  const handletoyearSelect = (label: string, value: string) => {
    setNewClass((prev) => ({
      ...prev,
      toyear: value,
    })); 
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
      fromyear: data.fromyear,
      toyear: data.toyear,
      amount: data.amount,
      discount: data.discount,
      year:data.year,
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
    <CustomSnackbar
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        severity={severity}
        message={Message}
      />
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <Box flexGrow={1} textAlign="center">
      <Typography variant="h5" fontWeight="bold" >Hostel Fee Structure Details</Typography>
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
      <Typography variant="body1">year: {classItem.year}</Typography>
      <Typography variant="body1">From Year: {classItem.fromyear}</Typography>
      <Typography variant="body1">To Year: {classItem.toyear}</Typography>
      <Typography variant="body1">Amount: {classItem.amount}</Typography>
      <Typography variant="body1">Discount: {classItem.discount}</Typography>
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
          <TableCell>{classItem.fromyear}</TableCell>
          <TableCell>{classItem.toyear}</TableCell>
          <TableCell>{classItem.amount}</TableCell>
          <TableCell>{classItem.discount}</TableCell>
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
  {newClass.id ? 'Selected Hostel Fee Details' : 'Register'}
  </DialogTitle>
  <DialogContent>
  <form onSubmit={handleSubmit}>
  <DialogContentText id="dialog-description">
    <br></br>
 <Grid container spacing={3}>
        <Grid item xs={6} md={4}>
        <Fromyeardp onSelectYear={handlefromyearSelect} selectedYear={newClass.fromyear} />
        </Grid>
        <Grid item xs={6} md={4}>
       <Toyeardp onSelectYear={handletoyearSelect} selectedYear={newClass.toyear}/>
        </Grid>
        <Grid item xs={6} md={4}>
       <Yearlistdp onSelectYear={handleyearSelect} selectedYear={newClass.year} />
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
       <Grid item xs={6} md={4}>
       <TextField
      label="Discount"
       type="number"
      value={newClass.discount}
      onChange={(e) =>
        setNewClass({ ...newClass, discount: e.target.value })
      }
      fullWidth
      required margin="normal" sx={{ fontSize: '14px' }}
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

export default Hostelfee;
