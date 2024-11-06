import React, { useState,useEffect, ChangeEvent,useCallback } from 'react';
import { Grid, Button,IconButton,AlertColor,Checkbox,TextField,Paper,useMediaQuery,Table,styled,tableCellClasses,TablePagination,Box,CardContent,Card,CardActions,Typography,TableBody,TableCell,TableContainer,TableHead,TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomSnackbar from '@/components/CustomSnackbar';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';

interface Column {
    id: 'name'|'studentrollno'|'batchname' |'Action';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
  }
interface tblbatch {
  id: string;
  orgid: string;
  branchid: string;
  year: string;
  sem: string;
  studentrollno: string;
  batchname: string;
  acadamicid: string;
  deletestatus: string;
  name: string;
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
  interface studentdetails {
    id: number;
    studentrollno: string;
    name: string;
    feestatus:boolean;
    deletestatus: string;
  }
const CreateLabbatch: React.FC<NoofPeriodProps> = ({
    orgid,
    courseId,
    year,
    sem,
    branch,
    section,
    acadamicid
  }) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [classes, setClasses] = useState<tblbatch[]>([]);
  const [student, setstudent] = useState<studentdetails[]>([]);
  const [newClass, setNewClass] = useState<tblbatch>({
    id: '',
    orgid: '',
    branchid: '',
    year: '',
    sem: '',
    studentrollno: '',
    batchname: '',
    acadamicid: '',
    deletestatus: '',
    name: '',
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [Message, setMessage] = useState<string | null>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('error');
  const [selectedbatch, setSelectedbatch] = useState<string>('');
  const [selectAll, setSelectAll] = useState(false);
  const fetchClassView = useCallback(async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const Url = `${DIGITAL_CAMPUS_BASE_URL}/getByBatchtoAdmissionCounsellingbyParams?acadamicid=${acadamicid}&branchid=${branch}&section=${section}&year=${year}&sem=${sem}`;
      const data = await fetchCardDetailstoken(Url, 'GET',null,token);
      const filteredClasses = data.filter((college: any) => college.deletestatus === 'NA');
      setClasses(filteredClasses);
    } catch (error) {
      console.error('Error fetching class data:', error);
    }
  }, [acadamicid, branch, section, year, sem]);

  useEffect(() => {
    fetchClassView();
  }, [fetchClassView]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns: readonly Column[] = [
    { id: 'studentrollno', label: 'studentrollno', minWidth: 100 },
    { id: 'name', label: 'name', minWidth: 100 },
    { id: 'batchname', label: 'batchname', minWidth: 80 },
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

  const handleDelete = async (data: any) => {
    try {
      const requestData = {
        id: data.id,
        orgid: orgid,
        branchid: branch,
        year: data.year,
        sem: data.sem,
        acadamicid: acadamicid,
        studentrollno: data.studentrollno,
        batchname: data.batchname,
        deletestatus: 'Delete',
      };
      const token = localStorage.getItem('token') || undefined;
       const apiEndpointclassupdate = `${DIGITAL_CAMPUS_BASE_URL}/updateBatch`;
       const updatedData = await fetchCardDetailstoken(apiEndpointclassupdate, 'PUT', requestData,token);
       fetchClassView();
       const dele=data.studentrollno+' '+data.batchname+' ';
      setMessage(`${dele} Batch deleted successfully`);
      setSnackbarOpen(true);
      setSeverity('success');
      setTimeout(() => {
        setSnackbarOpen(false);
        setMessage(null);
      }, 5000);
    } catch (error: any) {
      console.error('Error handling delete:', error.message);
      setMessage(error.message);
      setSnackbarOpen(true);
      setSeverity('error');
      setTimeout(() => {
        setSnackbarOpen(false);
        setMessage(null);
      }, 10000);
    }
  };
  
  const populateFormFields = (data: any) => {
    setNewClass({
      id: data.id,
      orgid:data.orgid,
      branchid:data.branchid,
      year:data.year,
      sem:data.sem,
      acadamicid:data.acadamicid,
      studentrollno:data.studentrollno,
      batchname: data.batchname,
      name:data.name,
      deletestatus:'Delete',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setMessage(null);
  };

  const handleGenerateJSON = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token') || undefined;
      const fee = student.filter((classItem) => classItem.feestatus);
      
      const attendanceData = fee.map((fee) => ({
        id: '0',
        orgid: orgid,
        branchid: branch,
        year: year,
        sem: sem,
        studentrollno: fee.studentrollno,
        batchname: selectedbatch,
        acadamicid: acadamicid,
        deletestatus:'NA',
      }));
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/BatchBulkSave`;
      const apiEndpointclassupdate = `${DIGITAL_CAMPUS_BASE_URL}/updateBatch`;
      if (newClass.id) {
        const updatedData = await fetchCardDetailstoken(apiEndpointclassupdate, 'PUT', attendanceData,token);
        fetchClassView();
        setMessage(updatedData);
        setSnackbarOpen(true);
        setSeverity('success');
        setTimeout(() => {
          setSnackbarOpen(false);
          setMessage(null);
        }, 5000);
      } else {
        const registeredData = await fetchCardDetailstoken(apiEndpoint, 'POST', attendanceData,token);
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
  const handleChangePeriodCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedbatch(value);
  };

  const handleGet = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token') || undefined;
    const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/getByPromotionsbyParams?branchid=${branch}&acadamicid=${acadamicid}&sem=${sem}&year=${year}&section=${section}`;
    const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
    setstudent(fetchedData);
  };

  const handleSelectAllChange = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll);
    setstudent((prevStudents) =>
      prevStudents.map((student) => ({ ...student, feestatus: !selectAll }))
    );
  };
  const handleCheckboxChange = (index: number) => {
    setstudent((prevStudents) => {
      const updatedStudents = [...prevStudents];
      updatedStudents[index] = {
        ...updatedStudents[index],
        feestatus: !updatedStudents[index].feestatus,
      };
      return updatedStudents;
    });
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
      <Typography variant="h5" fontWeight="bold" >Create Lab Batch Details</Typography>
      </Box>
    </Box>
    <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
        <TextField
            label="Batch"
            value={selectedbatch}
            onChange={handleChangePeriodCount}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <Button variant="contained" color="primary" onClick={handleGet}>
          Get Student Details
          </Button>
        </Grid>
        <Grid item xs={12} md={12}>
        {student.length > 0 ? (
 <>
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
              <Checkbox
              checked={selectAll}
              onChange={handleSelectAllChange}
              color="secondary"
            />
              </StyledTableCell>
   </StyledTableRow>
</TableHead>
<TableBody>
   {student.map((classItem,index) => (
     <TableRow key={index}>
       <TableCell align="center">{classItem.studentrollno}</TableCell>
       <TableCell align="center">{classItem.name}</TableCell>
            <TableCell>
       <Checkbox
checked={classItem.feestatus || false}
onChange={() => handleCheckboxChange(index)}
/>
            </TableCell>
     </TableRow>
   ))}
 </TableBody>
</Table>
</TableContainer>
<Button variant="contained" color="primary" onClick={handleGenerateJSON}>Submit</Button>
 </>
      ):(null)}
       

        </Grid>
      </Grid>

      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <Box flexGrow={1} textAlign="center">
      <Typography variant="h5" fontWeight="bold" >Lab Batch Details</Typography>
      </Box>
    </Box>
{isSmallScreen ? (
  classes.map((classItem) => (
    <Card key={classItem.id} style={{ margin: '10px', minWidth: 275 }}>
      <CardContent>
      <Typography variant="h6">ID: {classItem.id}</Typography>
      <Typography variant="body1">name: {classItem.name}</Typography>
      <Typography variant="body1">studentrollno: {classItem.studentrollno}</Typography>
      <Typography variant="body1">batchname: {classItem.batchname}</Typography>
    </CardContent>
    <CardActions>
      {/* <Button  onClick={() => handleEdit(classItem)}>Edit</Button> */}
      <Button onClick={() => handleDelete(classItem)}>Delete</Button>
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
             <TableCell>{classItem.studentrollno}</TableCell>
          <TableCell>{classItem.name}</TableCell>
          <TableCell>{classItem.batchname}</TableCell>
          <TableCell>
          {/* <IconButton onClick={() => handleEdit(classItem)} aria-label="edit">
    <EditIcon />
  </IconButton> */}
  <IconButton onClick={() => handleDelete(classItem)} aria-label="delete">
    <DeleteIcon />
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
    </>
  );
};

export default CreateLabbatch;