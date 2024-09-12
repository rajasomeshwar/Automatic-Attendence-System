import React, { useState, useEffect } from "react";
import "./studentReport.css"; // Import your CSS file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

const StudentReport = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const authContext = useAuth();
  const [nextIndex, setNextIndex] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await authContext.getAllStudents();

        console.log("Fetched data:", data); // Log the data to check its structure

        // Validate if data is an array
        if (!Array.isArray(data)) {
          toast.error("Unexpected data format from the server.");
          console.error("Unexpected data format:", data);
          return;
        }

        if (data.length === 0) {
          toast.info("No students found.");
          return;
        }

        setRows(data);
      } catch (error) {
        console.error("Failed to fetch student data:", error);
        toast.error("Failed to fetch student data.");
      }
    };

    getData();
  }, [nextIndex, authContext, navigate]);

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      studentId: "",
      name: "",
      classN: "", // Ensure the field name is correct
      status: "",
      photoUrl: "",
    };
    setRows([...rows, newRow]);
  };

  const handleRemoveLastRow = () => {
    if (rows.length === 1) {
      toast.info("This is the last row. Remove action is canceled.");
    } else {
      const updatedRows = [...rows.slice(0, -1)];
      setRows(updatedRows);
    }
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [name]: value } : row
    );
    setRows(updatedRows);
  };

  const handleSubmit = () => {
    console.log("Submitted data:", rows);
  };

  return (
    <div className="feedback-container">
      <h2>Student Attendance Table</h2>
      <table className="feedback-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Status</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  type="text"
                  name="studentID"
                  value={row.studentId}
                  onChange={(e) => handleInputChange(e, row.id)}
                  placeholder="Student ID"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={row.name}
                  onChange={(e) => handleInputChange(e, row.id)}
                  placeholder="Name"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="classN" // Updated field name
                  value={row.classN} // Updated field name
                  onChange={(e) => handleInputChange(e, row.id)}
                  placeholder="Class"
                />
              </td>
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
      {/* Uncomment and modify if needed */}
      {/* <div className="actions-container">
        <button className="feedback-table-button" onClick={handleAddRow}>
          Add Row
        </button>
        <button className="feedback-table-button" onClick={handleRemoveLastRow}>
          Remove Row
        </button>
        <button className="feedback-table-button" onClick={handleSubmit}>
          Submit
        </button>
      </div> */}
      {/* <form onSubmit={handleSubmit}>
        <div className="extra-academics-container">
          <h3 className="extra-academics-heading">
            Do you wish to submit any other achievement or contribution?
          </h3>
          <textarea
            className="extra-academics-textarea"
            name="extra-academics"
            placeholder="Enter"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          ></textarea>
        </div>
        <button
          type="submit"
          style={{ marginTop: "50px" }}
          className="Action-btns"
        >
          Submit
        </button>
      </form> */}
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
