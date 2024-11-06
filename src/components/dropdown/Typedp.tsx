import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface TypeDpProps {
  onSelectType: (label: string, value: string) => void;
  selectedType: string;
}

const Typedp: React.FC<TypeDpProps> = ({ onSelectType, selectedType }) => {
  const Types = ['No Of Periods', 'Subject To Faculty', 'Create Lab Batch','Faculty To Lab Batch'];

  const [selectedOption, setSelectedOption] = useState<string>(selectedType);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = selectedValue === "0" ? "Choose Type" : selectedValue;
    onSelectType(selectedLabel, selectedValue);
  };

  return (
    <FormControl fullWidth className="my-3">
      <InputLabel id="Type-select-label">Choose Type</InputLabel>
      <Select
        labelId="Type-select-label"
        id="Type-select"
        value={selectedOption}
        label="Choose Type"
        onChange={handleSelectChange}
        sx={{ marginBottom: 1 }}
      >
  <MenuItem value="0">Choose Type</MenuItem>
        {Types.map((type, index) => (
          <MenuItem key={index} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Typedp;