// components/DialogComponent.tsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Slide,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

interface DialogComponentProps {
  open: boolean;
  handleClose: () => void;
  subject: string;
}

const DialogComponent: React.FC<DialogComponentProps> = ({ open, handleClose, subject }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Slide}
      fullScreen
    >
      <AppBar sx={{ position: 'relative', backgroundColor: 'rgb(55, 65, 81)' }}>
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
        <Typography variant="body1">
          Detailed information about {subject}.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
          }}
        >
          <Image
            src="/nodataAim.svg"
            width={300}
            height={300}
            alt="No data illustration"
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Something went wrong
            </Typography>
            <Typography variant="body1" color="error">
              Unable to load data at this time.
            </Typography>
          </div>
        </Box>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
