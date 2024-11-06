"use client"
import React, { useState, useEffect,ChangeEvent} from 'react'
import Layout from '@/components/Sidemenu/Layout';
import { Grid,IconButton,TextField, Button, AlertColor,Box,Typography,Dialog,DialogActions,DialogTitle,DialogContent,Table,TableBody,TableCell,TableRow,TableContainer,TableHead,styled,tableCellClasses,TablePagination,FormLabel,Radio,RadioGroup,FormControlLabel,FormControl } from '@mui/material';
import CustomSnackbar from "@/components/CustomSnackbar";
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import AddIcon from '@mui/icons-material/Add';
import PageTitle from "@/components/PageTitle";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Unitsdp from '@/components/dropdown/Unitsdp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
interface SelectedData {
    id: string;
    orgid: string;
    branchid: string;
    year: string;
    sem: string;
    topic: string;
    subjectcode:string;
    facultyid: string;
    acadamicid:string;
    units:string;
    co1:string;
    co2:string;
    co3:string;
    co4:string;
    co5:string;
    co6:string;
    deletestatus:string;
    employeename:string;
    subjectname:string;
  }

  interface Subject {
    id: string;
    orgid: string;
    courseid: string;
    branchid: string;
    year: string;
    sem: string;
    regulation: string;
    subjectcode:string;
    section:string;
    acadamicid:string;
    facultyid:string;
    attendancestatus:string;
    subjectname:string;
    employeename:string;
    branchshortname:string;
  }

  interface Classfilter {
    orgid: string;
    courseid: string;
    sem: string;
    year: string;
    branchid:string;
    acadamicid :string;
    subjectcode:string;
    subjectname:string;
    branchshortname:string; 
  }
