import React, { useState, useEffect, useCallback } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';

interface SchoolOption {
  label: string;
  value: string;
}

interface BranchdpComponentProps {
  onSelectfaculty: (label: string, value: string) => void;
  selectedfaculty: string;
  branchid: string;
}

const Facultydp: React.FC<BranchdpComponentProps> = ({ onSelectfaculty, selectedfaculty, branchid }) => {
  const [schoolOptions, setSchoolOptions] = useState<SchoolOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>(selectedfaculty);

  const ceofetchCourseOptions = useCallback(async () => {
    try { const token = localStorage.getItem('token') || undefined;
      const url = `${DIGITAL_CAMPUS_BASE_URL}/EmployeebyBranchId?branchid=${branchid}`;
      const schoolData = await fetchCardDetailstoken(url, 'GET',null,token);
      const options: SchoolOption[] = schoolData.map((school: any) => ({
        label: school.employeename,
        value: school.employeid.toString(),
      }));
      setSchoolOptions(options);
    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  }, [branchid]);

  useEffect(() => {
    if (branchid) {
      ceofetchCourseOptions();
    }
  }, [branchid, ceofetchCourseOptions]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = schoolOptions.find((school) => school.value === selectedValue.toString())?.label || '';
    onSelectfaculty(selectedLabel, selectedValue.toString());
  };

  return (
    <FormControl fullWidth className='my-3'>
      <InputLabel id="demo-simple-select-label">Choose Faculty</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedOption}
        label="Choose Faculty"
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

export default Facultydp;