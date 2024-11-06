import React from 'react';
import { Typography, Box } from '@mui/material';
import Image from 'next/image'

interface StudyCertificateProps {
  collegeName: string;
  aggrigations:string;
  address: string;
  certificateTitle: string;
  studentName: string;
  fatherName: string;
  rollNo: string;
  course: string;
  academicYear: string;
  purpose: string;
  date: string;
  conduct:string;
}

const StudyCertificate: React.FC<StudyCertificateProps> = ({
  collegeName,
  aggrigations,
  address,
  certificateTitle,
  studentName,
  fatherName,
  rollNo,
  course,
  academicYear,
  purpose,
  date,
  conduct,
}) => {
  return (
    <Box sx={{ padding: ' 20px 20px', maxWidth: '800px', margin: 'auto',border:"2px solid black" }}>
      <div style={{display:"flex",justifyContent:"center"}}>
      <Image src="/gpcet.jpg" width={150} height={150} alt="Picture of the author"/>
      </div>
      <Typography variant="h5" align="center" gutterBottom style={{color:"rgb(136, 0, 1)",fontWeight:"bold"}}>
        {collegeName}
      </Typography>
      <Typography variant="subtitle1" align="center"  sx={{fontWeight:"bold"}} >
        (Autonomous)
      </Typography>
      <Typography variant="subtitle2" align="center" sx={{padding:"0 100px"}}>
        {aggrigations}
      </Typography>
      <Typography variant="subtitle2" align="center" sx={{padding:"0 100px"}}>
        {address}
      </Typography>

      <Typography variant="subtitle1" align="center" gutterBottom  sx={{fontWeight:"bold",textDecoration:"underline",marginTop: 3}}>
        {certificateTitle}
      </Typography>

      <Box sx={{ marginY: 4,padding:"10px" }}>
        <Typography variant="body1" gutterBottom>
          This is to certify that  <strong style={{textDecoration:"underline"}}>{studentName}</strong> S/o  <strong style={{textDecoration:"underline"}}>{fatherName} </strong> 
           bearing Roll No: <strong style={{textDecoration:"underline"}}>{rollNo}</strong> He/She is Studying <strong style={{textDecoration:"underline"}}>{course}</strong> during the academic year <strong style={{textDecoration:"underline"}}>{academicYear}</strong>.
           His conduct  during the period of study was <strong style={{textDecoration:"underline"}}>{conduct}</strong>
        </Typography>
    
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <Typography variant="body1" >Date: {date}</Typography>
        <Typography variant="body1" align="right">Principal</Typography>
      </Box>
    </Box>
  );
};

export default StudyCertificate;
