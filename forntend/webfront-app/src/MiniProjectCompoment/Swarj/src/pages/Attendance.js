import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';

const Attendance = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/students'); 
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Container fluid>
      <h2 className="mt-4">Attendance Records</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Attendance Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.attendanceStatus}</td>
                <td>{student.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No student records found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Attendance;
