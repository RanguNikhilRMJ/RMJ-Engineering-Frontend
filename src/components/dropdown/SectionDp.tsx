import React, { useState, useEffect, useCallback } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';

interface SectionDpProps {
  onSelectSection: (label: string, value: string) => void;
  selectedSection: string;
  branchId: string;
}

const SectionDp: React.FC<SectionDpProps> = ({ onSelectSection, selectedSection, branchId }) => {
  const [sectionCount, setSectionCount] = useState<number>(0);
  const letters = Array.from({ length: sectionCount }, (_, i) => String.fromCharCode(97 + i)); // Generate a, b, c, d, ...
  const [selectedOption, setSelectedOption] = useState<string>(selectedSection);

  const ceofetchCourseOptions = useCallback(async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const apiEndpointcr = `${DIGITAL_CAMPUS_BASE_URL}/tblbranchdtls`;
      const fetchedDatacr = await fetchCardDetailstoken(apiEndpointcr, 'GET',null,token);
      const filteredStaffcr = fetchedDatacr.filter((college: any) => college.branchid === branchId);
      if (filteredStaffcr.length > 0) {
        const courseDuration = filteredStaffcr[0].sectioncount;
        setSectionCount(courseDuration);
      }
    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  }, [branchId]);

  const fetchCourseDetails = useCallback(async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const username = localStorage.getItem('username');
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/allEmployeeDetails`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
      const filteredstaff = fetchedData.filter((college: any) => college.employeid === username);
      const ebranchid = filteredstaff[0].branchid;

      const apiEndpointbr = `${DIGITAL_CAMPUS_BASE_URL}/tblbranchdtls`;
      const fetchedDatabr = await fetchCardDetailstoken(apiEndpointbr, 'GET',null,token);
      const filteredbr = fetchedDatabr.filter((college: any) => college.branchid === ebranchid);

      if (filteredbr.length > 0) {
        const courseDuration = filteredbr[0].sectioncount;
        setSectionCount(courseDuration);
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  }, []);

  useEffect(() => {
    if (branchId) {
      ceofetchCourseOptions();
    } else {
      const usertype = localStorage.getItem('usertype');
      if (usertype === "ceo") {
        ceofetchCourseOptions();
      } else {
        fetchCourseDetails();
      }
    }
  }, [branchId, ceofetchCourseOptions, fetchCourseDetails]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = selectedValue === "0" ? "Choose Section" : selectedValue;
    onSelectSection(selectedLabel, selectedValue);
  };

  return (
    <FormControl fullWidth className="my-3">
      <InputLabel id="section-select-label">Choose Section</InputLabel>
      <Select
        labelId="section-select-label"
        id="section-select"
        value={selectedOption}
        label="Choose Section"
        onChange={handleSelectChange}
        sx={{ marginBottom: 1 }}
      >
        <MenuItem value="0">Choose Section</MenuItem>
        {letters.map((letter, index) => (
          <MenuItem key={index} value={letter.toUpperCase()}>
            {letter.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SectionDp;
