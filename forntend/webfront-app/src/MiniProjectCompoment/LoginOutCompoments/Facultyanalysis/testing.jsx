import React, { useEffect, useState } from "react";
import axios from "axios";

function AttendancePage() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/attendance"
        );
        setAttendance(response.data);
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div>
      <h2>Attendance</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gap: "10px",
        }}
      >
        {attendance.map((record, index) => (
          <div
            key={index}
            style={{
              width: "40px",
              height: "40px",
              backgroundColor:
                record.status === "Present"
                  ? "green"
                  : record.status === "Absent"
                  ? "red"
                  : "yellow",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
            title={`Date: ${record.date}\nStatus: ${record.status}`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AttendancePage;
