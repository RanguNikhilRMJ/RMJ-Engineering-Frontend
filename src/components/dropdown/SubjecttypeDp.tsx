import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface SubjecttypeDpProps {
  onSelectSubjecttype: (label: string, value: string) => void;
  selectedSubjecttype: string;
}

const SubjecttypeDp: React.FC<SubjecttypeDpProps> = ({ onSelectSubjecttype, selectedSubjecttype }) => {
  const Subjecttype = ['Theory', 'Lab', 'Others','Audit','Seminar','Elective','Project Work'];

  const [selectedOption, setSelectedOption] = useState<string>(selectedSubjecttype);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = selectedValue === "0" ? "Choose Subject Type" : selectedValue;
    onSelectSubjecttype(selectedLabel, selectedValue);
  };

  return (
    <FormControl fullWidth className="my-3">
      <InputLabel id="Subjecttype-select-label">Choose Subject Type</InputLabel>
      <Select
        labelId="Subjecttype-select-label"
        id="Subjecttype-select"
        value={selectedOption}
        label="Choose Subject Type"
        onChange={handleSelectChange}
        sx={{ marginBottom: 1 }}
      >
        <MenuItem value="0">Choose Gate Type</MenuItem>
        {Subjecttype.map((type, index) => (
          <MenuItem key={index} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SubjecttypeDp;