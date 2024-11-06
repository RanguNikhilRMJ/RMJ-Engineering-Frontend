import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface GateTypeDpProps {
  onSelectleavepurpuse: (label: string, value: string) => void;
  selectedleavepurpuse: string;
}

const LeavePurpuse: React.FC<GateTypeDpProps> = ({ onSelectleavepurpuse, selectedleavepurpuse }) => {
  const gateTypes = ['On Duty', 'CasualLeave'];

  const [selectedOption, setSelectedOption] = useState<string>(selectedleavepurpuse);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = selectedValue === "0" ? "Choose Leave Purpuse" : selectedValue;
    onSelectleavepurpuse(selectedLabel, selectedValue);
  };

  return (
    <FormControl fullWidth className="my-3">
      <InputLabel id="gatetype-select-label">Choose Leave Purpuse</InputLabel>
      <Select
        labelId="gatetype-select-label"
        id="gatetype-select"
        value={selectedOption}
        label="Choose Leave Purpuse"
        onChange={handleSelectChange}
        sx={{ marginBottom: 1 }}
      >
        <MenuItem value="0">Choose Leave Purpuse</MenuItem>
        {gateTypes.map((type, index) => (
          <MenuItem key={index} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LeavePurpuse;