import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';

interface SchoolOption {
  label: string;
  value: string;
}

interface college {
    orgid: number;
    brandname: string;
  }
  
interface SchoolDpComponentProps {
  onSelectOrg: (label: string, value: string) => void;
  selectedOrg: string;
}

const Collegedp: React.FC<SchoolDpComponentProps> = ({ onSelectOrg, selectedOrg }) => {
  const [schoolOptions, setSchoolOptions] = useState<SchoolOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>(selectedOrg);

  useEffect(() => {
    fetchSchoolOptions();
  }, []);

  const fetchSchoolOptions = async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
        const username = localStorage.getItem('username');
        const usertype = localStorage.getItem('usertype');
        if(usertype=="ceo"){
              const url = `${DIGITAL_CAMPUS_BASE_URL}/allOrganisationDetails`;
          const schoolData = await fetchCardDetailstoken(url, 'GET',null,token);
          const options: SchoolOption[] = schoolData.map((school: any) => ({
            label: school.brandname,
            value: school.orgid.toString(),
          }));
          setSchoolOptions(options);
        }else{
            const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/allEmployeeDetails`;
            const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
            const filteredstaff= fetchedData.filter((college: any) => college.employeid  === username);
            const eorgid = filteredstaff[0].orgid;
          const url = `${DIGITAL_CAMPUS_BASE_URL}/allOrganisationDetails`;
          const schoolData = await fetchCardDetailstoken(url, 'GET',null,token);
          const filteredSchoolData = schoolData.filter((school: college) => school.orgid  === eorgid);
          const options: SchoolOption[] = filteredSchoolData.map((school: any) => ({
            label: school.brandname,
            value: school.orgid.toString(),
          }));
          setSchoolOptions(options);
          setSelectedOption(eorgid.toString());
        }
       
    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  };
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedLabel = schoolOptions.find((school) => school.value === selectedValue.toString())?.label || '';
    onSelectOrg(selectedLabel, selectedValue.toString());
  };
  return (
    <FormControl fullWidth className='my-3'>
      <InputLabel id="demo-simple-select-label">Choose College</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedOption}
        label="Choose College"
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

export default Collegedp;