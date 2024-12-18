import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
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
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/api/placement/createCompanyExamregId`;
      const token = "your-auth-token"; // Replace with your token logic if applicable
      const registeredData = await fetchCardDetailstoken(apiEndpoint, 'POST', formData, token);
  
      // Success handling
      console.log("Response:", registeredData);
      alert("Company Registered Successfully!");
    } catch (error) {
      // Error handling
      console.error("Error:", error);
      alert("Failed to register the company. Please try again.");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Company Details */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Company Name:
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                width: "100%",
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Package Type:
            </label>
            <input
              type="text"
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
              placeholder="Enter package (e.g., LPA)"
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                width: "100%",
              }}
            />
          </div>
          
        </div>

        {/* Add New Round */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            value={newRoundName}
            onChange={(e) => setNewRoundName(e.target.value)}
            placeholder="Add new round"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "100%",
            }}
          />
          <button
            style={{
              backgroundColor: "#4caf50",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={addRound}
          >
            Add
          </button>
        </div>

        {/* Rounds (Drag-and-Drop) */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
        </div>

        {/* Save Button */}
        <button
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            width: "100%",
            cursor: "pointer",
            marginTop: "20px",
          }}
          onClick={handleSave}
        >
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
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        marginBottom: "5px",
        backgroundColor: "#fefefe",
      }}
    >
      <span>{round.name}</span>
      <button
        onClick={() => removeRound(round.id)}
        style={{
          backgroundColor: "transparent",
          color: "#ff4d4f",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        &times;
      </button>
    </div>
  );
};

export default CompanyRegistration;
