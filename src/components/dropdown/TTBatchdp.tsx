import React, { useState, useEffect, useCallback } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';

interface SchoolOption {
  label: string;
  value: string;
}

interface TTBatchdpProps {
  onSelectfaculty: (label: string, value: string) => void;
  selectedfaculty: string;
  subjectcode: string;
  year: number;
  sem: number;
  branch: number;
  section: string;
  acadamicid: number;
}

const TTBatchdp: React.FC<TTBatchdpProps> = ({
  onSelectfaculty,
  selectedfaculty,
  subjectcode,
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
      const Url = `${DIGITAL_CAMPUS_BASE_URL}/getByFacultytoBatchbyParams?acadamicid=${acadamicid}&branchid=${branch}&section=${section}&year=${year}&sem=${sem}`;
      const data = await fetchCardDetailstoken(Url, 'GET',null,token);
      const filteredbr = data.filter((college: any) => college.subjectcode === subjectcode);
      
      // Grouping data by batch
      const groupedData = filteredbr.reduce((groups: any, item: any) => {
        const batch = item.batch;
        if (!groups[batch]) {
          groups[batch] = [];
        }
        groups[batch].push(item);
        return groups;
      }, {});

      // Mapping grouped data to SchoolOption type
      const options: SchoolOption[] = Object.keys(groupedData).map((batchname: string) => ({
        label: batchname,
        value: batchname.toString(),
      }));

      setSchoolOptions(options);
    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  }, [acadamicid, branch, section, year, sem, subjectcode]);

  useEffect(() => {
    if (subjectcode && year && sem && branch && section && acadamicid) {
      ceofetchCourseOptions();
    }
  }, [subjectcode, year, sem, branch, section, acadamicid, ceofetchCourseOptions]);

  const handleSelectChange = useCallback((event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = schoolOptions.find((school) => school.value === selectedValue.toString())?.label || '';
    onSelectfaculty(selectedLabel, selectedValue.toString());
  }, [onSelectfaculty, schoolOptions]);

  return (
    <FormControl fullWidth className='my-3'>
      <InputLabel id="demo-simple-select-label">Choose Batch</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedOption}
        label="Choose Batch"
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

export default TTBatchdp;
