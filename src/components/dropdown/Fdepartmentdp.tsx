import React, { useState, useEffect, useCallback } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';

interface SchoolOption {
  label: string;
  value: string;
}

interface Branch {
  courseid: number;
  orgid: number;
  coursename: string;
}

interface BranchdpComponentProps {
  onSelectbranch: (label: string, value: string) => void;
  selectedbranch: string;
  courseid: string;
}

const Fdepartmentdp: React.FC<BranchdpComponentProps> = ({ onSelectbranch, selectedbranch, courseid }) => {
  const [schoolOptions, setSchoolOptions] = useState<SchoolOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>(selectedbranch);

  const ceofetchCourseOptions = useCallback(async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const url = `${DIGITAL_CAMPUS_BASE_URL}/tblbranchdtls`;
      const schoolData = await fetchCardDetailstoken(url, 'GET',null,token);
      const filteredSchoolData = schoolData.filter((course: Branch) => course.courseid === parseInt(courseid));
      const options: SchoolOption[] = filteredSchoolData.map((school: any) => ({
        label: school.branchname,
        value: school.branchid.toString(),
      }));
      setSchoolOptions(options);
    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  }, [courseid]);

  useEffect(() => {
    if (courseid) {
      ceofetchCourseOptions();
    }
  }, [courseid, ceofetchCourseOptions]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = schoolOptions.find((school) => school.value === selectedValue.toString())?.label || '';
    onSelectbranch(selectedLabel, selectedValue.toString());
  };

  return (
    <FormControl fullWidth className='my-3'>
      <InputLabel id="demo-simple-select-label">Choose Faculty Department</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedOption}
        label="Choose Faculty Department"
        onChange={handleSelectChange}
        sx={{ marginBottom: 1 }}
      >
        {schoolOptions.map((school) => (
          <MenuItem key={school.value} value={school.value}>
            {school.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Fdepartmentdp;