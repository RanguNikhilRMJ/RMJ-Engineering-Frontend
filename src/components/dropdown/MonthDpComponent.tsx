import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface MonthOption {
  label: string;
  value: string;
}

interface MonthDpComponentProps {
  onSelectMonth: (label: string, value: string) => void;
  selectedMonth: string;
}

const MonthDpComponent: React.FC<MonthDpComponentProps> = ({ onSelectMonth, selectedMonth }) => {
  const monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthOptions: MonthOption[] = monthNames.map((month) => ({
    label: month,
    value: month,
  }));

  const [selectedOption, setSelectedOption] = useState<string>(selectedMonth);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelectMonth(selectedValue, selectedValue);
  };

  return (
    <FormControl fullWidth className='my-3'>
      <InputLabel id="month-select-label">Month</InputLabel>
      <Select
        labelId="month-select-label"
        id="month-select"
        value={selectedOption}
        onChange={handleSelectChange}
        label="Month"
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

export default MonthDpComponent;