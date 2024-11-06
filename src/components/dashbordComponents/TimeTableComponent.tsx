import React, { useState, forwardRef, useEffect } from 'react';
import {
  Grid,Card,CardHeader,CardContent,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,useTheme,
  Dialog,DialogTitle,DialogContent,Button,AlertColor,AppBar,Toolbar,IconButton,Slide,SlideProps,tableCellClasses,styled,Box,Checkbox} from '@mui/material';
import { RingLoader} from 'react-spinners';
import CloseIcon from '@mui/icons-material/Close';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import CustomSnackbar from '../CustomSnackbar';
const Transition = forwardRef(function Transition(
  props: SlideProps & { children: React.ReactElement },
  ref
) {
  const { children, ...other } = props;
  return <Slide direction="up" ref={ref} {...other}>{children}</Slide>;
});

interface TimeTableProps {
  hedding: string;
}
interface PostAtt {
  id: string;
  studentrollno: string;
  subjectcode:string;
  name:string;
  AttendanceStatus: boolean;
}

interface Timetable {
  id: string;
  orgid: string;
  courseid: string;
  branchid: string;
  section: string;
  year: string;
  sem: string;
  subjectcode: string;
  subjectname: string;
  period: string;
  batchname: string;
  type: string;
  status: string;
  branchshortname: string;
  acadamicid:string;
}

