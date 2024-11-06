import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface SubjecttypeDpProps {
  onSelectSeattype: (label: string, value: string) => void;
  selectedSeattype: string;
}

const Seattypedp: React.FC<SubjecttypeDpProps> = ({ onSelectSeattype, selectedSeattype }) => {
  const Subjecttype = ['FEE PAYMENT', 'CAT-B', 'FEE REIMBURSEMENT'];

  const [selectedOption, setSelectedOption] = useState<string>(selectedSeattype);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = selectedValue === "0" ? "Choose Subject Type" : selectedValue;
    onSelectSeattype(selectedLabel, selectedValue);
  };

  return (
    <FormControl fullWidth className="my-3">
      <InputLabel id="Subjecttype-select-label">Choose Subject Type</InputLabel>
      <Select
        labelId="Subjecttype-select-label"
        id="Subjecttype-select"
        value={selectedOption}
        label="Choose Subject Type"
        onChange={handleSelectChange}
        sx={{ marginBottom: 1 }}
      >
        <MenuItem value="0">Choose Gate Type</MenuItem>
        {Subjecttype.map((type, index) => (
          <MenuItem key={index} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Seattypedp;