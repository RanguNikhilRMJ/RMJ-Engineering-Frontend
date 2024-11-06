"use client";
import React, { useState } from 'react';
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
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import Slide, { SlideProps } from '@mui/material/Slide';

interface BacklogsTableProps {
  headers: string[];
  data: {
    customRollNumber: string;
    studentName: string;
    customStudentGroup: string;
    customHostelName: string;
    attendanceStatus: string;
  }[];
  hedding: string;
  subHedding: string;
  error?: string; // Optional error message prop
}

const Transition = React.forwardRef(function Transition(
  props: SlideProps,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BacklogsTable: React.FC<BacklogsTableProps> = ({
  headers,
  data,
  hedding,
  subHedding,
  error,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns: GridColDef[] = [
    { field: 'customRollNumber', headerName: 'Roll Number', flex: 1 },
    { field: 'studentName', headerName: 'Student Name', flex: 1 },
    { field: 'customStudentGroup', headerName: 'Year/Department', flex: 1 },
    { field: 'customHostelName', headerName: 'Block', flex: 1 },
    { field: 'attendanceStatus', headerName: 'Attendance Status', flex: 1 },
  ];

  const hasData = data && data.length > 0;

  return (
    <Card sx={{ boxShadow: theme.shadows[3], backgroundColor: "#e8e8e8" }}>
      <Grid container>
        <Grid item xs={9}>
          <CardHeader
            title={
              <Typography variant="h5" color="text.primary" sx={{ fontWeight: 'bold' }}>
                {hedding}
              </Typography>
            }
            subheader={<Typography variant="body2" color="text.secondary">{subHedding}</Typography>}
          />
        </Grid>
        <Grid item xs={3}>
          <div
            onClick={handleClickOpen}
            style={{
              width: "80px",
              height: "30px",
              border: "1px solid black",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
              cursor: "pointer",
            }}
          >
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              More▽
            </Typography>
          </div>
        </Grid>
      </Grid>

      <CardContent>
        {hasData ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "rgb(46 32 59)" }}>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableCell key={index} sx={{ color: "white", fontWeight: "bold" }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(0, 5).map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell>{row.customRollNumber}</TableCell>
                    <TableCell>{row.studentName}</TableCell>
                    <TableCell>{row.customStudentGroup}</TableCell>
                    <TableCell>{row.customHostelName}</TableCell>
                    <TableCell>{row.attendanceStatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "20vh",
            }}
          >
            <Image src="/nodataAim.svg" width={200} height={200} alt="No data available" />
            <Typography variant="h6" color="text.secondary">
              {error || "No data available"}
            </Typography>
          </Box>
        )}
      </CardContent>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        fullScreen
      >
        <AppBar sx={{ position: 'relative', backgroundColor: "rgb(55, 65, 81)" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {hedding}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogTitle>{hedding}</DialogTitle>
        <DialogContent>
          {hasData ? (
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
  rows={data.map((item, index) => ({ id: index, ...item }))}
  columns={columns}
  checkboxSelection
  initialState={{
    pagination: {
      paginationModel: { pageSize: 5 },
    },
  }}
  pageSizeOptions={[5, 10, 20]}
  sx={{
    backgroundColor: "#f9f9f9",
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "black", // Custom background color for headers
      color: "blue", // Header text color
      fontWeight: "bold", // Bold header text
    },
    "& .MuiDataGrid-columnSeparator": {
      display: "none", // Optional: Hide column separators for a cleaner look
    },
  }}
/>

            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
              }}
            >
              <Image src="/nodataAim.svg" width={300} height={300} alt="No data available" />
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Something went wrong
              </Typography>
              <Typography variant="body1" color="error">
                {error || "No data available"}
              </Typography>
            </Box>
          )}
          <Button onClick={handleClose} color="primary" sx={{ mt: 2 }}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default BacklogsTable;
