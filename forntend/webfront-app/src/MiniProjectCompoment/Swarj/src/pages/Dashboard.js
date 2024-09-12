import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Attendance</Card.Title>
              <Card.Text>150</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Students Enrolled</Card.Title>
              <Card.Text>30</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Pending Requests</Card.Title>
              <Card.Text>5</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>Recent Activities</Card.Header>
            <Card.Body>
              <Card.Text>
                {/* Add recent activities here */}
                - Student John Doe marked present on August 24, 2024.
                <br />
                - Student Jane Smith requested leave on August 23, 2024.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
