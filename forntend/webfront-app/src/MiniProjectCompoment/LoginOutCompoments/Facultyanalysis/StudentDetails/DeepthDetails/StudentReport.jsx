import React, { useState, useEffect } from "react";
import "./studentReport.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { CSVLink } from "react-csv";

const StudentReport = ({ date, option, count }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const navigate = useNavigate();
  const authContext = useAuth();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await authContext.getAllStudentsByDateOption({
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
    return rows.map(({ photoUrl, ...rest }) => rest);
  };

  const handleEditClick = () => {
    navigate("/edit");
  };

  return (
    <div className="feedback-container">
      <h2>Student Attendance Table</h2>
      {loading ? (
        <p>Loading...</p>
      ) : rows.length > 0 ? (
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
                onClick={() => handleSort("classN")}
                style={{ cursor: "pointer" }}
              >
                Class
                {sortConfig.key === "classN" &&
                  (sortConfig.direction === "ascending" ? " 🔼" : " 🔽")}
              </th>
              <th
                onClick={() => handleSort("status")}
                style={{ cursor: "pointer" }}
              >
                Status
                {sortConfig.key === "status" &&
                  (sortConfig.direction === "ascending" ? " 🔼" : " 🔽")}
              </th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.studentId}</td>
                <td>
                  <span
                    onClick={() => handleStudentIdClick(row.studentId)}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {row.name}
                  </span>
                </td>
                <td>{row.classN}</td>
                <td>
                  <div
                    className={
                      row.status === "Present"
                        ? "status-present"
                        : row.status === "Absent"
                        ? "status-absent"
                        : "status-unknown"
                    }
                  >
                    {row.status || "Unknown"}
                  </div>
                </td>
                <td>
                  <img
                    src={
                      row.photoUrl
                        ? `data:image/jpeg;base64,${row.photoUrl}`
                        : "/img/unfound.jpg"
                    }
                    alt={row.name}
                    className="img-fluid"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default StudentReport;
