import React, { useState, useEffect, useCallback } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';

interface SchoolOption {
  label: string;
  value: string;
}

interface BranchdpComponentProps {
  onSelectregu: (label: string, value: string) => void;
  selectedregu: string;
  orgid: string;
  courseid: string;
}

const Regulationdp: React.FC<BranchdpComponentProps> = ({ onSelectregu, selectedregu, orgid, courseid }) => {
  const [schoolOptions, setSchoolOptions] = useState<SchoolOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>(selectedregu);

  const fetchCourseOptions = useCallback(async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const username = localStorage.getItem('username');
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/allEmployeeDetails`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
      const filteredstaff = fetchedData.filter((college: any) => college.employeid === username);
      const ebranchid1 = filteredstaff[0].branchid;
      const eorgid = filteredstaff[0].orgid;

      const apiEndpointbr = `${DIGITAL_CAMPUS_BASE_URL}/tblbranchdtls`;
      const fetchedDatabr = await fetchCardDetailstoken(apiEndpointbr, 'GET',null,token);
      const filteredbr = fetchedDatabr.filter((college: any) => college.branchid === ebranchid1);
      const ebranchshortname = filteredbr[0].branchshortname;
      const ecourseid = filteredbr[0].courseid;

      const url = `${DIGITAL_CAMPUS_BASE_URL}/regulations?orgid=${eorgid}&courseid=${ecourseid}`;
      const schoolData = await fetchCardDetailstoken(url, 'GET',null,token);
      const options: SchoolOption[] = schoolData.map((school: any) => ({
        label: school.regulation,
        value: school.regulation.toString(),
      }));
      setSchoolOptions(options);
    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  }, []);

  const ceofetchCourseOptions = useCallback(async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const url = `${DIGITAL_CAMPUS_BASE_URL}/regulations?orgid=${orgid}&courseid=${courseid}`;
      const schoolData = await fetchCardDetailstoken(url, 'GET',null,token);
      const options: SchoolOption[] = schoolData.map((school: any) => ({
        label: school.regulation,
        value: school.regulation.toString(),
      }));
      setSchoolOptions(options);
    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  }, [orgid, courseid]);

  useEffect(() => {
    if (orgid && courseid) {
      ceofetchCourseOptions();
    } else {
      const usertype = localStorage.getItem('usertype');
      if (usertype === "ceo") {
        ceofetchCourseOptions();
      } else {
        fetchCourseOptions();
      }
    }
  }, [orgid, courseid, ceofetchCourseOptions, fetchCourseOptions]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = schoolOptions.find((school) => school.value === selectedValue.toString())?.label || '';
    onSelectregu(selectedLabel, selectedValue.toString());
  };

  return (
    <FormControl fullWidth className='my-3'>
      <InputLabel id="demo-simple-select-label">Choose Regulation</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedOption}
        label="Choose Regulation"
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

export default Regulationdp;