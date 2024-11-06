import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface GateTypeDpProps {
  onSelectleavetype: (label: string, value: string) => void;
  selectedleavetype: string;
}

const LeaveTypedp: React.FC<GateTypeDpProps> = ({ onSelectleavetype, selectedleavetype }) => {
  const gateTypes = ['Full Day', 'FN Half Day', 'AN Half Day'];

  const [selectedOption, setSelectedOption] = useState<string>(selectedleavetype);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = selectedValue === "0" ? "Choose Leave Type" : selectedValue;
    onSelectleavetype(selectedLabel, selectedValue);
  };

  return (
    <FormControl fullWidth className="my-3">
      <InputLabel id="gatetype-select-label">Choose Leave Type</InputLabel>
      <Select
        labelId="gatetype-select-label"
        id="gatetype-select"
        value={selectedOption}
        label="Choose Leave Type"
        onChange={handleSelectChange}
        sx={{ marginBottom: 1 }}
      >
        <MenuItem value="0">Choose Leave Type</MenuItem>
        {gateTypes.map((type, index) => (
          <MenuItem key={index} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LeaveTypedp;