import React, { useState,useEffect} from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  DialogTitle,
  DialogContent,
  Box,
} from '@mui/material';
import Image from 'next/image'

import CloseIcon from '@mui/icons-material/Close';
import Slide, { SlideProps } from '@mui/material/Slide';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
interface BacklogsTableProps {
  headers: string[];
  hedding: string;
  subHedding: string;
}

const Transition = React.forwardRef(function Transition(
  props: SlideProps,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface Timetable {
    studentrollno: string;
    college: string;
    name: string;
    branch: string;
    year: number;
    sem: number;
    fathername: string;
    seattype: string;
    academicid: number;
    section: string;
    branchid: number;
    phoneno: string;
    gender: string;
    batch: number;
    facultyid: string;
    mentorname: string;
  }
const Menteeslist: React.FC<BacklogsTableProps> = ({
  hedding,
  subHedding
}) => {
  const theme = useTheme();
  const [subjectData, setSubjectData] = useState<Timetable[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetchClassView();
  }, []);

  const fetchClassView = async () => {
    try {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token') || undefined;
      const Url = `${DIGITAL_CAMPUS_BASE_URL}/viewStudentDetails`;
      const data = await fetchCardDetailstoken(Url, 'GET',null,token);
      const filteredClasses = data.filter((college: any) => college.facultyid ===username); 
      setSubjectData(filteredClasses);
    } catch (error) {
      console.error('Error fetching class data:', error);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ boxShadow: theme.shadows[3], backgroundColor: "#f9f9f9" }}>
      <Grid container>
        <Grid item xs={9}>
          <CardHeader
            title={<Typography variant="h5" color="text.primary" sx={{ fontWeight: 'bold' }}>{hedding}</Typography>}
            subheader={<Typography variant="body2" color="text.secondary">{subHedding}</Typography>}
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
              <TableCell sx={{ color: "white",fontWeight:"bold" }}>studentrollno</TableCell>
              <TableCell sx={{ color: "white",fontWeight:"bold" }}>name</TableCell>
              <TableCell sx={{ color: "white",fontWeight:"bold" }}>Branch</TableCell>
              <TableCell sx={{ color: "white",fontWeight:"bold" }}>Year$</TableCell>
              <TableCell sx={{ color: "white",fontWeight:"bold" }}>Gender</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {subjectData.map((classItem, index) => (
                <TableRow key={index}>
                    <TableCell align="center">{classItem.studentrollno}</TableCell>
                    <TableCell align="center">{classItem.name}</TableCell>
                  <TableCell align="center">{classItem.branch} - {classItem.section}</TableCell>
                  <TableCell align="center">{classItem.year}- {classItem.sem}</TableCell>
                  <TableCell align="center">{classItem.gender}</TableCell>
                  {/* <TableCell align="center">
                          {classItem.status.toLowerCase() === 'pending' ? (
                            <Button variant="contained" color="primary" onClick={() => handlePendingClick(classItem)}>
                              pending
                            </Button>
                          ) : (
                            <Typography variant="body2" color="textSecondary">
                              {classItem.status}
                            </Typography>
                          )}
                        </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        fullScreen
      >
        <AppBar sx={{ position: 'relative', backgroundColor: "rgb(55, 65, 81)" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {hedding}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogTitle>{hedding}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {hedding}
          </Typography>
          {/* {errorMessage ? ( */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
              }}
            >
                    <Image
                src="/nodatapeople.svg"
                width={300}
                    height={300}
                    alt="Picture of the author"
                  />
             
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Something went wrong
                </Typography>
                <Typography variant="body1" color="error">
                  {/* {errorMessage} */}
                </Typography>
              </div>
            </Box>
          
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogContent>
      </Dialog>

    </Card>
  );
};

export default Menteeslist;