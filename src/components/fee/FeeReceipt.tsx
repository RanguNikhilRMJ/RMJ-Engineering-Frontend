import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import NumberToWords from './NumberToWords';
import Image from 'next/image';

interface studentReceiptsProps {
  sno: number;
  feetype: string;
  paid: number;
  year: number;
}

interface FeeReceiptProps {
  receiptno: string;
  payeddate: string;
  admissionid: string;
  classname: string;
  name: string;
  fathername: string;
  paymenttype: string;
  total: number;
  orgname: string;
  address: string;
  NACC:string;
  collagename:string;
  mobilenumber: string;
  studentReceipts: studentReceiptsProps[];
}

const tableHeaderStyle: React.CSSProperties = {
  border: '1px solid #000',
  padding: '10px',
  textAlign: 'center',
  fontWeight: 'bold',
};

const tableRowStyle = {
  border: '1px solid #000',
};

const tableCellStyle: React.CSSProperties = {
  border: '1px solid #000',
  padding: '10px',
  textAlign: 'center',
};

const FeeReceipt: React.FC<FeeReceiptProps & { feereceipt: string }> = (props) => {
  const {
    receiptno,
    payeddate,
    admissionid,
    classname,
    name,
    fathername,
    studentReceipts,
    total,
    paymenttype,
    orgname,
    address,
    mobilenumber,
    NACC,
    collagename,
  } = props;

  return (
    <>
      <Box mb={1} style={{ width: "900px", border: "1px solid black" }}>
        <div style={{position:"absolute"}}>
      <Image
              src="https://www.recw.ac.in/wp-content/uploads/2022/07/RCEW-Logo.png"
              alt="College Logo"
              width={100}
              height={100}
            />
            </div>
        <Typography style={{ color: "black", fontWeight: "bold", fontSize: "0.9rem", textAlign: "center" }}>
           {NACC}
        </Typography>
        <Typography style={{ color: "black", fontWeight: "bold", fontSize: "0.9rem", textAlign: "center" }}>
          {collagename}
        </Typography>
        <Typography style={{ color: "black", fontWeight: "bold", fontSize: "0.9rem", textAlign: "center" }}>
          {orgname} <br />
          {address} <br />
          Tel: {mobilenumber}
        </Typography>
        <h1 style={{ color: "black", fontWeight: "bold", display: "flex", fontSize: "0.9rem", justifyContent: "end" }}>
          PH NO: {mobilenumber}&nbsp; &nbsp;&nbsp;&nbsp;
        </h1>
        <Grid container>
          <Grid item xs={2}>
       
          </Grid>
          <Grid item xs={9}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Typography variant="h6" fontWeight="bold" mt={0} style={{ fontSize: '1.1rem' }}>
                {orgname}
              </Typography>
              <Typography variant="h6" mt={-0.5} style={{ fontSize: '1.1rem' }}>
                {address}
              </Typography>
              <Typography variant="h6" mt={-0.5} style={{ fontSize: '1.1rem' }}>
                Fee receipt: {props.feereceipt}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <div style={{ display: "flex", justifyContent: "space-between", margin: "3px" }}>
          <div>
            <Typography style={{ color: "black", fontWeight: "bold", fontSize: "0.9rem" }} variant="h6" mb={0}>
              Receipt No: <span style={{ color: "black", fontWeight: "normal", fontSize: "0.9rem" }}>{receiptno} </span>
            </Typography>
            <Typography style={{ color: "black", fontWeight: "bold", fontSize: "0.9rem" }} variant="h6" mb={0}>
              Roll No: <span style={{ color: "black", fontWeight: "normal", fontSize: "0.9rem" }}>{admissionid} </span>
            </Typography>
            <Typography style={{ color: "black", fontWeight: "bold", fontSize: "0.9rem" }} variant="h6" mb={0}>
              Branch: <span style={{ color: "black", fontWeight: "normal", fontSize: "0.9rem" }}>{classname} </span>
            </Typography>
          </div>
          <div>
            <Typography style={{ color: "black", fontWeight: "bold", fontSize: "0.9rem" }} variant="h6" mt={0}>
              Date: <span style={{ color: "black", fontWeight: "normal", fontSize: "0.9rem" }}>{payeddate} </span>
            </Typography>
            <Typography style={{ color: "black", fontWeight: "bold", fontSize: "0.9rem" }} variant="h6" mt={0}>
              Name:
              <span style={{ color: "black", fontWeight: "normal", fontSize: "0.9rem" }}> {name}</span>
            </Typography>
            <Typography style={{ color: "black", fontWeight: "bold", fontSize: "0.9rem" }} variant="h6" mt={0}>
              Father's Name: <span style={{ color: "black", fontWeight: "normal", fontSize: "0.9rem" }}>{fathername}</span>
            </Typography>
          </div>
        </div>
        <Grid container>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '3px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0px 10px' }}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>S.No</th>
                  <th style={tableHeaderStyle}>Year</th>
                  <th style={tableHeaderStyle}>Particulars</th>
                  <th style={tableHeaderStyle}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(studentReceipts) && studentReceipts.length > 0 ? (
                  studentReceipts.map((fee, index) => (
                    <tr key={index} style={tableRowStyle}>
                      <td style={tableCellStyle}>{fee.sno}</td>
                      <td style={tableCellStyle}>{fee.year}</td>
                      <td style={tableCellStyle}>{fee.feetype}</td>
                      <td style={tableCellStyle}>{fee.paid}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} style={tableCellStyle}>
                      No fee details available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold" style={{ fontSize: '0.9rem', margin: '0px 10px' }}>
              Total: <span style={{ fontWeight: 'normal' }}>{total}</span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column" alignItems="flex-start" style={{ margin: '0px 10px' }}>
              <NumberToWords number={total} />
              <Typography variant="body1" fontWeight="bold" style={{ fontSize: '0.9rem' }}>
                Payment Type: <span style={{ fontWeight: 'normal' }}>{paymenttype}</span>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <div style={{ display: "flex", justifyContent: "end", margin: "20px" }}>
          <h1 style={{ color: "black", fontWeight: "bold", fontSize: "0.9rem" }}>Signature</h1>
        </div>
      </Box>
    </>
  );
};

export default FeeReceipt;
