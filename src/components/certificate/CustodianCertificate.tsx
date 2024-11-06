import React from 'react';
import { Typography, Box } from '@mui/material';
import Image from 'next/image';

interface CustodianCertificateProps {
  collegeName: string;
  aggrigations: string;
  address: string;
  studentName: string;
  fatherName: string;
  rollNo: string;
  course: string;
  academicYear: string;
  dob: string;
  purpose: string;
  date: string;
}

const CustodianCertificate: React.FC<CustodianCertificateProps> = ({
  collegeName,
  aggrigations,
  address,
  studentName,
  fatherName,
  rollNo,
  course,
  academicYear,
  dob,
  purpose,
  date,
}) => {
  return (
    <Box sx={{ padding: '20px', maxWidth: '800px', margin: 'auto', border: '2px solid black' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <Image src="/gpcet.jpg" width={80} height={80} alt="College Logo" />
      </Box>
      <Typography variant="h5" align="center" gutterBottom style={{ color: 'rgb(136, 0, 1)', fontWeight: 'bold' }}>
        {collegeName}
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'bold' }}>
        (Autonomous)
      </Typography>
      <Typography variant="subtitle2" align="center" sx={{ padding: '0 60px', marginTop: 1 }}>
        {aggrigations}
      </Typography>
      <Typography variant="subtitle2" align="center" sx={{ padding: '0 60px', marginBottom: 2 }}>
        {address}
      </Typography>

      <Typography variant="subtitle1" align="center" gutterBottom sx={{ fontWeight: 'bold', textDecoration: 'underline', marginY: 2 }}>
        TO WHOM SO EVER IT MAY CONCERN
      </Typography>

      <Box sx={{ marginY: 2, paddingX: '20px' }}>
        <Typography variant="body1" gutterBottom>
          This is to certify that Mr./Miss <strong style={{ textDecoration: 'underline' }}>{studentName}</strong>, S/o D/o 
          Sri/Smt. <strong style={{ textDecoration: 'underline' }}>{fatherName}</strong>, bearing Roll No. 
          <strong style={{ textDecoration: 'underline' }}>{rollNo}</strong> is a bonafide student of this college studying 
          <strong style={{ textDecoration: 'underline' }}>{course}</strong> during the academic year 
          <strong style={{ textDecoration: 'underline' }}>{academicYear}</strong>. His/Her original certificates are with the 
          custody of the college, and his/her date of birth is <strong style={{ textDecoration: 'underline' }}>{dob}</strong> 
          as per our records. This certificate is issued on his/her request for <strong style={{ textDecoration: 'underline' }}>{purpose}</strong>.
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ marginTop: 2 }}>
          The following original certificates are with us:
        </Typography>
        <Typography variant="body1" sx={{ marginLeft: 4 }}>
          1. SSC CERTIFICATE<br />
          2. INTERMEDIATE CERTIFICATE
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, paddingX: '20px' }}>
        <Typography variant="body1">Date: {date}</Typography>
        <Typography variant="body1" align="right">Principal</Typography>
      </Box>
    </Box>
  );
};

export default CustodianCertificate;
