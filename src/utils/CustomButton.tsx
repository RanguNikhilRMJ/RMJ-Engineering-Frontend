// CustomButton.tsx
import React, { ReactNode } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface CustomButtonProps extends ButtonProps {
  children: ReactNode; // The content inside the button
  startIcon?: ReactNode; // Optional start icon
  endIcon?: ReactNode; // Optional end icon
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  startIcon,
  endIcon,
  sx,
  ...props
}) => {
  return (
    <Button
      variant="contained"
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      sx={{
        backgroundColor: "#FF6500",
        "&:hover": { backgroundColor: "#ff934c" },
        ...sx, // Spread the additional styles passed in
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
