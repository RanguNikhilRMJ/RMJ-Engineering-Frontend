"use client";
import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import Image from 'next/image';

interface TransferCertificateProps {
  collegeName?: string;
  organisationAddress?: string;
  certificateTitle?: string;
  studentName: string;
  admissionNumber: string;
  branch: string;
  gender: string;
  fatherName: string;
  nationalityAndReligion: string;
  categoryGroup: string;
  dob: string;
  dateOfAdmission: string;
  admissionClass: string;
  leavingClass: string;
  qualifiedForPromotion: string;
  feesPaid: string;
  dateOfLeaving: string;
  applicationDate: string;
  dateOfCertificate: string;
  conduct: string;
  //
  organisationName: string;
  organisationBrandName: string;
  organisationNAAC: string;
  organisationUGC: string;
  organisationAICTE: string;
  tcnumber:string;
}

const TransferCertificate: React.FC<TransferCertificateProps> = ({
  collegeName,
  organisationAddress,
  certificateTitle,
  studentName,
  admissionNumber,
  branch,
  gender,
  fatherName,
  nationalityAndReligion,
  categoryGroup,
  dob,
  dateOfAdmission,
  admissionClass,
  leavingClass,
  qualifiedForPromotion,
  feesPaid,
  dateOfLeaving,
  applicationDate,
  dateOfCertificate,
  conduct,
  organisationName,
  organisationBrandName,
  organisationNAAC,
  organisationUGC,
  organisationAICTE,
  tcnumber,
}) => {
  return (
    <Box sx={{border:"2px solid black",margin:"10%"}}  className="print-top" >
      <style jsx global>{`
        @media print {
          * {
            margin: 0;
            padding: 0;
          }
          .print-top{
            margin:0
            }
          .print-container {
            padding: 0;
            margin: 0;
          }
          .print-paper {
            margin: 10px auto;
            width: 100%;
            padding: 10px;
          }
          .print-table-cell {
            padding: 10px 8px;
            font-size: 12px;
          }
          .print-header {
            font-size: 14px;
          }
          .print-content {
            font-size: 10px;
          }
        }
      `}</style>
      
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image src="/gpcet.jpg" width={100} height={100} alt="College Logo" />
      </div>
      <Typography variant="h5" align="center" className="print-header" gutterBottom style={{ color: "rgb(136, 0, 1)", fontWeight: "bold" }}>
        {collegeName}
      </Typography>
      <Typography variant="subtitle1" align="center" className="print-header" sx={{ fontWeight: "bold" }}>
        (Autonomous)
      </Typography>
       <Typography variant="subtitle2" align="center" className="print-header" sx={{ padding: "0 40px" }}>
        {organisationName}
      </Typography>
      <Typography variant="subtitle2" align="center" className="print-header" sx={{ padding: "0 40px"}}>
        {organisationBrandName}
      </Typography>
      <Typography variant="subtitle2" align="center" className="print-header" sx={{ padding: "0 40px" }}>
        {organisationNAAC}
      </Typography>
      <Typography variant="subtitle2" align="center" className="print-header" sx={{ padding: "0 40px" }}>
        {organisationUGC}
      </Typography>
      <Typography variant="subtitle2" align="center" className="print-header" sx={{ padding: "0 40px" }}>
        {organisationAICTE}
      </Typography>
      <Typography variant="subtitle2" align="center" className="print-header" sx={{ padding: "0 40px" }}>
        {organisationAddress}
      </Typography>
      <Typography variant="subtitle1" align="center" className="print-header" gutterBottom sx={{ fontWeight: "bold", textDecoration: "underline", marginTop: 1 }}>
        {certificateTitle}
      </Typography>
      <Box  className="print-paper" sx={{ p: 3,margin:"20px 60px"  }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" className="print-content">
            <strong>T.C. No:</strong>{tcnumber}
          </Typography>
          <Typography variant="body1" className="print-content" align="right">
            <strong>Date:</strong> {dateOfCertificate}
          </Typography>
        </Box>

        <TableContainer component={Paper} elevation={0}>
  <Table>
    <TableBody>
      {[
        ["1. Name of the Student", studentName],
        ["2. Admission Number", admissionNumber],
        ["3. Branch", branch],
        ["4. Gender", gender === "M" ? "Male" : gender === "F" ? "Female" : " "],
        ["5. Name of the Father / Guardian / Husband", fatherName],
        ["6. Nationality and Religion", nationalityAndReligion],
        ["7. Whether candidate belongs SC/ST/BC", categoryGroup],
        ["8. Date of Birth", dob],
        ["9. Date of Admission", dateOfAdmission],
        ["10. Class in which student was admitted", admissionClass],
        ["11. Class in which student was studying at time of leaving", leavingClass],
        ["12. Whether qualified for promotion for higher class", qualifiedForPromotion],
        ["13. Whether the student has paid all fees due to college", feesPaid],
        ["14. Date on which the student left the college", dateOfLeaving],
        ["15. Date on which application for transfer certificate was made", applicationDate],
        ["16. Date of Transfer Certificate", dateOfCertificate],
        ["17. Conduct", conduct],
      ].map(([label, value], index) => (
        <TableRow key={index}>
          <TableCell className="print-table-cell" sx={{ fontWeight: "bold" }}>{label}</TableCell>
          <TableCell className="print-table-cell">{value}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


        <Box sx={{ mt: 1, textAlign: 'right' }}>
          <Typography variant="body1" className="print-content">
            Principal <br />
            G. Pullaiah College of Engg. & Tech.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TransferCertificate;
