"use client";
import axios from "axios";
import { useState, useEffect } from "react";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); // Optional: To handle loading state
  const [error, setError] = useState(null); // Optional: To handle errors

  // Function to fetch data with Authorization
  const fetchData = async () => {
    try {
      const response = await axios.get("https://rmjit.faceify.app/api/method/frappe.desk.query_report.run?report_name=fhms%20student%20hostel%20attendance", {
        headers: {
          Authorization: `token 26747d5c7cf8d16:6ca0768ea66cd61`, // Replace with your token
        },
      });

      setStudents(response.data.message.result); // Access the 'result' array from the API response
      setLoading(false); // Stop loading when data is fetched
    } catch (error) {
      setError(error); // Set error if any
      setLoading(false); // Stop loading in case of error
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>Error: {error.message}</div>; // Display error state

  return (
    <div>
      <h1>Students List</h1>
      <ul>
        {students.map((student) => (
          <li key={student.custom_roll_number}>
            {student.student_name} - {student.custom_student_group}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsList;
