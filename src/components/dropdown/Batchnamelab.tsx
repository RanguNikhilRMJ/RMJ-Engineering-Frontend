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

const Batchnamelab: React.FC<BranchdpComponentProps> = ({ onSelectfaculty, selectedfaculty, subjectcode, orgid, year, sem, branch, section, acadamicid }) => {
  const [schoolOptions, setSchoolOptions] = useState<SchoolOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>(selectedfaculty);

  const ceofetchCourseOptions = useCallback(async () => {
    try {  const token = localStorage.getItem('token') || undefined;
      const Url = `${DIGITAL_CAMPUS_BASE_URL}/getByBatchtoAdmissionCounsellingbyParams?acadamicid=${acadamicid}&branchid=${branch}&section=${section}&year=${year}&sem=${sem}`;
      const data = await fetchCardDetailstoken(Url, 'GET',null,token);
      const groupedData = data.reduce((groups: any, item: any) => {
        const batchname = item.batchname;
        if (!groups[batchname]) {
          groups[batchname] = [];
        }
        groups[batchname].push(item);
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
  }, [acadamicid, branch, section, year, sem]);

  useEffect(() => {
    if (subjectcode && orgid && year && sem && branch && section && acadamicid) {
      ceofetchCourseOptions();
    }
  }, [subjectcode, orgid, year, sem, branch, section, acadamicid, ceofetchCourseOptions]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = schoolOptions.find((school) => school.value === selectedValue)?.label || '';
    onSelectfaculty(selectedLabel, selectedValue);
  };

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

export default Batchnamelab;