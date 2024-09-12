import React, { useState, useEffect } from "react";
import "./studentReport.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../security/AuthContext";
import { CSVLink } from "react-csv";

// Helper function to calculate total stay time
const calculateTotalStayTime = (entryTimes, exitTimes) => {
  if (
    !entryTimes ||
    !exitTimes ||
    entryTimes.length === 0 ||
    exitTimes.length === 0
  ) {
    return [];
  }

  let totalStayTimes = [];
  for (let i = 0; i < Math.min(entryTimes.length, exitTimes.length); i++) {
    const entryTime = new Date(entryTimes[i]);
    const exitTime = new Date(exitTimes[i]);

    if (entryTime && exitTime) {
      const duration = exitTime - entryTime; // duration in milliseconds
      const hours = Math.floor(duration / (1000 * 60 * 60));
      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((duration % (1000 * 60)) / 1000);
      totalStayTimes.push(`${hours}h ${minutes}m ${seconds}s`);
    }
  }
  return totalStayTimes;
};

const StudentReportDetailDeepth = ({ date, option, count }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [selectedEntryTimes, setSelectedEntryTimes] = useState([]);
  const [selectedExitTimes, setSelectedExitTimes] = useState([]);
  const [selectedTotalStayTimes, setSelectedTotalStayTimes] = useState([]);
  const navigate = useNavigate();
  const authContext = useAuth();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await authContext.getAllStudentsByDateOptionDepth({
          date,
          option,
        });

        console.log("Fetched data:", data);

        if (!Array.isArray(data)) {
          toast.error("Unexpected data format from the server.");
          console.error("Unexpected data format:", data);
          return;
        }

        if (data.length === 0) {
          toast.info("No students found.");
        }

        setRows(data);
      } catch (error) {
        console.error("Failed to fetch student data:", error);
        toast.error("Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [count]);

  const handleStudentIdClick = (studentId) => {
    navigate(`/student/${studentId}/details`);
  };

  const handleSort = (field) => {
    let direction = "ascending";
    if (sortConfig.key === field && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    const sortedRows = [...rows].sort((a, b) => {
      if (typeof a[field] === "string") {
        return direction === "ascending"
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
      } else {
        return direction === "ascending"
          ? a[field] - b[field]
          : b[field] - a[field];
      }
    });
    setRows(sortedRows);
    setSortConfig({ key: field, direction });
  };

  const generateCSVData = () => {
    return rows.map(({ photoUrl, status, ...rest }) => rest);
  };

  const handleEditClick = () => {
    navigate("/edit");
  };

  const handleEntryCountClick = (entryTimes) => {
    setSelectedEntryTimes(entryTimes || []);
  };

  const handleExitCountClick = (exitTimes) => {
    setSelectedExitTimes(exitTimes || []);
    setSelectedTotalStayTimes(
      calculateTotalStayTime(selectedEntryTimes, exitTimes || [])
    );
  };

  const handleTotalStayClick = (totalStayTimes) => {
    setSelectedTotalStayTimes(totalStayTimes || []);
  };

  return (
    <div className="feedback-container">
      <h2>Student Attendance Table</h2>
      {loading ? (
        <p>Loading...</p>
      ) : rows.length > 0 ? (
        <>
          <table className="feedback-table">
            <thead>
              <tr>
                <th
                  onClick={() => handleSort("studentId")}
                  style={{ cursor: "pointer" }}
                >
                  Student ID
                  {sortConfig.key === "studentId" &&
                    (sortConfig.direction === "ascending" ? " 🔼" : " 🔽")}
                </th>
                <th
                  onClick={() => handleSort("name")}
                  style={{ cursor: "pointer" }}
                >
                  Name
                  {sortConfig.key === "name" &&
                    (sortConfig.direction === "ascending" ? " 🔼" : " 🔽")}
                </th>
                <th
                  onClick={() => handleSort("entryCount")}
                  style={{ cursor: "pointer" }}
                >
                  No. of Entries
                  {sortConfig.key === "entryCount" &&
                    (sortConfig.direction === "ascending" ? " 🔼" : " 🔽")}
                </th>
                <th
                  onClick={() => handleSort("exitCount")}
                  style={{ cursor: "pointer" }}
                >
                  No. of Exits
                  {sortConfig.key === "exitCount" &&
                    (sortConfig.direction === "ascending" ? " 🔼" : " 🔽")}
                </th>
                <th
                  onClick={() => handleSort("totalStayTime")}
                  style={{ cursor: "pointer" }}
                >
                  Total Stay Time
                  {sortConfig.key === "totalStayTime" &&
                    (sortConfig.direction === "ascending" ? " 🔼" : " 🔽")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.studentId}>
                  <td>{row.studentId}</td>
                  <td>
                    <span
                      onClick={() => handleStudentIdClick(row.studentId)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      {row.name}
                    </span>
                  </td>
                  <td>
                    <span
                      onClick={() => handleEntryCountClick(row.entryCount)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      {row.entryCount ? row.entryCount.length : "No data"}
                    </span>
                  </td>
                  <td>
                    <span
                      onClick={() => handleExitCountClick(row.exitCount)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      {row.exitCount ? row.exitCount.length : "No data"}
                    </span>
                  </td>
                  <td>
                    <span
                      onClick={() => handleTotalStayClick(row.totalStayTime)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      {row.totalStayTime ? row.totalStayTime.length : "No data"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedEntryTimes.length > 0 && (
            <div className="entry-times-details">
              <h3>Entry Times</h3>
              <ul>
                {selectedEntryTimes.map((time, index) => (
                  <li key={index}>{time}</li>
                ))}
              </ul>
            </div>
          )}

          {selectedExitTimes.length > 0 && (
            <div className="exit-times-details">
              <h3>Exit Times</h3>
              <ul>
                {selectedExitTimes.map((time, index) => (
                  <li key={index}>{time}</li>
                ))}
              </ul>
            </div>
          )}

          {selectedTotalStayTimes.length > 0 && (
            <div className="total-stay-details">
              <h3>Total Stay Times</h3>
              <ul>
                {selectedTotalStayTimes.length > 0 ? (
                  selectedTotalStayTimes.map((time, index) => (
                    <li key={index}>{time}</li>
                  ))
                ) : (
                  <li>No data available</li>
                )}
              </ul>
            </div>
          )}
        </>
      ) : (
        <p>No data available to display.</p>
      )}
      <div className="actions-container">
        <CSVLink
          data={generateCSVData()}
          filename={"student-report.csv"}
          className="feedback-table-button"
          target="_blank"
        >
          Download Report
        </CSVLink>
        <button
          onClick={handleEditClick}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Edit
        </button>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default StudentReportDetailDeepth;
