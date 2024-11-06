"use client";
import * as React from 'react';
import { useState, useEffect, ChangeEvent } from 'react';
import {Button,Table,AlertColor,AppBar,Slide,Grid,FormLabel,FormControl,Divider,ListItemButton,ListItemText,List,Toolbar,tableCellClasses,TablePagination,Box,Radio,RadioGroup,FormControlLabel,TableBody,CardContent,Card,CardActions,Typography,TableCell,TableContainer,TableHead,TableRow,Paper,TextField,Modal,Dialog,DialogActions,DialogTitle,DialogContent} from '@mui/material';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import Layout from '@/components/Sidemenu/Layout';
import { useMediaQuery } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import CustomSnackbar from '@/components/CustomSnackbar';
import PageTitle from '@/components/PageTitle';
import SemDp from '@/components/dropdown/SemDp';
import YearDp from '@/components/dropdown/YearDp';
import Departmentdp from '@/components/dropdown/Departmentdp';
import Collegedp from '@/components/dropdown/Collegedp';
import GatetypeDp from '@/components/dropdown/GatetypeDp';
import SubjecttypeDp from '@/components/dropdown/SubjecttypeDp';
import Regulationdp from '@/components/dropdown/Regulationdp';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface Column {
  id: 'subjectcode'|'subjectname'|'choosesubjecttype' | 'internalmaxmarks'|'internalpassmarks'|'externalmaxmarks'|'externalpassmarks'|'totalmaxmarks'|'toatlpassmarks'|'Action';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
}
    interface Engineeringmodule {
      subjectid: number;
      subjectcode: string;
      subjectname: string;
      subjectshortname: string;
      regulationname: string;
      subjecttype: string;
      subjectcredit: string;
      noofsession: string;
      noofunit: number;
      internalmaxmarks: number; 
      internalpassmarks: number;
      externalmaxmarks: number;
      externalpassmarks: number;
      totalmaxmarks: number;
      totalpassmarks: number;
      orgid: string;
      courseid: string;
      branchid: string;     
      year: string;
      sem: number;
      gatetype: string;
      coursecode: string;
      elective: string;
      industryrequiredcourses: string;
      singlesection: number;
      singlesectionlaboratory: number;
      
      
    }
    interface subjectfilter{
      branchid: number;
      year: number;
      sem: number;
      regulationname: string;
    }
