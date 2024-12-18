import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { fetchCardDetailstoken } from "@/modules/apitoken";
import { DIGITAL_CAMPUS_BASE_URL } from "@/modules/apiConfig";
interface StudentData {
  [key: string]: string; // Dynamic keys for student data
}

interface ResearchDivProps {
  subject?: string;
  score?: number;
  percentage?: number;
  dialogData?: StudentData[];
  columns: Array<{ field: string; headerName: string }>; // Column details with header names
  keys: string[]; // Array of dynamic keys
  iconColor?: string;
  putEndpoint: string; // PUT request endpoint
  swaggerFields: Record<string, string | number | boolean>; // Swagger fields as a template
}

const ResearchDiv: React.FC<ResearchDivProps> = ({
  subject,
  score,
  percentage,
  dialogData,
  columns,
  keys,
  iconColor,
  putEndpoint,
  swaggerFields,
}) => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<StudentData | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (data: StudentData) => {
    setEditData(data);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditData(null);
  };

  const handleSave = async () => {
    if (!editData) return;
  
    try {
      const token = localStorage.getItem("token") || undefined; // Retrieve the token from localStorage
      const apiEndpoint = putEndpoint; // Use the provided PUT endpoint
  
      // Call the custom fetch function
      const response = await fetchCardDetailstoken(apiEndpoint, "PUT", editData, token);
  
      console.log("Data successfully updated:", response);
  
      setEditOpen(false); 
    } catch (error:any) {
      if (error) {
        console.error(`Error: ${error}`);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };
  
  return (
    <Paper sx={{ padding: 2, boxShadow: 3 }}>
      <Typography variant="h6" fontWeight="bold">{subject}</Typography>
      <Typography variant="body1">Score: {score}</Typography>
      <Typography variant="body2" color="textSecondary">Percentage: {percentage}%</Typography>

      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        View Details
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flex: 1 }}>
              {subject} Details
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.field}>{column.headerName}</TableCell>
                  ))}
                  <TableCell>Actions</TableCell> {/* Add Actions column for Edit button */}
                </TableRow>
              </TableHead>
              <TableBody>
                {dialogData?.map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column.field}>{row[column.field]}</TableCell> // Use column.field for dynamic keys
                    ))}
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditClick(row)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Details</DialogTitle>
        <DialogContent>
          {columns.map((column) => (
            <TextField
              key={column.field}
              label={column.headerName}
              value={editData ? editData[column.field] : ""}
              onChange={(e) => setEditData((prev) => ({ ...prev, [column.field]: e.target.value }))}
              fullWidth
              margin="normal"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ResearchDiv;
