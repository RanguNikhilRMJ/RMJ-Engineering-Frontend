// components/TextFieldComponent.tsx
import React from 'react';
import { TextField } from '@mui/material';

interface TextFieldComponentProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'string' | 'number' | 'date'; // Add 'type' prop to specify the expected type
}

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({ label, value, onChange, type }) => {
  return (
    <TextField
      autoFocus
      margin="dense"
      label={label}
      fullWidth
      variant="outlined"
      value={value}
      onChange={onChange}
      type={type === 'number' ? 'number' : type === 'date' ? 'date' : 'text'}
    />
  );
};

export default TextFieldComponent;
