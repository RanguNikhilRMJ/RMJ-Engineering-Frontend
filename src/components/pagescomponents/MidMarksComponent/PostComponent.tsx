import React, { useState,useEffect,forwardRef,useCallback } from 'react';
import {Slide,SlideProps,DialogContent,Toolbar,DialogTitle,AppBar,Dialog,Grid, Button,IconButton,AlertColor,Checkbox,TextField,Paper,useMediaQuery,Table,styled,tableCellClasses,TablePagination,Box,CardContent,Card,CardActions,Typography,TableBody,TableCell,TableContainer,TableHead,TableRow } from '@mui/material';
import { RingLoader} from 'react-spinners';
import CloseIcon from '@mui/icons-material/Close';
import CustomSnackbar from '@/components/CustomSnackbar';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
const Transition = forwardRef(function Transition(
    props: SlideProps & { children: React.ReactElement },
    ref
  ) {
    const { children, ...other } = props;
    return <Slide direction="up" ref={ref} {...other}>{children}</Slide>;
  });
interface Column {
    id: 'subjectname'|'regulationname'|'batchname' |'branchname' |'Action';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
  }
  interface GetsubjectDetails {
    id: number;
    subjectcode: string;
    branchid: number;
    branchname: string;
    year: number;
    sem: number;
    section: string;
    acadamicid: number;
    facultyid: string;
    employeename: string;
    deletestatus: string;
    batchname: string;
    subjectname: string;
    regulationname: string;
    courseid: number;
    orgid: number;
    batch: number;
  }
  interface StudentDetails {
    id: number;
    midid: number;
    coursetype: string;
    studentrollno: string;
    name: string;
    branchid: number;
    year: number;
    sem: number;
    acadamicid: number;
    subjectcode: string;
    section: string;
    batch: number;
   marks: string;
   status:string;
  }

