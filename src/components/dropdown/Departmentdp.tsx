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

const Departmentdp: React.FC<BranchdpComponentProps> = ({ onSelectbranch, selectedbranch, courseid }) => {
  const [schoolOptions, setSchoolOptions] = useState<SchoolOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>(selectedbranch);

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
      const ebranchid = filteredbr[0].branchid;

      if (ebranchshortname === "HS") {
        const url = `${DIGITAL_CAMPUS_BASE_URL}/tblbranchdtls`;
        const schoolData = await fetchCardDetailstoken(url, 'GET',null,token);
        const filteredSchoolData = schoolData.filter((course: Branch) => course.courseid === parseInt(ecourseid));
        const options: SchoolOption[] = filteredSchoolData.map((school: any) => ({
          label: school.branchname,
          value: school.branchid.toString(),
        }));
        setSchoolOptions(options);
      } else {
        const username = localStorage.getItem('username');
        setSelectedOption(ebranchid);
        const url = `${DIGITAL_CAMPUS_BASE_URL}/tblbrachdtlscustom?facultyId=${username}`;
        const schoolData = await fetchCardDetailstoken(url, 'GET',null,token);
        const options: SchoolOption[] = schoolData.map((school: any) => ({
          label: school.branchname,
          value: school.branchid.toString(),
        }));
        setSchoolOptions(options);
      }
      const usertype = localStorage.getItem('usertype');
      if (usertype === 'Principal') {
        const url = `${DIGITAL_CAMPUS_BASE_URL}/tblbranchdtls`;
        const schoolData = await fetchCardDetailstoken(url, 'GET',null,token);
        const filteredSchoolData = schoolData.filter((course: Branch) => course.courseid === parseInt(ecourseid));
        const options: SchoolOption[] = filteredSchoolData.map((school: any) => ({
          label: school.branchname,
          value: school.branchid.toString(),
        }));
        setSchoolOptions(options);
      } 
    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  }, []);

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
    } else {
      const usertype = localStorage.getItem('usertype');
      if (usertype === "ceo") {
        ceofetchCourseOptions();
      } else {
        fetchCourseOptions();
      }
    }
  }, [courseid, ceofetchCourseOptions, fetchCourseOptions]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = schoolOptions.find((school) => school.value === selectedValue.toString())?.label || '';
    onSelectbranch(selectedLabel, selectedValue.toString());
  };

  return (
    <FormControl fullWidth className='my-3'>
      <InputLabel id="demo-simple-select-label">Choose Department</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedOption}
        label="Choose Department"
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

export default Departmentdp;
