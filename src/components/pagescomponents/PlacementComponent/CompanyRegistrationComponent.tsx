import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";


const ItemType = "ROUND";

interface Round {
  id: string;
  name: string;
}

const CompanyRegistration = () => {
  const [companyName, setCompanyName] = useState("");
  const [packageType, setPackageType] = useState("");
  const [rounds, setRounds] = useState<Round[]>([
    { id: "1", name: "Written Test" },
    { id: "2", name: "Technical Round" },
    { id: "3", name: "HR Round" },
  ]);
  const [newRoundName, setNewRoundName] = useState("");

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
      companyName,
      packageType,
      rounds: rounds.map((round) => ({
        roundType: round.name,
        status: "Pending", // Default status for rounds
      })),
    };
  
    try {
      const response = await axios.post(
        "DIGITAL_CAMPUS_BASE_URL/createCompanyExamreg", // Replace with your backend API endpoint
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
  
      // Success handling
      console.log("Response:", response.data);
      alert("Company Registered Successfully!");
    } catch (error) {
      // Error handling
      console.error("Error:", error);
      alert("Failed to register the company. Please try again.");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Company Registration</h1>
        {/* Company Details */}
        <div style={formGroupStyle}>
          <div>
            <label style={labelStyle}>Company Name:</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Package Type:</label>
            <input
              type="text"
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
              placeholder="Enter package (e.g., LPA)"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Add New Round */}
        <div style={addRoundContainerStyle}>
          <input
            type="text"
            value={newRoundName}
            onChange={(e) => setNewRoundName(e.target.value)}
            placeholder="Add new round"
            style={inputStyle}
          />
          <button style={addButtonStyle} onClick={addRound}>
            Add
          </button>
        </div>

        {/* Rounds (Drag-and-Drop) */}
        <div style={roundsContainerStyle}>
          {rounds.map((round, index) => (
            <DraggableRound
              key={round.id}
              round={round}
              index={index}
              moveRound={moveRound}
              removeRound={removeRound}
            />
          ))}
        </div>

        {/* Save Button */}
        <button style={saveButtonStyle} onClick={handleSave}>
          Save
        </button>
      </div>
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
    <div ref={ref} style={roundStyle}>
      <span>{round.name}</span>
      <button onClick={() => removeRound(round.id)} style={removeButtonStyle}>
        &times;
      </button>
    </div>
  );
};

// Styles
const containerStyle: React.CSSProperties = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const titleStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "20px",
};

const formGroupStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  marginBottom: "20px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold",
};

const inputStyle: React.CSSProperties = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  width: "100%",
};

const addRoundContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const addButtonStyle: React.CSSProperties = {
  backgroundColor: "#4caf50",
  color: "#fff",
  border: "none",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
};

const roundsContainerStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "10px",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const roundStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  marginBottom: "5px",
  backgroundColor: "#fefefe",
};

const removeButtonStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  color: "#ff4d4f",
  border: "none",
  cursor: "pointer",
  fontSize: "18px",
};

const saveButtonStyle: React.CSSProperties = {
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  padding: "10px",
  borderRadius: "5px",
  width: "100%",
  cursor: "pointer",
  marginTop: "20px",
};

export default CompanyRegistration;
