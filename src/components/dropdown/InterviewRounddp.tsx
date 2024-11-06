import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface InterviewRoundOption {
  label: string;
  value: string;
}

interface InterviewRoundDpComponentProps {
  onSelectInterviewRound: (label: string, value: string) => void;
  selectedInterviewRound: string;
}

const InterviewRounddp: React.FC<InterviewRoundDpComponentProps> = ({ onSelectInterviewRound, selectedInterviewRound }) => {
  const dayNames: string[] = [
    'Writen Test',
    'HR Round',
    'Other Round',
    'Overall Status',
  ];

  const dayNameOptions: InterviewRoundOption[] = dayNames.map((day) => ({
    label: day,
    value: day,
  }));

  const [selectedOption, setSelectedOption] = useState<string>(selectedInterviewRound);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelectInterviewRound(selectedValue, selectedValue);
  };

  return (
    <FormControl fullWidth className='my-3'>
      <InputLabel id="InterviewRound-select-label">Interview Round</InputLabel>
      <Select
        labelId="InterviewRound-select-label"
        id="InterviewRound-select"
        value={selectedOption}
        onChange={handleSelectChange}
        label="Interview Round"
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

export default InterviewRounddp;