const Lessonplan: React.FC = () => {
    const [classes, setClasses] = useState<SelectedData[]>([]);
    const [Subjectdata, setSubjectdata] = useState<Subject[]>([]);
    const [selectedsubject, setselectedsubject] = useState<string>('');
    const [selectedData, setSelectedData] = useState<Classfilter>({
        orgid: '',
        courseid: '',
        year: '',
        sem: '',
        branchid: '',
        acadamicid:'',
        subjectcode:'',
        subjectname: '',
        branchshortname:'',
      });
    const [newClass, setNewClass] = useState<SelectedData>({
        id: '',
    orgid: '',
    branchid: '',
    year: '',
    sem: '',
    topic: '',
    subjectcode:'',
    facultyid: '',
    acadamicid:'',
    units:'',
    co1:'',
    co2:'',
    co3:'',
    co4:'',
    co5:'',
    co6:'',
    deletestatus:'NA',
    employeename:'',
    subjectname:'',
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [year, setyear] = useState<string>('');
    const [branchid, setbranchid] = useState<string>('');
    const [sem, setsem] = useState<string>('');
    const [acadamicid, setacadamicid] = useState<string>('');
    const [subjectcode, setsubjectcode] = useState<string>('');

    const [Message, setMessage] = useState<string | null>(null);
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState<AlertColor>('error');
    const [unit, setdunit] = useState<string>('');
    useEffect(() => {
        fetchClassView();
      }, []);
    
      const fetchClassView = async () => {
        try {
          const token = localStorage.getItem('token') || undefined;
            const username = localStorage.getItem('username');
            const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/allEmployeeDetails`;
            const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
            const filteredstaff = fetchedData.filter((college: any) => college.employeid === username);
            const eorgid = filteredstaff[0].orgid;
            const url = `${DIGITAL_CAMPUS_BASE_URL}/Acadamicyearview`;
            const academicData = await fetchCardDetailstoken(url, 'GET',null,token);
            const filteredacademic= academicData.filter((college: any) => college.orgid  === eorgid);
            const filteredacademic1= academicData.filter((college: any) => college.orgid  === eorgid && college.status==='Present');
            const eacadamicid = filteredacademic1[0].acadamicid;
          const classUrl = `${DIGITAL_CAMPUS_BASE_URL}/getByLessonPlanByParams?acadamicid=${eacadamicid}&facultyid=${username}`;
         
          const orgUrl = `${DIGITAL_CAMPUS_BASE_URL}/tblbranchdtls`;
          const [classData, orgData] = await Promise.all([
            fetchCardDetailstoken(classUrl, 'GET',null,token),
            fetchCardDetailstoken(orgUrl, 'GET',null,token),
          ]);
         
          const joinedClassDetails = classData
            .filter((classItem:Subject) =>
                orgData.some((org:Subject) => org.branchid === classItem.branchid)
            )
            .map((classItem:Subject) => {
              const correspondingOrg = orgData.find(
                (org:Subject) => org.branchid === classItem.branchid
              );
    
              return correspondingOrg
                ? { ...classItem, branchshortname: correspondingOrg.branchshortname }
                : classItem;
            });
            setSubjectdata(joinedClassDetails);
        } catch (error) {
          console.error('Error fetching class data:', error);
        }
      };
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
        setMessage(null);
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
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

      const handleadd = (data: any) => {
        setIsDialogOpen(true);
        populateFormFieldsadd(data);
        setselectedsubject(data.subjectname);
        fetchlessonView();
      };
      const handleView = (data: any) => {
        populateFormFieldsadd(data);
        setbranchid(data.branchid);
        setsubjectcode(data.subjectcode);
        setacadamicid(data.acadamicid);
        setyear(data.year);
        setsem(data.sem);
        fetchlessonView();
        setselectedsubject(data.subjectname);
      };
      const fetchlessonView = async () => {
        try {
          const token = localStorage.getItem('token') || undefined;
          const username = localStorage.getItem('username');
          const Url = `${DIGITAL_CAMPUS_BASE_URL}/LessonPlanDetails?branchid=${branchid}&year=${year}&sem=${sem}&acadamicid=${acadamicid}&facultyid=${username}`;
          const lessonresponse = await fetchCardDetailstoken(Url, 'GET',null,token);
          const filteredbr = lessonresponse.filter((college: any) => college.subjectcode === subjectcode);
          setClasses(filteredbr);
        } catch (error) {
          console.error('Error fetching class data:', error);
        }
      };
      const handleEdit = (data: any) => {
        setIsDialogOpen(true);
        populateFormFields(data);
      };
      const populateFormFields = (data: SelectedData) => {
        setNewClass({
            id:data.id,
            orgid:data.orgid,
            branchid:data.branchid,
            year:data.year,
            sem:data.sem,
            topic:data.topic,
            subjectcode:data.subjectcode,
            facultyid:data.facultyid,
            acadamicid:data.acadamicid,
            units:data.units,
            co1:data.co1,
            co2:data.co2,
            co3:data.co3,
            co4:data.co4,
            co5:data.co5,
            co6:data.co6,
            deletestatus:data.deletestatus,
            employeename:data.employeename,
            subjectname:data.subjectname,
        });
      };
      const handleDelete = async (data: SelectedData) => {
        setIsDialogOpen(true);
        populateDeleteFormFields(data);
      };
      const populateDeleteFormFields = (data: SelectedData) => {
        setNewClass({
            id:data.id,
            orgid:data.orgid,
            branchid:data.branchid,
            year:data.year,
            sem:data.sem,
            topic:data.topic,
            subjectcode:data.subjectcode,
            facultyid:data.facultyid,
            acadamicid:data.acadamicid,
            units:data.units,
            co1:data.co1,
            co2:data.co2,
            co3:data.co3,
            co4:data.co4,
            co5:data.co5,
            co6:data.co6,
            deletestatus:'Delete',
            employeename:data.employeename,
            subjectname:data.subjectname,
            
        });
      };
      const populateFormFieldsadd = (data: Classfilter) => {
        setSelectedData({
          orgid: data.orgid,
            courseid: data.courseid,
            branchid: data.branchid,
            year:data.year,
            sem:data.sem,
            acadamicid: data.acadamicid,
            subjectcode:data.subjectcode,
            subjectname:data.subjectname,
            branchshortname:data.branchshortname,
        });
      };
      const closeDialog = () => {
        setIsDialogOpen(false);
        setNewClass({
            id: '',
            orgid: '',
            branchid: '',
            year: '',
            sem: '',
            topic: '',
            subjectcode:'',
            facultyid: '',
            acadamicid:'',
            units:'',
            co1:'',
            co2:'',
            co3:'',
            co4:'',
            co5:'',
            co6:'',
            deletestatus:'NA',
            employeename:'',
            subjectname:'',
        });
      };
      const handleunitselect = (label: string, value: string) => {
        setdunit(value);   
      };
      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewClass((prevClass) => ({
          ...prevClass,
          [name]: value,
        }));
      };
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const token = localStorage.getItem('token') || undefined;
            const username = localStorage.getItem('username');
          const requestData = {
            id: newClass.id, 
            branchid: selectedData.branchid,
            year: selectedData.year,
            sem: selectedData.sem,
            topic:newClass.topic,
            subjectcode:selectedData.subjectcode,
            facultyid:username,
            acadamicid:selectedData.acadamicid,
            units:unit,
            deletestatus:newClass.deletestatus,
            co1:newClass.co1,
            co2:newClass.co2,
            co3:newClass.co3,
            co4:newClass.co4,
            co5:newClass.co5,
            co6:newClass.co6,
          };

          const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/addLessonPlan`;
          const apiEndpointclassupdate = `${DIGITAL_CAMPUS_BASE_URL}/Lessonupdate`;
          if (newClass.id) {
            const updatedData = await fetchCardDetailstoken(apiEndpointclassupdate, 'PUT', requestData,token);
            fetchlessonView();
            setMessage(updatedData);
            setSnackbarOpen(true);
            setSeverity('success');
            setTimeout(() => {
              setSnackbarOpen(false);
              setMessage(null);
            }, 5000); 
          } else {
            const registeredData = await fetchCardDetailstoken(apiEndpoint, 'POST', requestData,token);
            fetchlessonView();
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
  return (
    <>
    <Layout>
  <PageTitle title='Lesson Plan'/>
      <CustomSnackbar
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        severity={severity}
        message={Message}
      />
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <Box flexGrow={1} textAlign="center">
      <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>Lesson Plan Details</Typography>
          <Typography variant="body1" paragraph>
              Easily generate your class timetable by selecting the academic year and semester. Once you've made your selections, click "Submit" to view and organize your schedule for the semester.
          </Typography>
      </Box>
    </Box>
    <TableContainer sx={{ maxHeight: 440 }}>
       <Table stickyHeader aria-label="sticky table customized" >
<TableHead>
<StyledTableRow>
              <StyledTableCell align="center">
             Branch
              </StyledTableCell>
              <StyledTableCell align="center">
            year
              </StyledTableCell>
              <StyledTableCell align="center">
            sem
              </StyledTableCell>
              <StyledTableCell align="center">
            section
              </StyledTableCell>
              <StyledTableCell align="center">
            Subject Name
              </StyledTableCell>
              <StyledTableCell align="center">
            Faculty Name
              </StyledTableCell>
              <StyledTableCell>
             Action
              </StyledTableCell>
   </StyledTableRow>
</TableHead>
<TableBody>
   {Subjectdata.map((classItem,index) => (
     <TableRow key={index}>
        <TableCell align="center">{classItem.branchshortname}</TableCell>
        <TableCell align="center">{classItem.year}</TableCell>
        <TableCell align="center">{classItem.sem}</TableCell>
        <TableCell align="center">{classItem.section}</TableCell>
       <TableCell align="center">{classItem.subjectname}</TableCell>
       <TableCell align="center">{classItem.employeename}</TableCell>
            <TableCell>
            <IconButton onClick={() => handleadd(classItem)} aria-label="add">
            <AddIcon/>
  </IconButton>
  <IconButton onClick={() => handleView(classItem)} aria-label="view">
  <VisibilityIcon/>
  </IconButton>

            </TableCell>
     </TableRow>
   ))}
 </TableBody>
</Table>
</TableContainer>
<Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="md" fullWidth>
  <DialogTitle>
  {newClass.deletestatus === 'Delete' ? 'Deleting Details' : newClass.id ? 'Selected Details' : 'Register  '}
  {selectedsubject}
  </DialogTitle>
  <DialogContent>
  <form onSubmit={handleSubmit}>
  <TextField
            label="topic"
            name="topic"
            value={newClass.topic}
            onChange={handleChange}
            fullWidth
          />
  <Unitsdp onSelectunit={handleunitselect} selectedunit={unit}/>
  <Grid container spacing={2}>

  <Grid item xs={12} md={4}>
  <Box border={1} borderColor="grey.400" borderRadius={1} p={2} mb={2}>
  <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">co1</FormLabel>
  <RadioGroup row aria-labelledby="category-radio-group-label1co1" value={newClass.co1} name="co1" onChange={handleChange}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
</FormControl>
            </Box>
            <Box border={1} borderColor="grey.400" borderRadius={1} p={2} mb={2}>
            <FormControl>
        <FormLabel id="co2-radio-buttons-group-label">co2</FormLabel>
  <RadioGroup row aria-labelledby="category-radio-group-label1co2" value={newClass.co2} name="co2" onChange={handleChange}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
</FormControl>
</Box>
    </Grid>
    <Grid item xs={12} md={4}>
    <Box border={1} borderColor="grey.400" borderRadius={1} p={2} mb={2}>
<FormControl>
        <FormLabel id="co3-radio-buttons-group-label">co3</FormLabel>
  <RadioGroup row aria-labelledby="category-radio-group-label1co3" value={newClass.co3} name="co3" onChange={handleChange}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
</FormControl>
</Box>
<Box border={1} borderColor="grey.400" borderRadius={1} p={2} mb={2}>
<FormControl>
        <FormLabel id="co4-radio-buttons-group-label">co4</FormLabel>
  <RadioGroup row aria-labelledby="category-radio-group-label1co4" value={newClass.co4} name="co4" onChange={handleChange}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
</FormControl>
</Box>
    </Grid>

    <Grid item xs={12} md={4}>
    <Box border={1} borderColor="grey.400" borderRadius={1} p={2} mb={2}>
<FormControl>
<FormLabel id="co5-radio-buttons-group-label">co5</FormLabel>
  <RadioGroup row aria-labelledby="category-radio-group-label1co5" value={newClass.co5} name="co5" onChange={handleChange}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
</FormControl>
</Box>
<Box border={1} borderColor="grey.400" borderRadius={1} p={2} mb={2}>
<FormControl>
<FormLabel id="co6-radio-buttons-group-label">co6</FormLabel>
  <RadioGroup row aria-labelledby="category-radio-group-label1co6" value={newClass.co6} name="co6" onChange={handleChange}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
</FormControl>
</Box>
    </Grid>
    </Grid>
      <DialogActions>
   <Button type="submit" variant="outlined" color="primary">
   {newClass.deletestatus === 'Delete' ? 'Delete' : newClass.id ? 'Edit' : 'Register'}
               </Button>
 </DialogActions>
</form>
  </DialogContent>
</Dialog>
<br/>

<Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <Box flexGrow={1} textAlign="center">
      <Typography variant="h5" fontWeight="bold">{selectedsubject} year {year} & sem {sem}</Typography>
      </Box>
    </Box>
<TableContainer sx={{ maxHeight: 440 }}>
       <Table stickyHeader aria-label="sticky table customized" >
<TableHead>
<StyledTableRow>
              <StyledTableCell align="center">
              Topic
              </StyledTableCell>
              <StyledTableCell align="center">
              Units
              </StyledTableCell>
              <StyledTableCell align="center">
              co1
              </StyledTableCell>
              <StyledTableCell align="center">
              co2
              </StyledTableCell>
              <StyledTableCell align="center">
              co3
              </StyledTableCell>
              <StyledTableCell align="center">
              co4
              </StyledTableCell>
              <StyledTableCell>
              co5
              </StyledTableCell>
              <StyledTableCell>
              co6
              </StyledTableCell>
              <StyledTableCell>
              Action
              </StyledTableCell>
   </StyledTableRow>
</TableHead>
<TableBody>
   {classes.map((classItem,index) => (
     <TableRow key={index}>
        <TableCell align="center">{classItem.topic}</TableCell>
        <TableCell align="center">{classItem.units}</TableCell>
        <TableCell align="center">{classItem.co1}</TableCell>
        <TableCell align="center">{classItem.co2}</TableCell>
       <TableCell align="center">{classItem.co3}</TableCell>
       <TableCell align="center">{classItem.co4}</TableCell>
       <TableCell align="center">{classItem.co5}</TableCell>
       <TableCell align="center">{classItem.co6}</TableCell>
            <TableCell>
            <IconButton onClick={() => handleEdit(classItem)} aria-label="edit">
    <EditIcon />
  </IconButton>
  <IconButton onClick={() => handleDelete(classItem)} aria-label="delete">
    <DeleteIcon />
  </IconButton>
            </TableCell>
     </TableRow>
   ))}
 </TableBody>
</Table>
</TableContainer>
    </Layout>
    </>
  )
}

export default Lessonplan;