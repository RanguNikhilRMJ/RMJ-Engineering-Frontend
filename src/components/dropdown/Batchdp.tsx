import React, { useState, useEffect, useCallback } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
interface YearDpProps {
  onSelectYear: (label: string, value: string) => void;
  selectedYear: string;
}

const Batchdp: React.FC<YearDpProps> = ({ onSelectYear, selectedYear }) => {
  const [sectionCount, setSectionCount] = useState<number>(4);
  const [selectedOption, setSelectedOption] = useState<string>(selectedYear);

  const handleSelectChange = useCallback((event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = selectedValue === "0" ? "Choose Batch" : selectedValue;
    onSelectYear(selectedLabel, selectedValue);
  }, [onSelectYear]);

  return (
    <FormControl fullWidth className="my-3">
      <InputLabel id="year-select-label">Choose Batch</InputLabel>
      <Select
        labelId="year-select-label"
        id="year-select"
        value={selectedOption}
        label="Choose Batch"
        onChange={handleSelectChange}
        sx={{ marginBottom: 1 }}
      >
        <MenuItem value="0">Choose Year</MenuItem>
        {Array.from({ length: sectionCount }, (_, index) => (
          <MenuItem key={index + 1} value={(index + 1).toString()}>
            {index + 1}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Batchdp;