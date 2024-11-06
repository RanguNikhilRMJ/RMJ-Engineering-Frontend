import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Image from 'next/image';
interface Student1 {
  studentrollno: string;
  name: string;
  fatherName: string;
  branch:string;
  batch:string;
}
interface StudentDetailsProps {
  student: Student1;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ student }) => {
  return (
    <>
      <Grid container spacing={3} alignItems="center">
        {/* Image Section */}
        <Grid item xs={12} sm={4} md={3}>
          <Image
            src="http://production.msmfclasses.com:3006/_next/image?url=%2Fhome%2Fkarunaker.jpg&w=1920&q=75"
            width={150}
            height={150}
            alt="Picture of the author"
            style={{ borderRadius: '8px', objectFit: 'cover' }}
          />
        </Grid>

        {/* Student Info Section */}
        <Grid item xs={12} sm={8} md={9}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            {student.name}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
            <strong>Father's Name:</strong> {student.fatherName}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
            <strong>Branch:</strong> {student.branch}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
            <strong>Roll Number:</strong> {student.studentrollno}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default StudentDetails;
