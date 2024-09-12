import React, { useState, useEffect } from "react";
import axios from "axios";

function AttendanceCalendar() {
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleDateClick = (date, image) => {
    setSelectedDate(date);
    setSelectedImage(image);
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
        }}
      >
        {attendance.map((record, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              backgroundColor:
                record.status === "Present"
                  ? "#d4edda"
                  : record.status === "Absent"
                  ? "#f8d7da"
                  : "#d1ecf1",
              borderRadius: "5px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => handleDateClick(record.date, record.image)}
          >
            <div>{new Date(record.date).getDate()}</div>
            <div>{record.status}</div>
          </div>
        ))}
      </div>

      {selectedDate && (
        <div style={{ marginTop: "20px" }}>
          <h3>Details for {selectedDate}</h3>
          <img
            src={`data:image/jpeg;base64,${selectedImage}`}
            alt="Attendance"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
}

export default AttendanceCalendar;
