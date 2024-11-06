import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';

interface SemDpProps {
  onSelectSem: (label: string, value: string) => void;
  selectedSem: string;
  courseid: number;
}

const SemDp: React.FC<SemDpProps> = ({ onSelectSem, selectedSem, courseid }) => {
  const [sectionCount, setSectionCount] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>(selectedSem);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = selectedValue === "0" ? "Choose Sem" : selectedValue;
    onSelectSem(selectedLabel, selectedValue);
  };

  useEffect(() => {
    const ceofetchCourseOptions = async () => {
      try {
        const token = localStorage.getItem('token') || undefined;
        const apiEndpointcr = `${DIGITAL_CAMPUS_BASE_URL}/tblcoursedtlview`;
        const fetchedDatacr = await fetchCardDetailstoken(apiEndpointcr, 'GET',null,token);
        const filteredStaffcr = fetchedDatacr.filter((college: any) => college.courseid === courseid);
        if (filteredStaffcr.length > 0) {
          const courseDuration = filteredStaffcr[0].coursesemduration;
          setSectionCount(courseDuration);
        }
      } catch (error) {
        console.error('Error fetching school options:', error);
      }
    };

    const fetchCourseDetails = async () => {
      try {
        const token = localStorage.getItem('token') || undefined;
        const username = localStorage.getItem('username');
        const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/allEmployeeDetails`;
        const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
        const filteredstaff = fetchedData.filter((college: any) => college.employeid === username);
        const eorgid = filteredstaff[0].orgid;

        const apiEndpointbr = `${DIGITAL_CAMPUS_BASE_URL}/tblbranchdtls`;
        const fetchedDatabr = await fetchCardDetailstoken(apiEndpointbr, 'GET',null,token);
        const filteredbr = fetchedDatabr.filter((college: any) => college.orgid === eorgid);
        const ecourseid = filteredbr[0].courseid;

        const apiEndpointcr = `${DIGITAL_CAMPUS_BASE_URL}/tblcoursedtlview`;
        const fetchedDatacr = await fetchCardDetailstoken(apiEndpointcr, 'GET',null,token);
        const filteredStaffcr = fetchedDatacr.filter((college: any) => college.courseid === ecourseid);

        if (filteredStaffcr.length > 0) {
          const courseDuration = filteredStaffcr[0].coursesemduration;
          setSectionCount(courseDuration);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    const usertype = localStorage.getItem('usertype');
    if (usertype === "ceo") {
      ceofetchCourseOptions();
    } else {
      fetchCourseDetails();
    }
  }, [courseid]);

  return (
    <FormControl fullWidth className="my-3">
      <InputLabel id="year-select-label">Choose Sem</InputLabel>
      <Select
        labelId="year-select-label"
        id="year-select"
        value={selectedOption}
        label="Choose Sem"
        onChange={handleSelectChange}
        sx={{ marginBottom: 1 }}
      >
        <MenuItem value="0">Choose Sem</MenuItem>
        {[...Array(sectionCount)].map((_, index) => (
          <MenuItem key={index + 1} value={(index + 1).toString()}>
            {index + 1}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SemDp;