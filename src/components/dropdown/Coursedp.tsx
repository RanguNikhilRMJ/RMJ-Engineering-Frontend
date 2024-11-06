import React, { useState, useEffect, useCallback } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';

interface SchoolOption {
  label: string;
  value: string;
}

interface Course {
  courseid: number;
  orgid: number;
  coursename: string;
}

interface CoursedpComponentProps {
  onSelectcourse: (label: string, value: string) => void;
  selectedcourse: string;
  orgid: string;
}

const Coursedp: React.FC<CoursedpComponentProps> = ({ onSelectcourse, selectedcourse, orgid }) => {
  const [schoolOptions, setSchoolOptions] = useState<SchoolOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>(selectedcourse);

  const fetchCourseOptions = useCallback(async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const username = localStorage.getItem('username');
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/allEmployeeDetails`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
      const filteredstaff = fetchedData.filter((college: any) => college.employeid === username);
      const ebranchid = filteredstaff[0].branchid;
      const eorgid = filteredstaff[0].orgid;

      const apiEndpointbr = `${DIGITAL_CAMPUS_BASE_URL}/tblbranchdtls`;
      const fetchedDatabr = await fetchCardDetailstoken(apiEndpointbr, 'GET',null,token);
      const filteredbr = fetchedDatabr.filter((college: any) => college.branchid === ebranchid);
      const ecourseid = filteredbr[0].courseid;

      setSelectedOption(ecourseid);
      const url = `${DIGITAL_CAMPUS_BASE_URL}/tblcoursedtlview`;
      const schoolData = await fetchCardDetailstoken(url, 'GET',null,token);
      const filteredSchoolData = schoolData.filter((course: Course) => course.orgid === eorgid);
      const options: SchoolOption[] = filteredSchoolData.map((school: any) => ({
        label: school.coursename,
        value: school.courseid.toString(),
      }));
      setSchoolOptions(options);
    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  }, []);

  const ceofetchCourseOptions = useCallback(async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const url = `${DIGITAL_CAMPUS_BASE_URL}/tblcoursedtlview`;
      const schoolData = await fetchCardDetailstoken(url, 'GET',null,token);
      const filteredSchoolData = schoolData.filter((course: Course) => course.orgid === parseInt(orgid));
      const options: SchoolOption[] = filteredSchoolData.map((school: any) => ({
        label: school.coursename,
        value: school.courseid.toString(),
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
    const selectedLabel = schoolOptions.find((school) => school.value === selectedValue.toString())?.label || '';
    onSelectcourse(selectedLabel, selectedValue.toString());
  };

  return (
    <FormControl fullWidth className='my-3'>
      <InputLabel id="demo-simple-select-label">Choose Course</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedOption}
        label="Choose Course"
        onChange={handleSelectChange}
        sx={{ marginBottom: 1 }}
      >
        {schoolOptions.map((school) => (
          <MenuItem key={school.value} value={parseInt(school.value)}>
            {school.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Coursedp;