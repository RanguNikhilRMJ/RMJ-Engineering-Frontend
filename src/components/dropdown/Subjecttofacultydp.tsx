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
  subjectcode: string;
  orgid: number;
  year: number;
  sem: number;
  branch: number;
  section: string;
  acadamicid: number;
}

const Subjecttofacultydp: React.FC<BranchdpComponentProps> = ({
  onSelectfaculty,
  selectedfaculty,
  subjectcode,
  orgid,
  year,
  sem,
  branch,
  section,
  acadamicid,
}) => {
  const [schoolOptions, setSchoolOptions] = useState<SchoolOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>(selectedfaculty);

  const ceofetchCourseOptions = useCallback(async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const url = `${DIGITAL_CAMPUS_BASE_URL}/getBySubjecttoFacultybyParams?acadamicid=${acadamicid}&branchid=${branch}&section=${section}&year=${year}&sem=${sem}`;
      const schoolData = await fetchCardDetailstoken(url, 'GET',null,token);
      const filteredbr = schoolData.filter((college: any) => college.subjectcode === subjectcode);
      const options: SchoolOption[] = filteredbr.map((school: any) => ({
        label: school.employeename,
        value: school.facultyid.toString(),
      }));
      setSchoolOptions(options);
    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  }, [subjectcode, year, sem, branch, section, acadamicid]);

  useEffect(() => {
    if (subjectcode && year && sem && branch && section && acadamicid) {
      ceofetchCourseOptions();
    }
  }, [ceofetchCourseOptions]);

  const handleSelectChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const selectedValue = event.target.value;
      setSelectedOption(selectedValue);
      const selectedLabel = schoolOptions.find((school) => school.value === selectedValue.toString())?.label || '';
      onSelectfaculty(selectedLabel, selectedValue.toString());
    },
    [onSelectfaculty, schoolOptions]
  );

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

export default Subjecttofacultydp;
