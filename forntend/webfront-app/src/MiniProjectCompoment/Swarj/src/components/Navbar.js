import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import logo from '../assets/logo.webp'; 

const NavigationBar = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link}  className="d-flex align-items-center">
        <img
          src={logo}
          alt="Attendance Management System"
          style={{ width: '100%', height: '40px', marginRight: '50px' }} 
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto d-flex justify-content-between w-100">
          {!isAuthenticated && (
            <Nav.Link as={Link} to="/login" className="mx-auto">
              Login
            </Nav.Link>
          )}
          {isAuthenticated && (
            <>
              <Nav className="d-flex justify-content-between w-100">
                <Nav.Link as={Link} to="/dashboard" className="text-dark mx-auto">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/attendance" className="text-dark mx-auto">
                  Attendance
                </Nav.Link>
                <Nav.Link as={Link} to="/reports" className="text-dark mx-auto">
                  Reports
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="text-dark mx-auto">
                  Profile
                </Nav.Link>
                <Button variant="outline-danger" onClick={handleLogout} className="mx-auto">
                  Logout
                </Button>
              </Nav>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
