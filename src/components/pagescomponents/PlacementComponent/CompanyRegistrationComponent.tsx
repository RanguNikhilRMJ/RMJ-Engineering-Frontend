import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Box,
  Button,
  Chip,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { fetchCardDetailstoken } from "@/modules/apitoken";
import { DIGITAL_CAMPUS_BASE_URL } from "@/modules/apiConfig";

const ItemType = "ROUND";

interface Round {
  id: string;
  name: string;
}

const CompanyRegistration = () => {
  const [companyName, setCompanyName] = useState("");
  const [packageType, setPackageType] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [placementType, setPlacementType] = useState("");
  const [backlogs, setBacklogs] = useState<string[]>(["0"]);;
  const [selectedCourses, setSelectedCourses] = useState<string[]>(["BTECH"]);
  const [selectedPersentage, setSelectedPersentage] = useState<string[]>(["Above 60%"]);
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [rounds, setRounds] = useState<Round[]>([
    { id: "1", name: "Written Test" },
    { id: "2", name: "Technical Round" },
    { id: "3", name: "HR Round" },
  ]);
  const [newRoundName, setNewRoundName] = useState("");
  const [selectedColleges, setSelectedColleges] = useState<any[]>([
    "GPCET",
    "RCEW",
  ]);
  const colleges = ["GPCET", "RCEW"];
  const [companyLogoUrl, setCompanyLogoUrl] = useState("");

  const moveRound = (dragIndex: number, hoverIndex: number) => {
    const updatedRounds = [...rounds];
    const [draggedItem] = updatedRounds.splice(dragIndex, 1);
    updatedRounds.splice(hoverIndex, 0, draggedItem);
    setRounds(updatedRounds);
  };

  const addRound = () => {
    if (newRoundName.trim()) {
      setRounds([
        ...rounds,
        { id: `${Date.now()}`, name: newRoundName.trim() },
      ]);
      setNewRoundName("");
    }
  };

  const removeRound = (id: string) => {
    setRounds(rounds.filter((round) => round.id !== id));
  };


  const handleSave = async () => {
    const formData = {
      name: companyName,
      packageType,
      jobRole,
      placementType,
      logoUrl: companyLogoUrl,
      backlogs: backlogs, 
      branch,
      course: selectedCourses, 
      year,
      orgId: selectedColleges.map(college => college === 'GPCET' ? 1 : 0), 
      rounds: rounds.map((round) => round.name), 
    };
  
    try {
      const apiEndpoint = "http://localhost:5000/api/companies/create"; // Update to match your backend
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error occurred");
      }
  
      const data = await response.json();
      console.log("Response:", data);
      alert(`Company Registered Successfully! Alerts created: ${data.alertsCreated}`);
    } catch (error:any) {
      console.error("Error:", error);
      alert(`Failed to register the company. Error: ${error.message}`);
    }
  };
  
  return (
    <DndProvider backend={HTML5Backend}>
      
<Box display="flex" justifyContent="center" alignItems="center" mb={2}>
    <Box flexGrow={1} >
        <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>Company Registration Form</Typography>
        <Typography variant="body1" paragraph>
          Add the company name, package, and rounds for the company, then click "Save" to register the new company.
        </Typography>
    </Box>
</Box>
      <Box
        sx={{
          maxWidth: "100%", 
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
       

        {/* Company Details */}
        <Box display="flex" gap="20px" mb={3}>
          <TextField
            label="Company Name"
            fullWidth
            
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <TextField
            label="Package (e.g., LPA)"
            fullWidth
            value={packageType}
            onChange={(e) => setPackageType(e.target.value)}
          />
        
          <TextField
            label="Job Role"
            fullWidth
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
          />
          <TextField
            select
            label="Placement Type"
            fullWidth
            value={placementType}
            onChange={(e) => setPlacementType(e.target.value)}
          >
            <MenuItem value="Internship">Internship</MenuItem>
            <MenuItem value="Job">Job</MenuItem>
          </TextField>
        </Box>

        <Box mb={3} display="flex" sx={{justifyContent:"space-evenly"}}>
          <Box  gap="10px" flexWrap="wrap" mt={1} sx={{display:"flex",alignItems:"center",flexDirection:"column", border: "1px dotted black", borderRadius: "8px", padding: "15px"}}>
          <Typography variant="overline" fontWeight="bold" fontSize="1.2rem">Backlogs</Typography>
            <div>
              {["0", "1", "2", "3", "4", "5", "6", "7"].map((item) => (
                <Chip
                  key={item}
                  label={item}
                  sx={{ marginLeft: "10px" }}
                  onClick={() => {
                    setBacklogs((prev) => {
                      if (prev.includes(item)) {
                        // Deselect logic if item already selected
                        return prev.filter((b) => b !== item);
                      } else {
                        // Select logic for item
                        const index = parseInt(item, 10);
                        return Array.from({ length: index + 1 }, (_, i) => i.toString());
                      }
                    });
                  }}
                  color={backlogs.includes(item) ? "success" : "default"}
                />
              ))}
            </div>
          </Box>
          <Box  gap="10px" flexWrap="wrap" mt={1} sx={{display:"flex",alignItems:"center",flexDirection:"column", border: "1px dotted black", borderRadius: "8px", padding: "15px"}}>
          <Typography variant="overline" fontWeight="bold" fontSize="1.2rem">Collage</Typography>
          <div>
          {colleges.map((college) => (
            <Chip
              key={college}
              label={college}
              sx={{marginLeft:"10px"}}

              onClick={() =>
                setSelectedColleges((prev) =>
                  prev.includes(college)
                    ? prev.filter((c) => c !== college) // Deselect
                    : [...prev, college] // Select
                )
              }
              color={selectedColleges.includes(college) ? "success" : "default"}
            />
          ))}
          </div>
        </Box>
        <Box  gap="10px" flexWrap="wrap" mt={1} sx={{display:"flex",alignItems:"center",flexDirection:"column", border: "1px dotted black", borderRadius: "8px", padding: "15px"}}>
        <Typography variant="overline" fontWeight="bold" fontSize="1.2rem">Courses</Typography>
          <div>
          {["BTECH", "MBA", "MTECH"].map((course) => (
            <Chip
              key={course}
              label={course}
              sx={{ marginLeft: "10px" }}
              onClick={() =>
                setSelectedCourses((prev) =>
                  prev.includes(course)
                    ? prev.filter((c) => c !== course) // Deselect
                    : [...prev, course] // Select
                )
              }
              color={selectedCourses.includes(course) ? "success" : "default"}
            />
          ))}
          </div>
        </Box>
        <Box  gap="10px" flexWrap="wrap" mt={1} sx={{display:"flex",alignItems:"center",flexDirection:"column", border: "1px dotted black", borderRadius: "8px", padding: "15px"}}>
        <Typography variant="overline" fontWeight="bold" fontSize="1.2rem">Percentage Ranges</Typography>
          <div>
            {["Above 60%", "Above 70%", "Above 80%", "Above 90%"].map((percentage) => (
              <Chip
                key={percentage}
                label={percentage}
                sx={{ marginLeft: "10px" }}
                onClick={() =>
                  setSelectedPersentage((prev) =>
                    prev.includes(percentage)
                      ? prev.filter((c) => c !== percentage)
                      : [...prev, percentage]
                  )
                }
                color={selectedPersentage.includes(percentage) ? "success" : "default"}
              />
            ))}
          </div>
          </Box>
        </Box>
       

        {/* Branch and Year */}
        <Box display="flex" gap="20px" mb={3}>
        
        <TextField
            select
            label="Branch"
            fullWidth
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <MenuItem value="">Select Branch</MenuItem>
            <MenuItem value="CSE">CSE</MenuItem>
            <MenuItem value="ECE">ECE</MenuItem>
            <MenuItem value="MECHANICAL">MECHANICAL</MenuItem>
            <MenuItem value="CIVIL">CIVIL</MenuItem>
          </TextField>

          <TextField
           label="Year"
           fullWidth
           select
           value={year}
           onChange={(e) => setYear(e.target.value)}
           >
           <MenuItem value="2024">2024</MenuItem>
           <MenuItem value="2023">2023</MenuItem>
           <MenuItem value="2022">2022</MenuItem>
           <MenuItem value="2021">2021</MenuItem>
          </TextField>
          <TextField
            label="Enter company logo URL" // Change label to reflect what you're asking
            fullWidth
            value={companyLogoUrl} // Update the state here according to your intended variable
            onChange={(e) => setCompanyLogoUrl(e.target.value)} // Update the setter function
            placeholder="Enter the URL of the company logo"
            />
        </Box>

        {/* Add New Round */}
        <Box display="flex" gap="10px" mb={3}>
          <TextField
            fullWidth
            label="Add new round"
            value={newRoundName}
            onChange={(e) => setNewRoundName(e.target.value)}
          />
          <Button variant="contained"  color="success" onClick={addRound}>
            Add
          </Button>
        </Box>

        {/* Rounds (Drag-and-Drop) */}
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            display:"flex",
            alignItems:"center",
            flexDirection:"column",
            mb: 3,
          }}
        >
          {rounds.map((round, index) => (
            <DraggableRound
              key={round.id}
              round={round}
              index={index}
              moveRound={moveRound}
              removeRound={removeRound}
            />
          ))}
        </Box>

        {/* Save Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </DndProvider>
  );
};

interface DraggableRoundProps {
  round: Round;
  index: number;
  moveRound: (dragIndex: number, hoverIndex: number) => void;
  removeRound: (id: string) => void;
}

const DraggableRound: React.FC<DraggableRoundProps> = ({
  round,
  index,
  moveRound,
  removeRound,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveRound(item.index, index);
        item.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <Box
      ref={ref}
      display="flex"
      justifyContent="space-between"
      padding="10px"
      border="1px solid #ddd"
      borderRadius="5px"
      marginBottom="5px"
      width="90%"
      bgcolor="#eaeaea"
    >
      <Typography variant="h5" fontWeight="bold">{round.name}</Typography>
      <Button
        variant="text"
        color="error"
        onClick={() => removeRound(round.id)}
        sx={{ fontSize: '24px', lineHeight: '1', padding: '8px' }}
      >
        &times;
      </Button>
    </Box>
  );
};

export default CompanyRegistration;
