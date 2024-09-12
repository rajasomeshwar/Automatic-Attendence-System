import React, { useState, useEffect } from "react";
import axios from "axios";
import "./attendanceList.css";

const AttendanceList = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch attendance data from the backend API
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get("/api/attendance"); // Replace with your API endpoint
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Failed to fetch attendance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  };

  return (
    <div className="attendance-container">
      <h2>Student Attendance</h2>
      {loading ? (
        <p>Loading...</p>
      ) : attendanceData.length > 0 ? (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Entry Times</th>
              <th>Exit Times</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((student) => (
              <tr key={student.studentId}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>
                  {student.entryTimes.length > 0
                    ? student.entryTimes.map((time, index) => (
                        <div key={index}>{formatTime(time)}</div>
                      ))
                    : "No entries"}
                </td>
                <td>
                  {student.exitTimes.length > 0
                    ? student.exitTimes.map((time, index) => (
                        <div key={index}>{formatTime(time)}</div>
                      ))
                    : "No exits"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No attendance data available.</p>
      )}
    </div>
  );
};

export default AttendanceList;
