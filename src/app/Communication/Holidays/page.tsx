"use client";
import React, { useEffect, useState } from 'react';
import {
  Button, TextField, Typography, Box, Card, CardContent, CardActions,
  IconButton, Grid, Divider
} from '@mui/material';
import { Edit, Add, CalendarToday } from '@mui/icons-material';
import Collegedp from '@/components/dropdown/Collegedp';
import axios from 'axios';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import Layout from '@/components/Sidemenu/Layout';
import PageTitle from "@/components/PageTitle";
interface Holiday {
  id: number;
  orgid: number;
  message: string;
  date: string;
}

const HolidayPage: React.FC = () => {
  const [orgidData, setOrgidData] = useState<string>('');
  const [holidayMessage, setHolidayMessage] = useState<string>('');
  const [holidayDate, setHolidayDate] = useState<string>('');
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [selectedHolidayId, setSelectedHolidayId] = useState<number | null>(null); // New state to track selected holiday for update

  const getToken = () => localStorage.getItem('token') || undefined;

  const fetchHolidays = async () => {
    try {
      const response = await axios.get(`${DIGITAL_CAMPUS_BASE_URL}/Holidayview`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setHolidays(response.data);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  useEffect(() => {
    const usertype = localStorage.getItem('usertype');
    if (usertype === "ceo") {
      fetchHolidays();
    } else {
      ceofetchCourseOptions();
    }
  }, []);

  const ceofetchCourseOptions = async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const username = localStorage.getItem('username');
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/allEmployeeDetails`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET', null, token);
      const filteredstaff = fetchedData.filter((college: any) => college.employeid === username);
      const eorgid = filteredstaff[0].orgid;
      setOrgidData(eorgid);

      const fetchedDataHolidays = await fetchCardDetailstoken(`${DIGITAL_CAMPUS_BASE_URL}/Holidayview`, 'GET', null, getToken());
      const filteredHolidays = fetchedDataHolidays.filter((holiday: Holiday) => holiday.orgid === Number(eorgid));
      setHolidays(filteredHolidays);

    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  };

  const handleOrgSelect = (label: string, value: string) => {
    setOrgidData(value);
  };

  const handleCreateOrUpdateHoliday = async () => {
    if (!orgidData || !holidayMessage || !holidayDate) {
      alert("Please fill all fields");
      return;
    }

    const apiUrl = selectedHolidayId
      ? `${DIGITAL_CAMPUS_BASE_URL}/Holidayupdate`
      : `${DIGITAL_CAMPUS_BASE_URL}/CreateHoliday`;
    const method = selectedHolidayId ? 'put' : 'post';

    try {
      await axios[method](apiUrl, {
        id: selectedHolidayId,
        orgid: Number(orgidData),
        message: holidayMessage,
        date: holidayDate,
      }, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      fetchHolidays();
      resetForm();
    } catch (error) {
      console.error(`Error ${selectedHolidayId ? 'updating' : 'creating'} holiday:`, error);
    }
  };

  const resetForm = () => {
    setHolidayMessage('');
    setHolidayDate('');
    setSelectedHolidayId(null); // Reset selected holiday ID after update
  };

  const handleEditClick = (holiday: Holiday) => {
    setSelectedHolidayId(holiday.id);
    setHolidayMessage(holiday.message);
    setHolidayDate(holiday.date);
    setOrgidData(String(holiday.orgid));
  };

  return (
    <Layout>
        <PageTitle title='Holidays'/>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 2, textAlign: 'center', color: 'primary.main' }}>
          Holiday Management
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 4 }}>
          <Collegedp onSelectOrg={handleOrgSelect} selectedOrg={orgidData} />
          <TextField
            label="Holiday Message"
            value={holidayMessage}
            onChange={(e) => setHolidayMessage(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ maxWidth: 250 }}
          />
          <TextField
            label="Holiday Date"
            type="date"
            value={holidayDate}
            onChange={(e) => setHolidayDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ maxWidth: 180 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateOrUpdateHoliday}
            sx={{ mt: 2, minWidth: 160, display: 'flex', alignItems: 'center', gap: 1 }}
          >
            {selectedHolidayId ? <Edit /> : <Add />}
            {selectedHolidayId ? 'Update Holiday' : 'Create Holiday'}
          </Button>
          {selectedHolidayId && (
            <Button
              onClick={resetForm}
              color="secondary"
              variant="outlined"
              sx={{ mt: 2, minWidth: 160 }}
            >
              Cancel Update
            </Button>
          )}
        </Box>

        <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, textAlign: 'center', color: 'secondary.main' }}>
          Holiday List
        </Typography>
        <Grid container spacing={2}>
          {holidays.map((holiday) => (
            <Grid item xs={12} sm={6} md={4} key={holiday.id}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday fontSize="small" /> {holiday.message}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {new Date(holiday.date).toLocaleDateString()}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Org ID: {holiday.orgid}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleEditClick(holiday)}
                    startIcon={<Edit />}
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default HolidayPage;
