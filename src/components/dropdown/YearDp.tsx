import React, { useState, useEffect, useCallback } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';

interface YearDpProps {
  onSelectYear: (label: string, value: string) => void;
  selectedYear: string;
  courseid: number; // Ensure courseid is of type number
}

const YearDp: React.FC<YearDpProps> = ({ onSelectYear, selectedYear, courseid }) => {
  const [sectionCount, setSectionCount] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>(selectedYear);

  const ceofetchCourseOptions = useCallback(async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const apiEndpointcr = `${DIGITAL_CAMPUS_BASE_URL}/tblcoursedtlview`;
      const fetchedDatacr = await fetchCardDetailstoken(apiEndpointcr, 'GET',null,token);
      const filteredStaffcr = fetchedDatacr.filter((college: any) => college.courseid === courseid);
      if (filteredStaffcr.length > 0) {
        const courseDuration = filteredStaffcr[0].courseduration;
        setSectionCount(courseDuration);
      }
    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  }, [courseid]);

  const fetchCourseDetails = useCallback(async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const username = localStorage.getItem('username');
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/allEmployeeDetails`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
      const filteredstaff= fetchedData.filter((college: any) => college.employeid  === username);
      const ebranchid1 = filteredstaff[0].branchid;
      
      const apiEndpointbr = `${DIGITAL_CAMPUS_BASE_URL}/tblbranchdtls`;
      const fetchedDatabr = await fetchCardDetailstoken(apiEndpointbr, 'GET',null,token);
      const filteredbr= fetchedDatabr.filter((college: any) => college.branchid  === ebranchid1);
      const ecourseid = filteredbr[0].courseid;

      const apiEndpointcr = `${DIGITAL_CAMPUS_BASE_URL}/tblcoursedtlview`;
      const fetchedDatacr = await fetchCardDetailstoken(apiEndpointcr, 'GET',null,token);
      const filteredStaffcr = fetchedDatacr.filter((college: any) => college.courseid === ecourseid);

      if (filteredStaffcr.length > 0) {
        const courseDuration = filteredStaffcr[0].courseduration;
        setSectionCount(courseDuration);
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  }, []);

  useEffect(() => {
    const usertype = localStorage.getItem('usertype');
    if (courseid) {
      ceofetchCourseOptions();
    } else if (usertype === "ceo") {
      ceofetchCourseOptions();
    } else {
      fetchCourseDetails();
    }
  }, [courseid, ceofetchCourseOptions, fetchCourseDetails]);

  const handleSelectChange = useCallback((event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = selectedValue === "0" ? "Choose Year" : selectedValue;
    onSelectYear(selectedLabel, selectedValue);
  }, [onSelectYear]);

  return (
    <FormControl fullWidth className="my-3">
      <InputLabel id="year-select-label">Choose Year</InputLabel>
      <Select
        labelId="year-select-label"
        id="year-select"
        value={selectedOption}
        label="Choose Year"
        onChange={handleSelectChange}
        sx={{ marginBottom: 1 }}
      >
        <MenuItem value="0">Choose Year</MenuItem>
        {Array.from({ length: sectionCount }, (_, index) => (
          <MenuItem key={index + 1} value={(index + 1).toString()}>
            {index + 1}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default YearDp;
