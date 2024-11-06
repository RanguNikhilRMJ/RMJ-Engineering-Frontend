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
  status: string;
}

interface AcademicdpComponentProps {
  onSelectacademic: (label: string, value: string) => void;
  selectedacademic: string;
  orgid: string;
}

const Academicyeardp: React.FC<AcademicdpComponentProps> = ({ onSelectacademic, selectedacademic, orgid }) => {
  const [schoolOptions, setSchoolOptions] = useState<SchoolOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>(selectedacademic);

  const fetchCourseOptions = useCallback(async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const username = localStorage.getItem('username');
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/allEmployeeDetails`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
      const filteredstaff = fetchedData.filter((college: any) => college.employeid === username);
      const eorgid = filteredstaff[0].orgid;

      const url = `${DIGITAL_CAMPUS_BASE_URL}/Acadamicyearview`;
      const academicData = await fetchCardDetailstoken(url, 'GET',null,token);
      const filteredacademic = academicData.filter((college: any) => college.orgid === eorgid);
      const filteredacademic1 = academicData.filter((college: Branch) => college.orgid === parseInt(eorgid) && college.status === 'Present');
      const eacadamicid = filteredacademic1[0].acadamicid;
      setSelectedOption(eacadamicid.toString());
      const options: SchoolOption[] = filteredacademic.map((school: any) => ({
        label: `${school.fromyear} - ${school.toyear}`,
        value: school.acadamicid.toString(),
      }));
      setSchoolOptions(options);
    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  }, []);

  const ceofetchCourseOptions = useCallback(async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const url = `${DIGITAL_CAMPUS_BASE_URL}/Acadamicyearview`;
      const schoolData = await fetchCardDetailstoken(url, 'GET',null,token);
      const filteredSchoolData = schoolData.filter((course: Branch) => course.orgid === parseInt(orgid));
      const options: SchoolOption[] = filteredSchoolData.map((school: any) => ({
        label: `${school.fromyear} - ${school.toyear}`,
        value: school.acadamicid.toString(),
      }));
      setSchoolOptions(options);
    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  }, [orgid]);

  useEffect(() => {
    if (orgid) {
      ceofetchCourseOptions();
    } else {
      const usertype = localStorage.getItem('usertype');
      if (usertype === "ceo") {
        ceofetchCourseOptions();
      } else {
        fetchCourseOptions();
      }
    }
  }, [orgid, ceofetchCourseOptions, fetchCourseOptions]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = schoolOptions.find((school) => school.value === selectedValue)?.label || '';
    onSelectacademic(selectedLabel, selectedValue);
  };

  return (
    <FormControl fullWidth className="my-3">
      <InputLabel id="demo-simple-select-label">Choose Academic Year</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedOption}
        label="Choose Academic Year"
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

export default Academicyeardp;
