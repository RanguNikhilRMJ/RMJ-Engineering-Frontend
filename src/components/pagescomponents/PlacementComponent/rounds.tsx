"use client";
import React, { useState } from "react";
import { Box, Avatar, Button, Typography } from "@mui/material";
import Layout from "@/components/Sidemenu/Layout";

function AppliedStudentsList() {
  // Initial data array
  const initialData = [
    {
      _id: "1",
      logoUrl: "https://via.placeholder.com/50",
      name: "Company A",
      packageType: "Type A",
      placementType: "Online",
      rounds: [{ name: "Round 1", status: "pending" }, { name: "Round 2", status: "" }],
      studentName: "John Doe",
      branch: "CSE",
      rollNumber: "123456",
      year: "3rd Year"
    },
    {
      _id: "2",
      logoUrl: "https://via.placeholder.com/50",
      name: "Company B",
      packageType: "Type B",
      placementType: "Offline",
      rounds: [{ name: "Round 1", status: "pending" }, { name: "Round 2", status: "" }],
      studentName: "Jane Smith",
        branch: "ECE",
        rollNumber: "654321",
        year: "2nd Year"
    },
    {
      _id: "3",
      logoUrl: "https://via.placeholder.com/50",
      name: "Company C",
      packageType: "Type C",
      placementType: "Hybrid",
      rounds: [{ name: "Round 1", status: "pending" }, { name: "Round 2", status: "" }],
      studentName: "Alex Johnson",
      branch: "MECH",
      rollNumber: "789123",
      year: "4th Year"
    },
  ];

  const [dataList, setDataList] = useState(initialData);

  const handleStatusChange = (id, status, roundIndex) => {
    setDataList((prevList) =>
      prevList.map((item) => {
        if (item._id === id) {
          const updatedRounds = [...item.rounds];

      
          if (status === "Selected") {
            if (roundIndex === 0) {
              updatedRounds[roundIndex].status = "Selected";
              if (updatedRounds.length > 1) {
                updatedRounds[roundIndex + 1].status = "pending"; // Set the second round status to pending
              }
            } else {
              updatedRounds[roundIndex].status = "completed";
            }
          } else if (status === "Rejected") {
            if (roundIndex === 0) {
              updatedRounds[roundIndex].status = "Rejected";
              if (updatedRounds.length > 1) {
                updatedRounds[roundIndex + 1].status = "pending"; // Set the second round status to pending
              }
            } else {
              updatedRounds[roundIndex].status = "completed";
            }
          }  else if (status === "Absent")  {
            if (roundIndex === 0) {
              updatedRounds[roundIndex].status = "Absent";
              if (updatedRounds.length > 1) {
                updatedRounds[roundIndex + 1].status = "pending"; // Set the second round status to pending
              }
            } else {
              updatedRounds[roundIndex].status = "completed";
            }
          }

          return { ...item, rounds: updatedRounds };
        }
        return item;
      })
    );
  };

  return (
    <>
    <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>All Applied Students</Typography>
            <Typography variant="body1" paragraph>
              List of applied students.
            </Typography>
      <Box
        component="table"
        sx={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          "& th, & td": {
            border: "1px solid #ddd",
            padding: "10px",
            textAlign: "left",
          },
          "& th": {
            backgroundColor: "#f4f4f4",
            fontWeight: "bold",
          },
          "& tr:nth-of-type(even)": {
            backgroundColor: "#f9f9f9",
          },
          "& tr:hover": {
            backgroundColor: "#eaf2f8",
          },
        }}
      >
        <Box component="thead">
          <Box component="tr">
            <Box component="th">Company Logo</Box>
            <Box component="th">studentName</Box>
            <Box component="th">branch</Box>
            <Box component="th">rollNumber</Box>
            <Box component="th">year</Box>
            <Box component="th">Company Name</Box>
            <Box component="th">Package</Box>
            <Box component="th">Registration Type</Box>
            <Box component="th">Rounds</Box>
          </Box>
        </Box>
        <Box component="tbody">
          {dataList.map((item) => (
            <Box component="tr" key={item._id}>
              <Box component="td">
                <Avatar src={item.logoUrl} alt={item.name} />
              </Box>
              <Box component="td">{item.studentName}</Box>
              <Box component="td">{item.branch}</Box>
              <Box component="td">{item.rollNumber}</Box>
              <Box component="td">{item.year}</Box>
              <Box component="td">{item.name}</Box>
              <Box component="td">{item.packageType}</Box>
              <Box component="td">{item.placementType}</Box>
              <Box component="td">
                {item.rounds.map((round, index) => (
                  <Box key={index} display="flex" alignItems="center" gap={1} mb={1}>
                    <Typography variant="body2">
                      {round.name}: {round.status}
                    </Typography>
                    {round.status === "pending" && (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          color="success"
                          onClick={() => handleStatusChange(item._id, "Selected", index)}
                        >
                          Select
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => handleStatusChange(item._id, "Rejected", index)}
                        >
                          Rejected
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="warning"
                          onClick={() => handleStatusChange(item._id, "Absent", index)}
                        >
                          Absent
                        </Button>
                      </>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      </>
  );
}

export default AppliedStudentsList;