const Engineeringmodule: React.FC = () => {
  const [classes, setClasses] = useState<Engineeringmodule[]>([]);
  const [newClass, setNewClass] = useState<Engineeringmodule>({
      subjectid: 0,
      subjectcode: '',
      subjectname: '',
      subjectshortname: '',
      regulationname: '',
      subjecttype: '',
      subjectcredit: '',
      noofsession: '',
      noofunit: 0,
      internalmaxmarks: 0, 
      internalpassmarks: 0,
      externalmaxmarks: 0,
      externalpassmarks: 0,
      totalmaxmarks: 0,
      totalpassmarks: 0,
      orgid: '',
      courseid: '',
      branchid: '',   
      year: '',
      sem: 0,
      gatetype: '',
      coursecode: '',
      elective: '',
      industryrequiredcourses: '',
      singlesection: 0,
      singlesectionlaboratory: 0,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRegulation, setSelectedRegulation] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [Message, setMessage] = useState<string | null>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('error');
  const [selectedsem, setSelectedSem] = useState<string>(''); // Example state for selected semester
  const [selectedyear, setSelectedyear] = useState<string>('');
  const [selectedbranch, setSelectedbranch] = useState<string>('');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>(''); // This should be set based on your application logic
  const [open, setOpen] = useState(false);
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const handleGetsubjects = () => {
    setOpen(false);
    fetchClassView();
    setIsFilterClicked(true);
  };
  const fetchClassView = async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
        const classUrl = `${DIGITAL_CAMPUS_BASE_URL}/allSubjectDetails`;
        const schoolData = await fetchCardDetailstoken(classUrl, 'GET',null,token);
        const filteredSchoolData = schoolData.filter((sb: subjectfilter) => sb.branchid===parseInt(selectedbranch) && sb.regulationname===selectedRegulation && sb.year===parseInt(selectedyear)&& sb.sem===parseInt(selectedsem));
     console.log("filteredSchoolData",filteredSchoolData);
      setClasses(filteredSchoolData);
    } catch (error) {
        console.error('Error fetching class data:', error);
    }
};
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
    setSelectedSchoolId(eorgid);
    const apiEndpointbr = `${DIGITAL_CAMPUS_BASE_URL}/tblbranchdtls`;
    const fetchedDatabr = await fetchCardDetailstoken(apiEndpointbr, 'GET',null,token);
    const filteredbr = fetchedDatabr.filter((college: any) => college.branchid === ebranchid1);
    const ebranchshortname = filteredbr[0].branchshortname;
    const ecourseid = filteredbr[0].courseid;
    setSelectedCourseId(ecourseid);
    const ebranchid = filteredbr[0].branchid;
    if (ebranchshortname === "HS") {

    } else {
      setSelectedbranch(ebranchid);
    }
    
  } catch (error) {
    console.error('Error fetching school options:', error);
  }
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token') || undefined;
      const pramotionrequestData1 = {
        subjectid: newClass.subjectid,
        subjectcode: newClass.subjectcode,
        subjectname: newClass.subjectname,
        subjectshortname: newClass.subjectshortname,
        regulationname: selectedRegulation,
        subjecttype: newClass.subjecttype,
        subjectcredit: newClass.subjectcredit,
        noofsession: newClass.noofsession,
        noofunit: newClass.noofunit,
        internalmaxmarks: newClass.internalmaxmarks, 
        internalpassmarks: newClass.internalpassmarks,
        externalmaxmarks: newClass.externalmaxmarks,
        externalpassmarks: newClass.externalpassmarks,
        totalmaxmarks: newClass.totalmaxmarks,
        totalpassmarks: newClass.totalpassmarks,
        orgid: selectedSchoolId,
        courseid: selectedCourseId,
        branchid: selectedbranch,   
        year: selectedyear,
        sem: selectedsem,
        gatetype: newClass.gatetype,
        coursecode: newClass.coursecode,
        elective: newClass.elective,
        industryrequiredcourses: newClass.industryrequiredcourses,
        singlesection: newClass.singlesection,
        singlesectionlaboratory: newClass.singlesectionlaboratory,
      };
     console.log(pramotionrequestData1);
    
     const apipramotionEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/addSubject`;
      const apiEndpointclassupdate = `${DIGITAL_CAMPUS_BASE_URL}/updateSubject`;
      if (newClass.subjectid) {
        const updatedData = await fetchCardDetailstoken(apiEndpointclassupdate, 'PUT', pramotionrequestData1,token);
        setMessage(updatedData);
        setSnackbarOpen(true);
        setSeverity('success');
        setTimeout(() => {
          setSnackbarOpen(false);
          setMessage(null);
        }, 5000);
      } else {
       const registeredData = await fetchCardDetailstoken(apipramotionEndpoint, 'POST', pramotionrequestData1,token);
       console.log(pramotionrequestData1);
        setMessage(registeredData);
        setSnackbarOpen(true);
        setSeverity('success');
        setTimeout(() => {
          setSnackbarOpen(false);
          setMessage(null);
        }, 5000);
      }
      fetchClassView();
      setClasses([]);
      closeDialog();
    // fetchClassView();
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
  const handleOrgSelect = (label: string, value: string) => {
    setNewClass((prevNewClass) => ({
      ...prevNewClass,
      orgid: value, // Convert value to integer if needed
    }));
    setSelectedSchoolId(value);
  };
 
  const closeDialog = () => {
    setIsDialogOpen(false);
    setNewClass({
      subjectid: 0,
      subjectcode: '',
      subjectname: '',
      subjectshortname: '',
      regulationname: '',
      subjecttype: '',
      subjectcredit: '',
      noofsession: '',
      noofunit: 0,
      internalmaxmarks: 0, 
      internalpassmarks: 0,
      externalmaxmarks: 0,
      externalpassmarks: 0,
      totalmaxmarks: 0,
      totalpassmarks: 0,
      orgid: '',
      courseid: '',
      branchid: '',   
      year: '',
      sem: 0,
      gatetype: '',
      coursecode: '',
      elective: '',
      industryrequiredcourses: '',
      singlesection: 0,
      singlesectionlaboratory: 0,
    });
  };
  const handleEdit = (data: any) => {
    setIsDialogOpen(true);
    populateFormFields(data);
  };

  const populateFormFields = (data: any) => {
    setNewClass({
      subjectid: data.subjectid,
      subjectcode: data.subjectcode ,
      subjectname: data.subjectname,
      subjectshortname: data.subjectshortname,
      regulationname:data.regulationname,
      subjecttype:data.subjecttype,
      subjectcredit:data.subjectcredit,
      noofsession: data.noofsession,
      noofunit: data.noofunit, 
      internalmaxmarks:data.internalmaxmarks ,
      internalpassmarks: data.internalpassmarks, // Initial values could be 0 or appropriate defaults
      externalmaxmarks: data.externalmaxmarks,
      externalpassmarks: data.externalpassmarks,
      totalmaxmarks: data.totalmaxmarks,
      totalpassmarks:data.totalpassmarks,
      orgid: data.orgid,
      courseid: data.courseid,
      branchid: data.branchid, 
      year:data.year,
      sem: data.sem,
      gatetype: data.gatetype, 
      coursecode: data.coursecode,
      elective:data.elective,
      industryrequiredcourses: data.industryrequiredcourses,
      singlesection: data.singlesection,
      singlesectionlaboratory: data.singlesectionlaboratory,
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns: readonly Column[] = [
    { id: 'subjectcode', label: 'Subject Code', minWidth: 50 },
    { id: 'subjectname', label: 'Subject Name', minWidth: 50 },
    { id: 'choosesubjecttype', label: 'Choose Subject Type', minWidth: 50 },
    { id: 'internalmaxmarks', label: 'Internal Max marks', minWidth: 50 },
    { id: 'internalpassmarks', label: 'Internal Pass marks', minWidth: 50 },
    { id: 'externalmaxmarks', label: 'External Max marks', minWidth: 50 },
    { id: 'externalpassmarks', label: 'External Pass marks', minWidth: 50 },
    { id: 'totalmaxmarks', label: 'Toatl Max marks', minWidth: 50 },
    { id: 'toatlpassmarks', label: 'Total Pass marks', minWidth: 50 },
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

  const handlesemSelect = (label: string, value: string) => {
    setSelectedSem(value); 
  };
  const handleyearSelect = (label: string, value: string) => {
    setSelectedyear(value);
  };
  const handlebranchSelect = (label: string, value: string) => {
    setSelectedbranch(value);
  }
  const handletypeSelect = (label: string, value: string) => {
    setNewClass((prevData) => ({
      ...prevData,
      subjecttype: label,
    }));
  };

  const handleGateTypeSelect = (label: string, value: string) => {
    setNewClass((prevData) => ({
      ...prevData,
      gatetype: label,
    }));
  };
  const handleRegulationSelect = (label: string, value: string) => {
    setSelectedRegulation(value); 
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setMessage(null);
  };
  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <>
        <PageTitle title='Subjects Registration'/>
    <Layout>
    <CustomSnackbar
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        severity={severity}
        message={Message}
      />
 <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <Box flexGrow={1} textAlign="center">
      <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>Subjects Registration Details</Typography>
          <Typography variant="body1" paragraph>
              Easily generate your class timetable by selecting the academic year and semester. Once you've made your selections, click "Submit" to view and organize your schedule for the semester.
          </Typography>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <Button variant="outlined" color="primary" onClick={handleDialogOpen}>
            Filter data
          </Button>
          <Button onClick={() => setIsDialogOpen(true)} variant="outlined" color="primary" disabled={!isFilterClicked}>
        Add Data
      </Button>
        </div>
      </Box>
     
    </Box>
    <Dialog open={open} onClose={handleDialogClose} fullScreen>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleDialogClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 ,textAlign: "center"}} variant="h6" component="div">
                Filter Details
              </Typography>
            </Toolbar>    
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Collegedp onSelectOrg={handleOrgSelect} selectedOrg={selectedSchoolId} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Departmentdp onSelectbranch={handlebranchSelect} selectedbranch={selectedbranch} courseid={selectedCourseId} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <YearDp onSelectYear={handleyearSelect} selectedYear={selectedyear} courseid={parseInt(selectedCourseId)} />
              </Grid>
              <Grid item xs={12} sm={3}>
              <SemDp onSelectSem={handlesemSelect} selectedSem={selectedsem} courseid={parseInt(selectedCourseId)} />

              </Grid>
              <Grid item xs={12} sm={3}>
              <Regulationdp
                  onSelectregu={handleRegulationSelect}
                  selectedregu={selectedRegulation}
                  orgid={selectedSchoolId}
                  courseid={selectedCourseId}
                />

              </Grid>
            </Grid>
            <DialogActions>
            <Button variant="contained" type="submit" color="primary" sx={{ alignSelf: 'center', mt: 2 }}  onClick={handleGetsubjects}>
              Filter
            </Button>
          </DialogActions>
          </DialogContent>
          
      </Dialog>
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
      {classes && classes.length > 0 &&classes.map((classItem) => (
        <TableRow key={classItem.subjectid}>
          <TableCell>{classItem.subjectcode}</TableCell>
          <TableCell>{classItem.subjectname}</TableCell>
          <TableCell>{classItem.subjecttype} </TableCell>
          <TableCell>{classItem.internalmaxmarks}</TableCell>
          <TableCell>{classItem.internalpassmarks}</TableCell>
          <TableCell>{classItem.externalmaxmarks}</TableCell>
          <TableCell>{classItem.externalpassmarks}</TableCell>
          <TableCell>{classItem.totalmaxmarks}</TableCell>
          <TableCell>{classItem.totalpassmarks}</TableCell>
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
 
<Dialog
        fullScreen
        open={isDialogOpen}
        onClose={closeDialog}
        TransitionComponent={Transition}
      >
         <form onSubmit={handleSubmit}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={closeDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {'Add Subject'}
            </Typography>
            <Button type="submit" autoFocus color="inherit">
              { newClass.subjectid ? 'Update' : 'Register'}
            </Button>
            
          </Toolbar>
        </AppBar>
       
        <Grid container spacing={2} p={4}>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Subject Code" 
            value={newClass.subjectcode}
            onChange={(e) =>
            setNewClass({ ...newClass, subjectcode: e.target.value })
             } 
            />
          </Grid>
            
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Subject Name" 
            value={newClass.subjectname}
            onChange={(e) =>
            setNewClass({ ...newClass, subjectname: e.target.value })
            } />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Subject Short Name" 
            value={newClass.subjectshortname}
            onChange={(e) =>
             setNewClass({ ...newClass, subjectshortname: e.target.value })
             } />
          </Grid>
          <Grid item xs={12} sm={3}>
          <SubjecttypeDp onSelectSubjecttype={handletypeSelect} selectedSubjecttype={newClass.subjecttype} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Subject Credits" 
            value={newClass.subjectcredit}
            onChange={(e) =>
            setNewClass({ ...newClass, subjectcredit: e.target.value })
            } />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="No Of Sessions" 
            value={newClass.noofsession}
            onChange={(e) =>
                setNewClass({ ...newClass, noofsession: e.target.value })
            } />
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="No Of Units"
             value={newClass.noofunit}
            onChange={(e) =>
                setNewClass({ ...newClass, noofunit: Number(e.target.value) })
            } />
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Internal Max Marks" value={newClass.internalmaxmarks}
      onChange={(e) =>
        setNewClass({ ...newClass, internalmaxmarks: Number(e.target.value) })
      } />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Internal Pass Marks" value={newClass.internalpassmarks}
      onChange={(e) =>
        setNewClass({ ...newClass, internalpassmarks: Number(e.target.value) })
      } />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="External Max Marks" value={newClass.externalmaxmarks}
      onChange={(e) =>
        setNewClass({ ...newClass, externalmaxmarks: Number(e.target.value) })
      } />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="External Pass Marks" value={newClass.externalpassmarks}
      onChange={(e) =>
        setNewClass({ ...newClass, externalpassmarks: Number(e.target.value) })
      } />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Total Max Marks" value={newClass.totalmaxmarks}
      onChange={(e) =>
        setNewClass({ ...newClass, totalmaxmarks: Number(e.target.value) })
      } />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Total Pass Marks" value={newClass.totalpassmarks}
      onChange={(e) =>
        setNewClass({ ...newClass, totalpassmarks: Number(e.target.value) })

      } />
      </Grid>
      <Grid item xs={12} sm={3}>
          <GatetypeDp onSelectGateType={handleGateTypeSelect} selectedGateType={newClass.gatetype} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Course Code" 
            value={newClass.coursecode}
            onChange={(e) =>
            setNewClass({ ...newClass, coursecode: e.target.value })
             } />
          </Grid>
      <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Elective" 
            value={newClass.elective}
            onChange={(e) =>
                setNewClass({ ...newClass, elective: e.target.value })
            } />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Industry Required Courses" 
            value={newClass.industryrequiredcourses}
            onChange={(e) =>
                setNewClass({ ...newClass, industryrequiredcourses: e.target.value })
            } />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Single Section" 
            value={newClass.singlesection}
            onChange={(e) =>
                setNewClass({ ...newClass, singlesection: Number(e.target.value) })
            } />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Single Section Laboratory" 
            value={newClass.singlesectionlaboratory}
            onChange={(e) =>
                setNewClass({ ...newClass, singlesectionlaboratory: Number(e.target.value) })
            } />
          </Grid>
          
          </Grid>
          
       </form>
      </Dialog>
      
    </Layout>

    </>
    
  );
};
 


export default Engineeringmodule;