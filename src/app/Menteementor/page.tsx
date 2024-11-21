"use client"
import React, { useState, useEffect } from 'react';
import CustomButton from '@/utils/CustomButton';
import CancelIcon from '@mui/icons-material/Cancel';
// import SelectedRollNumbers  from '../../components/Menteementor/SelectedRollNumbers'
// import AvailableRollNumbers from   '../../components/Menteementor/AvailableRollNumbers'
import Layout from '@/components/Sidemenu/Layout';

import {
  Box,
  Chip,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Stack, 
  colors,
} from '@mui/material';

interface FacultyOption {
  id: string;
  name: string;
}

const MenteeAssigningScreen = () => {
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedFacultyDepartment, setSelectedFacultyDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');

  const facultyOptions: FacultyOption[] = [
    { id: '1', name: 'DR B.SUNEETHA' },
    { id: '2', name: 'DR A.KUMAR' },
    { id: '3', name: 'DR C.RAO' },
  ];

  const handleSubmit = () => {
    console.log({
      selectedCollege,
      selectedCourse,
      selectedDepartment,
      selectedFacultyDepartment,
      selectedYear,
      selectedFaculty,
    });
  };

  return (
    <Layout>
    <Box p={4}>
      <Typography variant="h5" mb={2}>
        Mentees Assigning
      </Typography>
      <Box border={1} borderRadius={2} p={3} borderColor="grey.300">
      <Grid container spacing={3}>
          {/* Choose College */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Choose College"
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              select
              fullWidth
              required
            >
              <MenuItem value="GPCET">GPCET</MenuItem>
            </TextField>
          </Grid>

          {/* Choose Course */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Choose Course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              select
              fullWidth
              required
            >
              <MenuItem value="B.Tech">B.Tech</MenuItem>
            </TextField>
          </Grid>

          {/* Choose Department */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Choose Department"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              select
              fullWidth
              required
            >
              <MenuItem value="Computer Science and Engineering">
                Computer Science and Engineering
              </MenuItem>
            </TextField>
          </Grid>

          {/* Choose Faculty Department */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Choose Faculty Department"
              value={selectedFacultyDepartment}
              onChange={(e) => setSelectedFacultyDepartment(e.target.value)}
              select
              fullWidth
              required
            >
              <MenuItem value="Humanities and Sciences">Humanities and Sciences</MenuItem>
            </TextField>
          </Grid>

          {/* Choose Year */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Choose Year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              select
              fullWidth
              required
            >
              <MenuItem value="2024">2024</MenuItem>
            </TextField>
          </Grid>

          {/* Choose Faculty */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Choose Faculty"
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              select
              fullWidth
              required
            >
              {facultyOptions.map((faculty) => (
                <MenuItem key={faculty.id} value={faculty.name}>
                  {faculty.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
   

          {/* Next Button */}
          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
            <CustomButton onClick={handleSubmit}>Submit</CustomButton>

            </div>
          </Grid>
        </Grid>
      </Box>
      <Box>
    <MultiSelectBox/>
   </Box>
    </Box>
    </Layout>

  );
};


// with component

// const MultiSelectBox: React.FC = () => {
//     const [selectedRollNumbers, setSelectedRollNumbers] = useState<string[]>([]);
//     const students = [
//       { id: 1, rollNumber: '21AT1A0419' },
//       { id: 2, rollNumber: '21AT1A0420' },
//       { id: 3, rollNumber: '21AT1A0421' },
//       { id: 4, rollNumber: '21AT1A0422' },
//       { id: 5, rollNumber: '21AT1A0423' },
//       // Add more students as needed
//     ];
  
//     const handleSubmit = () => {
//       console.log(selectedRollNumbers);
//     };
  
//     const handleSelect = (rollNumber: string) => {
//       if (!selectedRollNumbers.includes(rollNumber)) {
//         setSelectedRollNumbers((prevSelected) => [...prevSelected, rollNumber]);
//       }
//     };
  
//     const handleRemove = (rollNumber: string) => {
//       setSelectedRollNumbers((prevSelected) => prevSelected.filter((number) => number !== rollNumber));
//     };
  
//     return (
//       <Box p={4}>
//         <Typography variant="h6" mb={2} sx={{ fontSize: 'bold' }}>
//           Mentees Assigning Details
//         </Typography>
  
//         <SelectedRollNumbers selectedRollNumbers={selectedRollNumbers} handleRemove={handleRemove} />
//         <AvailableRollNumbers students={students} selectedRollNumbers={selectedRollNumbers} handleSelect={handleSelect} />
  
//         {/* Next Button */}
//         <Grid item xs={12}>
//           <div style={{ display: 'flex', justifyContent: 'center' }}>
//             <CustomButton onClick={handleSubmit}>Submit</CustomButton>
//           </div>
//         </Grid>
//       </Box>
//     );
//   };
  
const MultiSelectBox = () => {
    const [selectedRollNumbers, setSelectedRollNumbers] = useState<string[]>([]);
  const students = [
  { id: 1, rollNumber: '21AT1A0419' },
  { id: 2, rollNumber: '21AT1A0420' },
  { id: 3, rollNumber: '21AT1A0421' },
  { id: 4, rollNumber: '21AT1A0422' },
  { id: 5, rollNumber: '21AT1A0423' },
  // Add more students as needed
];
const handleSubmit = () => {
    console.log(selectedRollNumbers);
  };
    const handleSelect = (rollNumber: string) => {
      if (!selectedRollNumbers.includes(rollNumber)) {
        setSelectedRollNumbers((prevSelected) => [...prevSelected, rollNumber]);
      }
    };
  
    const handleRemove = (rollNumber: string) => {
      setSelectedRollNumbers((prevSelected) =>
        prevSelected.filter((number) => number !== rollNumber)
      );
    };
  
    return (
      <Box p={4}>
        <Typography variant="h6" mb={2} sx={{fontSize:"bold"}}>
          Mentees Assigning Details
        </Typography>
  
        {/* Selected Roll Numbers */}
        <Box mb={2}>
        <Typography variant="subtitle1">
            Mentees Assign to <span style={{fontWeight: "bold",   padding: "2px 4px",borderRadius: "4px",textTransform: 'uppercase',color:"orangered" ,textDecorationLine: 'underline' }} >Dr S Sunita </span>
        </Typography>
        <Typography variant="body1">
            Count:<span style={{fontWeight: "bold",   padding: "2px 4px",borderRadius: "4px",textTransform: 'uppercase',color:"blue" }} >{selectedRollNumbers.length} </span>
        </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1 }}>
            {selectedRollNumbers.map((rollNumber) => (
              <Chip
                key={`selected-${rollNumber}`}
                label={rollNumber}
                onDelete={() => handleRemove(rollNumber)}
                // onDelete={handleRemove}
                variant="outlined"
                sx={{ border: '1px solid #000',backgroundColor:"#3b72ff",color:"white",fontWeight: 'bold'  }}
              />
            ))}
          </Stack>
        </Box>
  
        {/* Available Roll Numbers */}
        <Box
          sx={{
            maxHeight: 200,
            overflowY: 'auto',
            border: '1px solid #ccc',
            borderRadius: 1,
            padding: 2,
          }}
        >
          <Typography variant="subtitle1">Available Roll Numbers</Typography>
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1 }}>
            {students
              .filter((student) => !selectedRollNumbers.includes(student.rollNumber))
              .map((student) => (
                <Chip
                  key={student.id}
                  label={student.rollNumber}
                  variant="outlined"
                  onClick={() => handleSelect(student.rollNumber)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#f0f0f0' },
                  }}
                />
              ))}
          </Stack>
        </Box>
         {/* Next Button */}
         <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
            <CustomButton onClick={handleSubmit}>Submit</CustomButton>

            </div>
          </Grid>
      </Box>
    );
  };
  

export default MenteeAssigningScreen;
