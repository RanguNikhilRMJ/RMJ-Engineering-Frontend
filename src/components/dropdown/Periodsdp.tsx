import React, { useState, useEffect, useCallback } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';

interface SemDpProps {
  onSelectperiod: (label: string, value: string) => void;
  selectedperiod: string;
  branch: number;
  section: string;
  year: number;
  sem: number;
  acadamicid: number;
}

interface Period {
  branchid: number;
  section: string;
  year: number;
  sem: number;
  acadamicid: number;
  noofperiod: number;
}

const Periodsdp: React.FC<SemDpProps> = ({ onSelectperiod, selectedperiod, branch, section, year, sem, acadamicid }) => {
  const [sectionCount, setSectionCount] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>(selectedperiod);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = selectedValue === "0" ? "Choose period" : selectedValue;
    onSelectperiod(selectedLabel, selectedValue);
  };

  const ceofetchCourseOptions = useCallback(async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const Url = `${DIGITAL_CAMPUS_BASE_URL}/tblnoofperiodsview`;
      const data = await fetchCardDetailstoken(Url, 'GET',null,token);
      const filteredstaff = data.filter((college: Period) => 
        college.branchid === branch && 
        college.section === section && 
        college.year === year && 
        college.sem === sem && 
        college.acadamicid === acadamicid
      );
      if (filteredstaff.length > 0) {
        const courseDuration = filteredstaff[0].noofperiod;
        setSectionCount(courseDuration);
      }
    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  }, [branch, section, year, sem, acadamicid]);

  useEffect(() => {
    if (branch && section && year && sem && acadamicid) {
      ceofetchCourseOptions();
    }
  }, [branch, section, year, sem, acadamicid, ceofetchCourseOptions]);

  return (
    <FormControl fullWidth className="my-3">
      <InputLabel id="year-select-label">Choose period</InputLabel>
      <Select
        labelId="year-select-label"
        id="year-select"
        value={selectedOption}
        label="Choose period"
        onChange={handleSelectChange}
        sx={{ marginBottom: 1 }}
      >
        <MenuItem value="0">Choose period</MenuItem>
        {[...Array(sectionCount)].map((_, index) => (
          <MenuItem key={index + 1} value={(index + 1).toString()}>
            {index + 1}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Periodsdp;
