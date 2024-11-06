import React, { useState,useEffect, ChangeEvent } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Grid, Button,IconButton,AlertColor,TextField,Table,styled,Paper,useMediaQuery,tableCellClasses,TablePagination,Box,CardContent,Card,CardActions,Typography,TableBody,TableCell,TableContainer,TableHead,TableRow } from '@mui/material';
import DateGenerator from '../DateGenerator';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomSnackbar from '@/components/CustomSnackbar';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL} from '@/modules/apiConfig';
interface Column {
    id: 'noofperiod'|'startingtime'|'endingtime' | 'breaktime'|'launch'|'Action';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
  }
interface tblnoofperiods {
  id: string;
  orgid: string;
  courseid: string;
  branchid: string;
  section: string;
  noofperiod: number;
  acadamicid: string;
  year: string;
  sem: string;
  startingtime: string;
  endingtime: string;
  breaktime: string;
  launch: string;
}

interface GeneratedDate {
  date: string;
  day: string;
  subjectName: string;
  subjectCode: string;
  period: string;
  batchName: string;
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
const NoofPeriod: React.FC<NoofPeriodProps> = ({
    orgid,
    courseId,
    year,
    sem,
    branch,
    section,
    acadamicid
  }) => {
  const [tblPeriods, setTblPeriods] = useState<tblnoofperiods>({
    id: '',
    orgid: '',
    courseid: '',
    branchid: '',
    section: '',
    noofperiod: 0,
    acadamicid: '',
    year: '',
    sem: '',
    startingtime: '',
    endingtime: '',
    breaktime: '',
    launch: '',
  });
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [classes, setClasses] = useState<tblnoofperiods[]>([]);
  const [newClass, setNewClass] = useState<tblnoofperiods>({
    id: '',
    orgid: '',
    courseid: '',
    branchid: '',
    section: '',
    noofperiod: 0,
    acadamicid: '',
    year: '',
    sem: '',
    startingtime: '',
    endingtime: '',
    breaktime: '',
    launch: '',
  });
  const [generatedDates, setGeneratedDates] = useState<GeneratedDate[]>([]);
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
      const Url = `${DIGITAL_CAMPUS_BASE_URL}/tblnoofperiodsview`;
      const data = await fetchCardDetailstoken(Url, 'GET', null,token);
      const filteredstaff= data.filter((college: any) => college.orgid  === orgid && college.courseid===courseId && college.branchid===branch && college.section===section && college.year===year && college.sem===sem
    && college.acadamicid===acadamicid);
    setClasses(filteredstaff);
  
    } catch (error) {
      console.error('Error fetching class data:', error);
      alert(error);
    }
  };
  const handleChangeTime = (time: Dayjs | null, field: keyof tblnoofperiods) => {
    if (time) {
      const formattedTime = dayjs(time).format('HH:mm:ss');
      setNewClass((prev) => ({
        ...prev,
        [field]: formattedTime,
      }));
    } else {
        setNewClass((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleChangePeriodCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Check if the value is a number or empty (allowing deletion)
    if (/^\d*$/.test(value) || value === '') {
        setNewClass((prev) => ({
        ...prev,
        noofperiod: parseInt(value, 10),
      }));
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
    { id: 'noofperiod', label: 'noofperiod', minWidth: 100 },
    { id: 'startingtime', label: 'Starting Time', minWidth: 100 },
    { id: 'endingtime', label: 'Ending Time', minWidth: 80 },
    { id: 'breaktime', label: 'Break Time', minWidth: 100 },
    { id: 'launch', label: 'Launch', minWidth: 100 },
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
      orgid:data.orgid,
      courseid:data.courseid,
      branchid:data.branchid,
      section:data.section,
      acadamicid:data.acadamicid,
      year:data.year,
      sem:data.sem,
      startingtime: data.startingtime,
      endingtime: data.endingtime,
      breaktime: data.breaktime,
      launch:data.launch,
      noofperiod:data.noofperiod,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setMessage(null);
  };

  
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token') || undefined;
      const requestData = {
        id: newClass.id,
        orgid: orgid,
        courseid: courseId,
        branchid: branch,
        section: section,
        acadamicid: acadamicid,
        year: year,
        sem: sem,
        startingtime: newClass.startingtime,
        endingtime: newClass.endingtime,
        breaktime: newClass.breaktime,
        launch: newClass.launch,
        noofperiod: newClass.noofperiod,
      };
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/tblnoofperiods`;
      const apiEndpointclassupdate = `${DIGITAL_CAMPUS_BASE_URL}/tblnoofperiodsupdate`;
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
      <Typography variant="h5" fontWeight="bold" >No of Period Details</Typography>
      </Box>
    </Box>
    <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker
                label="Period Starting Time"
                value={newClass.startingtime ? dayjs(newClass.startingtime, 'HH:mm:ss') : null}
                onChange={(date) => handleChangeTime(date, 'startingtime')}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} md={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker
                label="Period Ending Time"
                value={newClass.endingtime ? dayjs(newClass.endingtime, 'HH:mm:ss') : null}
                onChange={(date) => handleChangeTime(date, 'endingtime')}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} md={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker
                label="Break Time"
                value={newClass.breaktime ? dayjs(newClass.breaktime, 'HH:mm:ss') : null}
                onChange={(date) => handleChangeTime(date, 'breaktime')}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} md={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker
                label="Launch Time"
                value={newClass.launch ? dayjs(newClass.launch, 'HH:mm:ss') : null}
                onChange={(date) => handleChangeTime(date, 'launch')}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            label="Number of Periods"
            value={newClass.noofperiod}
            onChange={handleChangePeriodCount}
            fullWidth
          />
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
      <Typography variant="h6">noofperiod: {classItem.noofperiod}</Typography>
      <Typography variant="body1">STARTING TIME: {classItem.startingtime}</Typography>
      <Typography variant="body1">ENDING TIME: {classItem.endingtime}</Typography>
      <Typography variant="body1">BREAKTIME: {classItem.breaktime}</Typography>
      <Typography variant="body1">LAUNCH: {classItem.launch}</Typography>
    </CardContent>
    <CardActions>
      <Button onClick={() => handleEdit(classItem)}>Edit</Button>
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
             <TableCell>{classItem.noofperiod}</TableCell>
          <TableCell>{classItem.startingtime}</TableCell>
          <TableCell>{classItem.endingtime}</TableCell>
          <TableCell>{classItem.breaktime}</TableCell>
          <TableCell>{classItem.launch}</TableCell>
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

export default NoofPeriod;