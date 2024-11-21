"use client";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import Layout from '@/components/Sidemenu/Layout';
import { fetchCardDetailstoken } from "@/modules/apitoken";
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
// Define the data type for the fetched data
interface DigitalCampusAbsentData {
  issue_id: string;
  roomid: string;
  orgid: string;
  issuetype: string;
  description: string;
  reporteddate: string;
  status: string;
  resolveddate: string;
}

function Page() {
  const [digitalCampusAbsentData, setDigitalCampusAbsentData] = useState<DigitalCampusAbsentData[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  // Define the columns for the DataGrid
  const columns: GridColDef[] = [
    { field: 'issueId', headerName: 'Issue ID', width: 100 },
    { field: 'roomid', headerName: 'Room ID', width: 100 },
    { field: 'orgid', headerName: 'Organization ID', width: 150 },
    { field: 'issueType', headerName: 'Issue Type', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'reportedDate', headerName: 'Reported Date', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'resolvedDate', headerName: 'Resolved Date', width: 150 },
  ];

  // Fetch data from API
  const fetchDigitalCampusAbsentData = async () => {
    try {
      const token = localStorage.getItem("token") || undefined;
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/infraIssuesview`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, "GET", null, token);

      // Check if fetchedData is an array, then set it
      if (Array.isArray(fetchedData)) {
        setDigitalCampusAbsentData(fetchedData);
      } else {
        console.error("Data is not an array");
        setDigitalCampusAbsentData([]); // Set empty array if the data format is incorrect
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDigitalCampusAbsentData([]); // Set empty array if there's an error
    }
  };

  // Use useEffect to fetch data on component mount
  useEffect(() => {
    fetchDigitalCampusAbsentData();
  }, []);

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>Infrastructure Issues</Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={digitalCampusAbsentData.map((item, index) => ({ id: index, ...item }))}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20]}  // Updated prop name for page size options
            sx={{
              backgroundColor: "#f9f9f9",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "black",
                color: "blue",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-columnSeparator": {
                display: "none",
              },
            }}
          />
        </div>
      </Container>
    </Layout>
  );
}

export default Page;