const TimeTableComponent: React.FC<TimeTableProps> = ({ hedding }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [subjectData, setSubjectData] = useState<Timetable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Timetable | null>(null);
  const [Message, setMessage] = useState<string | null>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('error');
  useEffect(() => {
    fetchClassView(selectedDate);
  }, [selectedDate]);
  const [classes, setClasses] = useState<PostAtt[]>([
    {  id:'',
      studentrollno:'',
      subjectcode:'',
    AttendanceStatus:false,
    name:''
  },
  ]);
  const fetchClassView = async (date: Dayjs | null) => {
    try {
      const username = localStorage.getItem('username');
      const formattedDate = date ? date.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
      const classUrl = `${DIGITAL_CAMPUS_BASE_URL}/getAttendancePostingStatus?date=${formattedDate}&facultyid=${username}`;
      const orgUrl = `${DIGITAL_CAMPUS_BASE_URL}/tblbranchdtls`;
      const token = localStorage.getItem('token') || undefined;
      const [classData, orgData] = await Promise.all([
        fetchCardDetailstoken(classUrl, 'GET',null,token),
        fetchCardDetailstoken(orgUrl, 'GET',null,token),
      ]);
      
      const joinedClassDetails = classData
        .filter((classItem: Timetable) =>
          orgData.some((org: Timetable) => org.branchid === classItem.branchid)
        )
        .map((classItem: Timetable) => {
          const correspondingOrg = orgData.find(
            (org: Timetable) => org.branchid === classItem.branchid
          );

          return correspondingOrg
            ? { ...classItem, branchshortname: correspondingOrg.branchshortname }
            : classItem;
        });
      setSubjectData(joinedClassDetails);
    } catch (error) {
      console.error('Error fetching class data:', error);
    }
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor:"#874CCC",
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
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeDate = (date: Dayjs | null) => {
    setSelectedDate(date);
    setSelectedRow(null);
  };
  const handleSelectAllChange = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll);
    setClasses((prevStudents) =>
      prevStudents.map((student) => ({ ...student, AttendanceStatus: !selectAll }))
    );
  };
  const handleCheckboxChange = (index: number) => {
    setClasses((prevStudents) => {
      const updatedStudents = [...prevStudents];
      updatedStudents[index] = {
        ...updatedStudents[index],
        AttendanceStatus: !updatedStudents[index].AttendanceStatus,
      };
      return updatedStudents;
    });
  };
  const handlePendingClick = async (classItem: Timetable) => {
    setIsLoading(true);
    setSelectedRow(classItem);
    await fetchstudentView(classItem);
    setIsLoading(false);
    if (!open) {
      setOpen(true);
    }
  };

  const fetchstudentView = async (classItem: Timetable) => {
    try {
      const token = localStorage.getItem('token') || undefined;
    const baseUrl = `${DIGITAL_CAMPUS_BASE_URL}/`;
    const endpoint = classItem.batchname === "All" 
      ? `PostAttendance?year=${classItem.year}&sem=${classItem.sem}&branchid=${classItem.branchid}&section=${classItem.section}&acadamicid=${classItem.acadamicid}&subjectcode=${classItem.subjectcode}`
      : `postlabstudentattendence?year=${classItem.year}&sem=${classItem.sem}&branchid=${classItem.branchid}&section=${classItem.section}&acadamicid=${classItem.acadamicid}&subjectcode=${classItem.subjectcode}&batchname=${classItem.batchname}`;
    
    const url = baseUrl + endpoint;
    const data = await fetchCardDetailstoken(url, 'GET', null, token);
    setClasses(data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };
  function formatDateToCustomFormat(date:any) {
    const day = String(date.getDate()).padStart(2, '0'); // Get the day, pad if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    const year = date.getFullYear();
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }
  const handleGenerateJSON =async () => {
    try {
      const formattedDate = formatDateToCustomFormat(new Date());
      const token = localStorage.getItem('token') || undefined;
      const year = selectedRow?.year;
    const sem = selectedRow?.sem;
    const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/Attandance${year}Year${sem}SemBulkSave`;

      const attendanceData = classes.map((student) => ({
        orgid: selectedRow?.orgid,
        courseid:selectedRow?.courseid,
        branchid:selectedRow?.branchid,
        year:selectedRow?.year,
        sem:selectedRow?.sem,
        studentrollno: student.studentrollno,
        section:selectedRow?.section,
        subjectcode:selectedRow?.subjectcode,
        period:selectedRow?.period,
        attendencestatus: student.AttendanceStatus? 'Present' : 'Absent',
        attendencedate: selectedDate ? selectedDate.format('YYYY-MM-DD'):'',
        acadamicid:selectedRow?.acadamicid,
       classtype:"offline",
       atttype:"web",
       datetime:formattedDate,
      }));
      console.log(attendanceData);
      const registeredData = await fetchCardDetailstoken(apiEndpoint, 'POST', attendanceData,token);
      setMessage(registeredData);
      setSnackbarOpen(true);
      setSeverity('success');
      setTimeout(() => {
        setSnackbarOpen(false);
        setMessage(null);
      }, 5000); 
      fetchClassView(selectedDate);
      setClasses([]);
    } catch (error: any) {
      console.error('Error handling form submission:', error.message);
      setMessage(error.message);
      setSnackbarOpen(true);
      setSeverity('error');
      setTimeout(() => {
        setSnackbarOpen(false);
        setMessage(null);
      }, 6000); 
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setMessage(null);
  };
  return (
   <>
    <CustomSnackbar
    open={isSnackbarOpen}
    onClose={handleCloseSnackbar}
    severity={severity}
    message={Message}
  />
    <Card sx={{ boxShadow: theme.shadows[3], backgroundColor: "#f9f9f9" }}>
      <Grid container>
      <Grid item xs={9}>
          <CardHeader
            title={<Typography variant="h5" color="text.primary" sx={{ fontWeight: 'bold' }}>{hedding}</Typography>}
            subheader={
              <Typography variant="body2" color="text.secondary">
              {selectedDate && dayjs(selectedDate).isSame(dayjs(), 'day')
                ? `Today Your Time Table - Date: ${selectedDate.format('YYYY-MM-DD')}`
                : `Your previous Day time table (${selectedDate ? selectedDate.format('YYYY-MM-DD') : 'Date display here'})`}
            </Typography>
            }
          />
        </Grid>
        <Grid item xs={3}>
          <div onClick={handleClickOpen} style={{ width: "80px", height: "30px", border: "1px solid black", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>More▽</Typography>
          </div>
        </Grid>
      </Grid>

      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{backgroundColor: "rgb(46 32 59)" }}>
              <TableRow>
                <TableCell sx={{ fontWeight:"bold",color:"white" }}>Branch</TableCell>
                <TableCell sx={{ fontWeight:"bold",color:"white" }}>Year & Sem</TableCell>
                <TableCell sx={{ fontWeight:"bold",color:"white" }}>Subject</TableCell>
                <TableCell sx={{ fontWeight:"bold",color:"white" }}>Period</TableCell>
                <TableCell sx={{ fontWeight:"bold",color:"white" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjectData.map((classItem, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{classItem.branchshortname} - {classItem.section}</TableCell>
                  <TableCell align="center">{classItem.year}- {classItem.sem}</TableCell>
                  <TableCell align="center">{classItem.subjectname} - {classItem.batchname}</TableCell>
                  <TableCell align="center">{classItem.period}</TableCell>
                  <TableCell align="center">
                          {classItem.status.toLowerCase() === 'pending' ? (
                            <Button variant="contained" color="primary" onClick={() => handlePendingClick(classItem)}>
                              pending
                            </Button>
                          ) : (
                            <Typography variant="body2" color="textSecondary">
                              {classItem.status}
                            </Typography>
                          )}
                        </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <Dialog open={open} onClose={handleClose} fullScreen TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative', backgroundColor: "#374151" }}>
          <Toolbar>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {hedding}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogTitle>{hedding}</DialogTitle>
        <DialogContent>
         
        <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    label="Select Date"
                    name="Date"
                    value={selectedDate ? dayjs(selectedDate) : null}
                    onChange={(date: Dayjs | null) => handleChangeDate(date)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs>
              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                  <TableHead sx={{ backgroundColor: "rgb(46, 32, 59)" }}>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>Branch</TableCell>
                      <TableCell sx={{ color: "white" }}>Year & Sem</TableCell>
                      <TableCell sx={{ color: "white" }}>Subject</TableCell>
                      <TableCell sx={{ color: "white" }}>Period</TableCell>
                      <TableCell sx={{ color: "white" }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subjectData.map((classItem, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{classItem.branchshortname} - {classItem.section}</TableCell>
                        <TableCell align="center">{classItem.year}- {classItem.sem}</TableCell>
                        <TableCell align="center">{classItem.subjectname} - {classItem.batchname}</TableCell>
                        <TableCell align="center">{classItem.period}</TableCell>
                        <TableCell align="center">
                          {classItem.status.toLowerCase() === 'pending' ? (
                            <Button variant="contained" color="primary" onClick={() => handlePendingClick(classItem)}>
                              pending
                            </Button>
                          ) : (
                            <Typography variant="body2" color="textSecondary">
                              {classItem.status}
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
            <RingLoader color="#1976D2" loading={isLoading} />
          </Box>
        ) :(
          <>
          {selectedRow && (
    <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 2 }}>
      Branch: {selectedRow.branchshortname}, Section: {selectedRow.section}, Year: {selectedRow.year}, Sem: {selectedRow.sem}, Period: {selectedRow.period}, Subjectname: {selectedRow.subjectname}, Date: {selectedDate ? selectedDate.format('YYYY-MM-DD') : 'N/A'}
    </Typography>
  )}
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
             <TableContainer sx={{ maxHeight: 440 }}>
                     <Table stickyHeader aria-label="sticky table customized" >
              <TableHead>
              <StyledTableRow>
                            <StyledTableCell align="center">
                              StudentRollno
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Name
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              AttendanceStatus
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
                 {classes.map((classItem,index) => (
                   <TableRow key={index}>
                     <TableCell>{classItem.studentrollno}</TableCell>
                     <TableCell>{classItem.name} {classItem.name}</TableCell>
                     <TableCell>{classItem.AttendanceStatus ? 'Present' : 'Absent'}</TableCell>
                     <TableCell>
                     <Checkbox
  checked={classItem.AttendanceStatus || false}
  onChange={() => handleCheckboxChange(index)}
/>

                          </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
            </Table>
           
          </TableContainer>
          <Button variant="contained" color="primary" onClick={handleGenerateJSON}>Submit</Button>
          </Paper>
          </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
   </>
  );
};

export default TimeTableComponent;