import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    attendanceCount: 0,
  });

  useEffect(() => {
    // Fetch user data (replace with your data source)
    const fetchUserData = async () => {
      try {
        // Example static data; replace with API call if needed
        const response = await fetch('/api/user'); // Adjust the API endpoint as needed
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle user profile update logic here (e.g., API call to update user data)
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log('User updated successfully:', data);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <Container fluid>
      <h2 className="mt-4">Profile</h2>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAttendanceCount">
              <Form.Label>Attendance Count</Form.Label>
              <Form.Control
                type="number"
                name="attendanceCount"
                value={user.attendanceCount}
                readOnly
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
