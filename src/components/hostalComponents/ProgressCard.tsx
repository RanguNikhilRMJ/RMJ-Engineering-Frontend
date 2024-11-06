
"use client"
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  CircularProgress,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  Button,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid

interface StudentData {
  StudentRollNo: string;
  StudentName: string;
  Year: string;
  College: string;
}

interface ProgressCardProps {
  subject: string;
  score?: number;
  percentage?: number;
  paragraph: React.ReactNode;
  dialogData: StudentData[]; // Data to display in the dialog
  columns: Array<{ field: string; headerName: string; flex: number }>; // Define the columns prop
  iconColor: string;

}

const ProgressCard: React.FC<ProgressCardProps> = ({
  subject,
  score,
  percentage,
  paragraph,
  dialogData,
  columns, 
  iconColor// Destructure the columns prop
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          boxShadow: theme.shadows[3],          
          padding: '10px',
          width: '100%',
          margin: 'auto',
          backgroundColor: "#e8e8e8",
          position: "relative"
        }}
        
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar sx={{ bgcolor: `${iconColor}` }}>
          <Typography variant="h6">
           {iconColor === 'red' ? 'A' : iconColor === 'green' ? 'P' : ''}
          </Typography>
          </Avatar>
          <Typography variant="h5" textAlign="center" sx={{ marginLeft: '10px', fontWeight: 'bold' }}>
            {subject}
          </Typography>
          <Box
          onClick={handleClickOpen}
          sx={{
            width: '60px',
            height: '24px',
            border: '1px solid black',
            borderRadius: '12px',
            cursor: 'pointer',
            padding: '2px',
            position: "absolute",
            display:"flex",
            justifyContent:"center",
            bottom:0,
            right: 0,
            marginBottom:"20px",
            marginRight:"10px"
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 'bold', fontSize: '12px',margin:"auto" }}
          >
            More▽
          </Typography>
        </Box>
        </Box>
        <Box>
          <Typography variant="body2" textAlign="center" sx={{ marginLeft: '10px' }}>
            {paragraph}
          </Typography>
        </Box>

        {score && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h4" textAlign="center" sx={{ marginY: 1, fontWeight: "bold" }}>
              {score}
            </Typography>
          </Box>
        )}

      

        {typeof percentage === 'number' && (
          <Box display="flex" justifyContent="center" alignItems="center" position="relative">
            <CircularProgress variant="determinate" value={percentage} size={100} />
            <Box
              position="absolute"
              top={0}
              left={0}
              bottom={0}
              right={0}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6">{`${percentage}%`}</Typography>
            </Box>
          </Box>
        )}
      </Paper>

      <Dialog open={open} onClose={handleClose} fullScreen>
        <AppBar sx={{ position: 'relative', backgroundColor: "rgb(55, 65, 81)" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {subject}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogTitle>{subject}</DialogTitle>
        <DialogContent>
          {/* DataGrid to display dialog data */}
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={dialogData.map((item, index) => ({ id: index, ...item }))}
              columns={columns} // Use the passed columns
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              sx={{
                backgroundColor: "#f9f9f9",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "black",
                  color: "blue",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-columnSeparator": {
                  display: "none",
                },
              }}
            />
          </div>
          <Button onClick={handleClose} color="primary" sx={{ mt: 2 }}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ProgressCard;
