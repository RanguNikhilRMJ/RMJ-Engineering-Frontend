import React, { useState, useEffect, useCallback } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';

interface SchoolOption {
  label: string;
  value: string;
}

interface BranchdpComponentProps {
  onSelectregSubject: (label: string, value: string) => void;
  selectedregSubject: string;
  branchid: string;
  year: string;
  sem: string;
  acadamicid: string;
  subjecttype: string;
}

const REgSubjectdp: React.FC<BranchdpComponentProps> = ({ onSelectregSubject, selectedregSubject, branchid, year, sem, acadamicid, subjecttype }) => {
  const [schoolOptions, setSchoolOptions] = useState<SchoolOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>(selectedregSubject);

  const ceofetchCourseOptions = useCallback(async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const url = `${DIGITAL_CAMPUS_BASE_URL}/customview?acadamicid=${acadamicid}&branchid=${branchid}&year=${year}&sem=${sem}`;
      const schoolData = await fetchCardDetailstoken(url, 'GET',null,token);

      let options: SchoolOption[] = [];

      if (subjecttype === "all") {
        options = schoolData.map((school: any) => ({
          label: school.subjectname,
          value: school.subjectcode.toString(),
        }));
      } else if (subjecttype === "Lab") {
        const filteredSchoolData = schoolData.filter((course: any) => course.subjecttype === subjecttype);
        options = filteredSchoolData.map((school: any) => ({
          label: school.subjectname,
          value: school.subjectcode.toString(),
        }));
      } else {
        const filteredSchoolData = schoolData.filter((course: any) =>
          ['Theory', 'Others', 'Audit', 'Seminar', 'Elective', 'Project Work'].includes(course.subjecttype)
        );
        options = filteredSchoolData.map((school: any) => ({
          label: school.subjectname,
          value: school.subjectcode.toString(),
        }));
      }

      setSchoolOptions(options);
    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  }, [acadamicid, branchid, year, sem, subjecttype]);

  useEffect(() => {
    if (branchid && year && sem && acadamicid && subjecttype) {
      ceofetchCourseOptions();
    }
  }, [branchid, year, sem, acadamicid, subjecttype, ceofetchCourseOptions]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = schoolOptions.find((school) => school.value === selectedValue)?.label || '';
    onSelectregSubject(selectedLabel, selectedValue);
  };

  return (
    <FormControl fullWidth className='my-3'>
      <InputLabel id="demo-simple-select-label">Choose Subject</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedOption}
        label="Choose Subject"
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

export default REgSubjectdp;