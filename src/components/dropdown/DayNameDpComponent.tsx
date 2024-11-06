import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface DayNameOption {
  label: string;
  value: string;
}

interface DayNameDpComponentProps {
  onSelectDayName: (label: string, value: string) => void;
  selectedDayName: string;
}

const DayNameDpComponent: React.FC<DayNameDpComponentProps> = ({ onSelectDayName, selectedDayName }) => {
  const dayNames: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const dayNameOptions: DayNameOption[] = dayNames.map((day) => ({
    label: day,
    value: day,
  }));

  const [selectedOption, setSelectedOption] = useState<string>(selectedDayName);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelectDayName(selectedValue, selectedValue);
  };

  return (
    <FormControl fullWidth className='my-3'>
      <InputLabel id="dayname-select-label">Day Name</InputLabel>
      <Select
        labelId="dayname-select-label"
        id="dayname-select"
        value={selectedOption}
        onChange={handleSelectChange}
        label="Day Name"
        sx={{ marginBottom: 2}}
      >
        {dayNameOptions.map((day) => (
          <MenuItem key={day.value} value={day.value}>
            {day.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DayNameDpComponent;
