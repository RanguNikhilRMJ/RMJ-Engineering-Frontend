"use client"
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
 
interface StudentData {
  [key: string]: string; // Dynamic keys for student data
}
 
interface ResearchDivProps {
  subject?: string;
  score?: number;
  percentage?: number;
  dialogData?: StudentData[];
  columns: Array<{ field: string; headerName: string }>;
  keys: string[]; // Array of dynamic keys
  iconColor?: string;
}
 
const ResearchDiv: React.FC<ResearchDivProps> = ({
  subject,
  score,
  percentage,
  dialogData,
  columns,
  keys,
  iconColor,
}) => {
  const [open, setOpen] = useState(false);
 
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
          padding: "10px",
          width: "200px",
          margin: "auto",
          backgroundColor: "#e8e8e8",
          position: "relative",
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <Box
            onClick={handleClickOpen}
            sx={{
              width: "60px",
              height: "24px",
              border: "1px solid black",
              borderRadius: "12px",
              cursor: "pointer",
              padding: "2px",
              position: "absolute",
              display: "flex",
              marginTop: "5px",
              justifyContent: "center",
              right: 0,
              top: 0,
              marginBottom: "20px",
              marginRight: "10px",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: "bold", fontSize: "12px", margin: "auto" }}
            >
              More▽
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h5" textAlign="center" sx={{ fontSize: "10px" }}>
            {subject} :
          </Typography>
          <Typography variant="h6" textAlign="center" sx={{ color: "blue" }}>
            {score}
          </Typography>
        </Box>
        {typeof percentage === "number" && (
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
 
      {/* Dialog for showing more details */}
      <Dialog fullScreen open={open} onClose={handleClose}>
      <AppBar sx={{ position: 'relative', backgroundColor: "rgb(55, 65, 81)" }}>
                  <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
              {subject} Details
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {keys.map((key, idx) => (
                    <TableCell key={idx}
                    sx={{ backgroundColor: "rgb(46 32 59)", color: "white", fontWeight: "bold" }}>{key}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dialogData?.map((data, idx) => (
                  <TableRow key={idx}>
                    {keys.map((key, keyIdx) => (
                      <TableCell key={keyIdx}>{data[key]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};
 
export default ResearchDiv;
 
 