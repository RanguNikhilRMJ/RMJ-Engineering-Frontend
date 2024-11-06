import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface GateTypeDpProps {
  onSelectGateType: (label: string, value: string) => void;
  selectedGateType: string;
}

const GatetypeDp: React.FC<GateTypeDpProps> = ({ onSelectGateType, selectedGateType }) => {
  const gateTypes = ['Gate', 'Non Gate', 'Mathematics'];

  const [selectedOption, setSelectedOption] = useState<string>(selectedGateType);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = selectedValue === "0" ? "Choose Gate Type" : selectedValue;
    onSelectGateType(selectedLabel, selectedValue);
  };

  return (
    <FormControl fullWidth className="my-3">
      <InputLabel id="gatetype-select-label">Choose Gate Type</InputLabel>
      <Select
        labelId="gatetype-select-label"
        id="gatetype-select"
        value={selectedOption}
        label="Choose Gate Type"
        onChange={handleSelectChange}
        sx={{ marginBottom: 1 }}
      >
        <MenuItem value="0">Choose Gate Type</MenuItem>
        {gateTypes.map((type, index) => (
          <MenuItem key={index} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GatetypeDp;