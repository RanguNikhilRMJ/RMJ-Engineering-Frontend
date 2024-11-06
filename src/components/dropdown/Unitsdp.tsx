import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface unitOption {
  label: string;
  value: string;
}

interface UnitsdpProps {
  onSelectunit: (label: string, value: string) => void;
  selectedunit: string;
}

const Unitsdp: React.FC<UnitsdpProps> = ({ onSelectunit, selectedunit }) => {
  const monthNames: string[] = [
    'Unit-1',
    'Unit-2',
    'Unit-3',
    'Unit-4',
    'Unit-5',
    'Other',
  ];

  const monthOptions: unitOption[] = monthNames.map((month) => ({
    label: month,
    value: month,
  }));

  const [selectedOption, setSelectedOption] = useState<string>(selectedunit);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelectunit(selectedValue, selectedValue);
  };

  return (
    <FormControl fullWidth className='my-3'>
      <InputLabel id="month-select-label">Units</InputLabel>
      <Select
        labelId="month-select-label"
        id="month-select"
        value={selectedOption}
        onChange={handleSelectChange}
        label="Units"
        sx={{ marginBottom: 2}}
      >
        {monthOptions.map((month) => (
          <MenuItem key={month.value} value={month.value}>
            {month.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Unitsdp;