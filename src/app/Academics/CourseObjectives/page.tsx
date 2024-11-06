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
    batch: string;
    subjectcode:string;
    facultyid: string;
    acadamicid:string;
    objectives:string;
    status:string;
    remarks:string;
    regulation:string;
    deletestatus:string;
  }

  interface Subject {
    id: string;
    orgid: string;
    courseid: string;
    branchid: string;
    year: string;
    sem: string;
    regulationname: string;
    subjectcode:string;
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
    batch: '',
    subjectcode:'',
    facultyid: '',
    acadamicid:'',
    objectives:'',
    status:'',
    remarks:'',
    regulation:'',
    deletestatus:'NA',
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [year, setyear] = useState<string>('');
    const [branchid, setbranchid] = useState<string>('');
    const [sem, setsem] = useState<string>('');
    const [acadamicid, setacadamicid] = useState<string>('');
    const [subjectcode, setsubjectcode] = useState<string>('');
    const [regulation, setregulation] = useState<string>('');
    const [batch, setbatch] = useState<string>('');
    const [orgid, setorgid] = useState<string>('');
    const [Message, setMessage] = useState<string | null>(null);
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState<AlertColor>('error');
    const [objectives1, setdobjectives] = useState<string>('');
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
            setorgid(eorgid);
            const url = `${DIGITAL_CAMPUS_BASE_URL}/Acadamicyearview`;
            const academicData = await fetchCardDetailstoken(url, 'GET',null,token);
            const filteredacademic= academicData.filter((college: any) => college.orgid  === eorgid);
            const filteredacademic1= academicData.filter((college: any) => college.orgid  === eorgid && college.status==='Present');
            const eacadamicid = filteredacademic1[0].acadamicid;
          const classUrl = `${DIGITAL_CAMPUS_BASE_URL}/getByfindSubjectDetailsByfacultyid?acadamicid=${eacadamicid}&facultyid=${username}`;
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
        setClasses([]); 
        setIsDialogOpen(true);
        populateFormFieldsadd(data);
        setbranchid(data.branchid);
        setsubjectcode(data.subjectcode);
        setacadamicid(data.acadamicid);
        setyear(data.year);
        setsem(data.sem);
        setregulation(data.regulationname);
        setbatch(data.batch);
        setselectedsubject(data.subjectname);
      };
      const handleView = (data: any) => {
        setClasses([]); 
        populateFormFieldsadd(data);
        setbranchid(data.branchid);
        setsubjectcode(data.subjectcode);
        setacadamicid(data.acadamicid);
        setyear(data.year);
        setsem(data.sem);
        setregulation(data.regulationname);
        setbatch(data.batch);
        setselectedsubject(data.subjectname);
      };
      const fetchlessonView = async () => {
        try {
          const token = localStorage.getItem('token') || undefined;
          const username = localStorage.getItem('username');
          const Url = `${DIGITAL_CAMPUS_BASE_URL}/CourseObjectiveByParams?subjectcode=${subjectcode}&facultyid=${username}&branchid=${branchid}&acadamicid=${acadamicid}&year=${year}&sem=${sem}&regulation=${regulation}&batch=${batch}`;
          console.log(Url);
          const lessonresponse = await fetchCardDetailstoken(Url, 'GET', null, token);
          setClasses(lessonresponse);
        } catch (error) {
          console.error('Error fetching class data:', error);
        }
      };
      useEffect(() => {
        if (branchid && subjectcode && acadamicid && year && sem && regulation && batch) {
          fetchlessonView();
        }
      }, [branchid, subjectcode, acadamicid, year, sem, regulation, batch]);
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
            objectives:data.objectives,
            subjectcode:data.subjectcode,
            facultyid:data.facultyid,
            acadamicid:data.acadamicid,
            status:data.status,
            remarks:data.remarks,
            regulation:data.regulation,
            batch:data.batch,
            deletestatus:data.deletestatus,
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
            batch:data.batch,
            subjectcode:data.subjectcode,
            facultyid:data.facultyid,
            acadamicid:data.acadamicid,
            objectives:data.objectives,
            status:data.status,
            remarks:data.remarks,
            regulation:data.regulation,
            deletestatus:'Delete',
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
            batch: '',
            subjectcode:'',
            facultyid: '',
            acadamicid:'',
            objectives:'',
            status:'',
            remarks:'',
            regulation:'',
            deletestatus:'NA',
        });
      };
      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewClass((prevClass) => ({
            ...prevClass,
            [name]: value,
          }));
        setdobjectives(value);
      };
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const token = localStorage.getItem('token') || undefined;
            const username = localStorage.getItem('username');
          const requestData = {
            id: newClass.id, 
            orgid:orgid,
            branchid: branchid,
            year: year,
            sem: sem,
            batch:batch,
            subjectcode:subjectcode,
            facultyid:username,
            acadamicid:acadamicid,
            objectives:objectives1,
            deletestatus:newClass.deletestatus,
            status:newClass.status,
            remarks:newClass.remarks,
            regulation:regulation,
          };

          const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/CourseObjectiveSave`;
          const apiEndpointclassupdate = `${DIGITAL_CAMPUS_BASE_URL}/CourseObjectiveupdate`;
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
  <PageTitle title='Course Objectives'/>
      <CustomSnackbar
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        severity={severity}
        message={Message}
      />
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <Box flexGrow={1} >
      <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>Course Objectives Details</Typography>
                <Typography variant="body1" paragraph>
                    Easily enter your class Course Objectives by selecting the academic year and semester. Once you've made your selections, click "Submit" to view and organize your schedule for the semester.
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
            label="objectives"
            name="objectives"
            value={newClass.objectives}
            onChange={handleChange}
            fullWidth
          />

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
              objectives
              </StyledTableCell>
              
              <StyledTableCell>
              Action
              </StyledTableCell>
   </StyledTableRow>
</TableHead>
<TableBody>
   {classes.map((classItem,index) => (
     <TableRow key={index}>
        <TableCell align="center">{classItem.objectives}</TableCell>
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