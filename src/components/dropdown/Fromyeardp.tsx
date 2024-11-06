import React, { useState, useCallback } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface YearDpProps {
  onSelectYear: (label: string, value: string) => void;
  selectedYear: string;
}

const Fromyeardp: React.FC<YearDpProps> = ({ onSelectYear, selectedYear }) => {
  const currentYear = new Date().getFullYear();
  const startYear = 2018;
  const yearRange = Array.from({ length: currentYear - startYear + 1 }, (_, index) => (startYear + index).toString());

  const [selectedOption, setSelectedOption] = useState<string>(selectedYear);

  const handleSelectChange = useCallback((event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = selectedValue === "0" ? "Choose From Year" : selectedValue;
    onSelectYear(selectedLabel, selectedValue);
  }, [onSelectYear]);

  return (
    <FormControl fullWidth className="my-3">
      <InputLabel id="year-select-label">Choose From Year</InputLabel>
      <Select
        labelId="year-select-label"
        id="year-select"
        value={selectedOption}
        label="Choose From Year"
        onChange={handleSelectChange}
        sx={{ marginBottom: 1 }}
      >
        <MenuItem value="0">Choose From Year</MenuItem>
        {yearRange.map(year => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Fromyeardp;