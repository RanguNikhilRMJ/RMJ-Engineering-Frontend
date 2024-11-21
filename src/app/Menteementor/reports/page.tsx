"use client"
import React, { useState } from 'react';
import CustomButton from '@/utils/CustomButton';
import * as XLSX from 'xlsx';
import {
  Box,
  Chip,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Stack,
  Button
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Layout from '@/components/Sidemenu/Layout';

interface FacultyOption {
  id: string;
  name: string;
}

interface Student {
  id: number;
  rollNumber: string;
}

const facultyOptions: FacultyOption[] = [
  { id: '1', name: 'DR B.SUNEETHA' },
  { id: '2', name: 'DR A.KUMAR' },
  { id: '3', name: 'DR C.RAO' },
];

const students: Student[] = [
  { id: 1, rollNumber: '21AT1A0419' },
  { id: 2, rollNumber: '21AT1A0420' },
  { id: 3, rollNumber: '21AT1A0421' },
  // Add more students as needed
];

const MenteeAssigningScreen = () => {
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedRollNumbers, setSelectedRollNumbers] = useState<string[]>([]);

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

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(
      selectedRollNumbers.map((rollNumber, index) => ({
        ID: index + 1,
        RollNumber: rollNumber,
        Faculty: selectedFaculty,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Assigned Mentees');
    XLSX.writeFile(wb, 'Assigned_Mentees.xlsx');
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'rollNumber', headerName: 'Roll Number', width: 200 },
    { field: 'faculty', headerName: 'Faculty', width: 200 },
  ];

  const rows = selectedRollNumbers.map((rollNumber, index) => ({
    id: index + 1,
    rollNumber,
    faculty: selectedFaculty,
  }));

  return (
    <Layout>
      <Box p={4}>
        <Typography variant="h5" mb={2}>
          Mentees Assigning
        </Typography>
        <Grid container spacing={3}>
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
          {/* Selected Roll Numbers */}
          <Grid item xs={12}>
            <Typography variant="h6">Selected Roll Numbers</Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {selectedRollNumbers.map((rollNumber) => (
                <Chip
                  key={rollNumber}
                  label={rollNumber}
                  onDelete={() => handleRemove(rollNumber)}
                  sx={{ backgroundColor: '#3b72ff', color: 'white', fontWeight: 'bold' }}
                />
              ))}
            </Stack>
          </Grid>
          {/* Available Roll Numbers */}
          <Grid item xs={12}>
            <Typography variant="subtitle1">Available Roll Numbers</Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {students
                .filter((student) => !selectedRollNumbers.includes(student.rollNumber))
                .map((student) => (
                  <Chip
                    key={student.id}
                    label={student.rollNumber}
                    onClick={() => handleSelect(student.rollNumber)}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
            </Stack>
          </Grid>
          {/* Export Button */}
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleExport}>
              Export to Excel
            </Button>
          </Grid>
          {/* Assigned Mentees Table */}
          <Grid item xs={12}>
            <Typography variant="h6" mt={3}>
              Assigned Mentees Table
            </Typography>
            <DataGrid
              rows={rows}
              columns={columns}
              autoHeight
              disableColumnMenu
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5, page: 0 },
                },
              }}
              pageSizeOptions={[5, 10, 20]} // Allow changing page sizes
            />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default MenteeAssigningScreen;
