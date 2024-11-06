import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  FormControl,
  Select,
  InputLabel,
  SelectChangeEvent, // Import SelectChangeEvent from MUI
} from '@mui/material';

type TransportFeeDialogProps = {
  open: boolean;
  onClose: () => void;
};

const TransportFeeDialog: React.FC<TransportFeeDialogProps> = ({ open, onClose }) => {
  const [pickupPoint, setPickupPoint] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  // Update the type of event parameter to SelectChangeEvent
  const handlePickupPointChange = (event: SelectChangeEvent<string>) => {
    setPickupPoint(event.target.value as string);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleUpdate = () => {
    // Implement the update logic here
    console.log(`Pickup Point: ${pickupPoint}, Amount: ${amount}`);
    onClose(); // Close the dialog after updating
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Transport Fee / Route Change</DialogTitle>
      <DialogContent>
        <Box mb={2} p={1} style={{ backgroundColor: '#FFF3CD', borderRadius: '5px' }}>
          <Typography variant="body2" color="textSecondary">
            🚨 Transport Fee / Route Change
          </Typography>
        </Box>
        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">Pickup points *</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            label="Pickup points *"
            value={pickupPoint}
            onChange={handlePickupPointChange} // Correctly typed
          >
            <MenuItem value="PUMP HOUSE">PUMP HOUSE</MenuItem>
            <MenuItem value="POINT A">POINT A</MenuItem>
            <MenuItem value="POINT B">POINT B</MenuItem>
            {/* Add more pickup points as necessary */}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="Amount *"
          value={amount}
          onChange={handleAmountChange}
          type="number"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary" variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransportFeeDialog;
