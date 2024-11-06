import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface CustomSnackbarProps {
  open: boolean;
  autoHideDuration?: number;
  onClose: () => void;
  severity: AlertProps['severity'];
  message: string | null;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  autoHideDuration = 5000,
  onClose,
  severity,
  message,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert onClose={onClose} severity={severity} elevation={6} variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;
