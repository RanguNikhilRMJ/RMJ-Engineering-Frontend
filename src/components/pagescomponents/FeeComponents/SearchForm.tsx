// components/SearchForm.tsx
import React, { useState, ChangeEvent } from 'react';
import { TextField, Button, Grid } from '@mui/material';

interface SearchParams {
  studentrollno: string;
  Phoneno: string;
  Hallticket: string;
  name: string;
}

interface SearchFormProps {
  onSearch: (searchParams: SearchParams) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    studentrollno: '',
    Phoneno: '',
    Hallticket: '',
    name: '',
  });

  const handleChange = (field: keyof SearchParams) => (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, [field]: event.target.value });
  };

  const handleSearch = () => {
    onSearch(searchParams);
  };

  return (
    <Grid container spacing={2} marginBottom="20px">
      <Grid item xs={12} md={2}>
        <TextField
          label="Admission ID"
          fullWidth
          value={searchParams.studentrollno}
          onChange={handleChange('studentrollno')}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField
          label="Phone Number 1"
          fullWidth
          value={searchParams.Phoneno}
          onChange={handleChange('Phoneno')}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField
          label="Phone Number 2"
          fullWidth
          value={searchParams.Hallticket}
          onChange={handleChange('Hallticket')}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField
          label="Name"
          fullWidth
          value={searchParams.name}
          onChange={handleChange('name')}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchForm;