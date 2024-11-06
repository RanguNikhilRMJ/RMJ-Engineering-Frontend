import React, { useState, useCallback } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface YearDpProps {
  onSelectYear: (label: string, value: string) => void;
  selectedYear: string;
}

const Toyeardp: React.FC<YearDpProps> = ({ onSelectYear, selectedYear }) => {
  const currentYear = new Date().getFullYear();
  const startYear = 2018;
  const yearRange = Array.from({ length: (currentYear - startYear + 2) }, (_, index) => (startYear + index).toString());

  const [selectedOption, setSelectedOption] = useState<string>(selectedYear);

  const handleSelectChange = useCallback((event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = selectedValue === "0" ? "Choose To Year" : selectedValue;
    onSelectYear(selectedLabel, selectedValue);
  }, [onSelectYear]);

  return (
    <FormControl fullWidth className="my-3">
      <InputLabel id="year-select-label">Choose To Year</InputLabel>
      <Select
        labelId="year-select-label"
        id="year-select"
        value={selectedOption}
        label="Choose To Year"
        onChange={handleSelectChange}
        sx={{ marginBottom: 1 }}
      >
        <MenuItem value="0">Choose To Year</MenuItem>
        {yearRange.map(year => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Toyeardp;