const PostComponent: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [classes, setClasses] = useState<GetsubjectDetails[]>([]);
    const [stpostbulk, setstpostbulk] = useState<StudentDetails[]>([]);
    const [stpost, setstpost] = useState<StudentDetails[]>([]);
    const [selectedRow, setSelectedRow] = useState<GetsubjectDetails | null>(null);
    const [Message, setMessage] = useState<string | null>(null);
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState<AlertColor>('error');
    const [isLoading, setIsLoading] = useState(true);
    const [regulationvalue, setregulation] = useState<string | null>('');
    const [year, setyear] = useState<number | null>(null);
    const [sem, setsem] = useState<number | null>(null);
    const [mid, setmid] = useState<number | null>(null);
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
        setMessage(null);
      };
    const fetchClassView = useCallback(async () => {
        try {
            const username = localStorage.getItem('username')|| '';
          const token = localStorage.getItem('token') || undefined;
          const Url = `${DIGITAL_CAMPUS_BASE_URL}/viewStudenttofacultyDetails`;
          const data = await fetchCardDetailstoken(Url, 'GET',null,token);
          const filteredClasses = data.filter((college: any) => college.facultyid === username);
          setClasses(filteredClasses);
        } catch (error) {
          console.error('Error fetching class data:', error);
        }
      }, []);
    
      useEffect(() => {
        fetchClassView();
      }, [fetchClassView]);
      const columns: readonly Column[] = [
        { id: 'subjectname', label: 'Subject Name', minWidth: 100 },
        { id: 'regulationname', label: 'Regulation', minWidth: 100 },
        { id: 'batchname', label: 'Batch Name', minWidth: 80 },
        { id: 'branchname', label: 'Branch', minWidth: 80 },
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
        // hide last border setstpost
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      const isSmallScreen = useMediaQuery('(max-width:600px)');
      const handleClose = () => {
        setOpen(false);
        setstpostbulk([]);
        setstpost([]);
        setSelectedRow(null);
      };
      const handleOpenDialog = (row: GetsubjectDetails) => {
        setmid(1);
        fetchstudentView(row,"viewmid1marks");
        setSelectedRow(row);
        setOpen(true);
      };
      const handleOpenDialog2 = (row: GetsubjectDetails) => {
        fetchstudentView(row,"viewmid2marks");
        setSelectedRow(row);
        setOpen(true);
      };
      const fetchstudentView = async (classItem: GetsubjectDetails,apiname: string) => {
        try {
        const token = localStorage.getItem('token') || undefined;
        const baseUrl = `${DIGITAL_CAMPUS_BASE_URL}/`;
        setyear(classItem.year);
        setsem(classItem.sem);
        setregulation(classItem.regulationname);
        const endpoint = `${apiname}?branchid=${classItem.branchid}&year=${classItem.year}&sem=${classItem.sem}&section=${classItem.section}&subjectcode=${classItem.subjectcode}&acadamicid=${classItem.acadamicid}`;
        const url = baseUrl + endpoint;
        const data = await fetchCardDetailstoken(url, 'GET', null, token);
        console.log(data);
        setstpost(data);
        setIsLoading(false);
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      };

      const handleInputChange = (index: number, value: string | number) => {
        setstpost((prevStudents) => {
          const updatedStudents = [...prevStudents];
          updatedStudents[index] = {
            ...updatedStudents[index],
            marks: value.toString(), // Convert to string
          };
          return updatedStudents;
        });
      };

      const handleGenerateJSON = async () => {
        const username = localStorage.getItem('username')|| '';
        const insertData: StudentDetails[] = [];
        const updateData: StudentDetails[] = [];
        const attendanceData = stpost.map((student) => ({
          id:student.midid,
          studentrollno: student.studentrollno,
          batch: student.batch,
          regulation: regulationvalue,
          securedmarks: student.marks,
          maxmarks: student.marks,
          branchid:student.branchid,
          subjectcode:student.subjectcode,
          year:student.year,
          sem:student.sem,
          section:student.section,
          facultyid: username,
          acadamicid:student.acadamicid,
          name:student.name,
          coursetype:student.coursetype,
        }));
        const attendanceData1 = attendanceData.map((student) => {
          const inputFieldValue = student.securedmarks as string;
          if (
            (typeof inputFieldValue === 'string' &&
              ['Mp', 'mp', 'mP', 'MP', 'AB', 'ab', 'Ab', 'aB'].includes(
                inputFieldValue.toUpperCase()
              )) ||
            typeof inputFieldValue === 'number' ||
            (typeof inputFieldValue === 'string' && !isNaN(parseFloat(inputFieldValue)))
          ) {
            const securedMarksValue =
              typeof student.securedmarks === 'string' ? 0 : parseFloat(student.securedmarks);
            const inputFieldValue1 = student.securedmarks as string;
            let grade = 'NA';
            let gradepoint = '0';
            let stauts = 'NA';
            let markssc = '0';
            let remarks='Fail';
            if (['AB', 'ab', 'mp', 'Mp', 'mP', 'MP'].includes(inputFieldValue1)) {
              grade = 'E';
              stauts=inputFieldValue1;
              markssc='0';
              remarks=inputFieldValue1;
            } else{
                stauts='';
                markssc=student.securedmarks;
            }
            if (student.id > 0) {
              updateData.push({
                id: student.id,
                midid:student.id,
                coursetype:student.coursetype,
                name:student.name,
                acadamicid:student.acadamicid,
                batch:student.batch,
                branchid:student.branchid,
                year:student.year,
                sem:student.sem,
                section:student.section,
                studentrollno: student.studentrollno,
                subjectcode:student.subjectcode,
                marks: markssc,
                status: stauts
              });
            }
             else {
              insertData.push({
                id: student.id,
                midid:student.id,
                coursetype:'',
                name:'',
                acadamicid:student.acadamicid,
                batch:student.batch,
                branchid:student.branchid,
                year:student.year,
                sem:student.sem,
                section:student.section,
                studentrollno: student.studentrollno,
                subjectcode:student.subjectcode,
                marks: markssc,
                status: stauts
              });
            }
            return {
                id: student.id,
                batch:student.batch,
                regulation:student.regulation,
                branchid:student.branchid,
                year:student.year,
                sem:student.sem,
                section:student.section,
                studentrollno: student.studentrollno,
                subjectcode:student.subjectcode,
                maxmarks: parseFloat(student.maxmarks),
                scoredmarks: markssc,
                status: stauts,
                facultyid: student.facultyid,
                examtype: 'Mid',
                examid: 0,
            };
          } else {
            setMessage('Please enter a correct value (Mp or AB), integer, or float.');
            setSnackbarOpen(true);
            setTimeout(() => {
              setSnackbarOpen(false);
              setMessage(null);
            }, 3000);
            return null;
          }
        });
        if (insertData.length > 0) {
          const attendanceDataINSERT = insertData.map((student) => ({
            id: student.id,
            batch:student.batch,
            regulation:regulationvalue,
            branchid:student.branchid,
            year:student.year,
            sem:student.sem,
            section:student.section,
            studentid: student.studentrollno,
            subjectcode:student.subjectcode,
            maxmarks: student.marks,
            scoredmarks: student.marks,
            status: student.status,
            facultyid: username,
            examtype: 'Mid',
            examid: 0,
          }));
          
          //console.log(JSON.stringify(attendanceDataINSERT.filter((item) => item !== null), null, 2));
          const insertApiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/BulkSave${year}year${sem}sem${mid}mid`;
          const token = localStorage.getItem('token') || undefined;
          const registeredData = await fetchCardDetailstoken(insertApiEndpoint, 'POST', attendanceDataINSERT, token);
          const insertedCount = registeredData?.length || 0;
          setMessage(insertedCount);
          setSnackbarOpen(true);
          setSeverity('success');
          setTimeout(() => {
            setSnackbarOpen(false);
            setMessage(null);
          }, 5000); 
        }
        if (updateData.length > 0) {
          const attendanceData = updateData.map((student) => ({
            id: student.id,
            batch:student.batch,
            regulation:regulationvalue,
            branchid:student.branchid,
            year:student.year,
            sem:student.sem,
            section:student.section,
            studentid: student.studentrollno,
            subjectcode:student.subjectcode,
            maxmarks: student.marks,
            scoredmarks: student.marks,
            status: student.status,
            facultyid: username,
            examtype: 'Mid',
            examid: 0,
          }));
          const updateApiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/Bulkupdate${year}year${sem}sem${mid}mid`;
          const token = localStorage.getItem('token') || undefined;
          const registeredData = await fetchCardDetailstoken(updateApiEndpoint, 'PUT', attendanceData, token);
          const updatedCount = registeredData?.length || 0;
          setMessage(updatedCount);
          setSnackbarOpen(true);
          setSeverity('success');
          setTimeout(() => {
            setSnackbarOpen(false);
            setMessage(null);
          }, 5000); 
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
    <Typography variant="h5" fontWeight="bold" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Post Mid Marks</Typography>
  </Box>
</Box>
    {isSmallScreen ? (
  classes.map((classItem) => (
    <Card key={classItem.id} style={{ margin: '10px', minWidth: 275 }}>
      <CardContent>
      <Typography variant="h6">ID: {classItem.id}</Typography>
      <Typography variant="body1">subject: {classItem.subjectname}</Typography>
      <Typography variant="body1">Regulation: {classItem.regulationname}</Typography>
      <Typography variant="body1">Batch Name: {classItem.batchname}</Typography>
      <Typography variant="body1">Branch: {classItem.branchname}-{classItem.section} ({classItem.year} {classItem.sem}) </Typography>
    </CardContent>
    <CardActions>
    <Button onClick={() => handleOpenDialog(classItem)}>Post Mid 1 Marks</Button>
    <Button onClick={() => handleOpenDialog2(classItem)}>Post Mid 2 Marks</Button>
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
             <TableCell>{classItem.subjectname} {classItem.subjectcode}</TableCell>
          <TableCell>{classItem.regulationname}</TableCell>
          <TableCell>{classItem.batchname}</TableCell>
          <TableCell>{classItem.branchname}-{classItem.section} ({classItem.year} {classItem.sem})</TableCell>
          <TableCell>
          <Button onClick={() => handleOpenDialog(classItem)}>Post Mid 1 Marks</Button>
          <Button onClick={() => handleOpenDialog2(classItem)}>Post Mid 2 Marks</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
 
</TableContainer>
</Paper>
)}

<Dialog open={open} onClose={handleClose} fullScreen TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative', backgroundColor: "#874CCC" }}>
          <Toolbar>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            {selectedRow && (
    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
     Subjectname: {selectedRow.subjectname},  Branch: {selectedRow.branchname}, Section: {selectedRow.section}, Year: {selectedRow.year}, Sem: {selectedRow.sem}, Batch Name: {selectedRow.batchname}, Batch: {selectedRow.batch}
    </Typography>
  )}
          </Toolbar>
        </AppBar>
        
        <DialogContent>
         
        <Grid container direction="row" alignItems="center" spacing={2}>
          </Grid>
          {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
            <RingLoader color="#1976D2" loading={isLoading} />
          </Box>
        ) :(
          <>
         
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
                              Marks
                            </StyledTableCell>
                           
                 </StyledTableRow>
              </TableHead>
              <TableBody>
                 {stpost.map((classItem,index) => (
                   <TableRow key={index}>
                     <TableCell>{classItem.studentrollno}</TableCell>
                     <TableCell>{classItem.name} {classItem.name}</TableCell>
                     <TableCell>
                         <TextField
                      label="Secured Marks"
                      color="primary"
                      focused
                      type="text"
                      value={classItem.marks}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    /></TableCell>
                    
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
    </>
  );
};

export default PostComponent;