import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useAuth } from "../security/AuthContext";
import logo from "../media/logo.webp";
import "./Header.css"; // Import the CSS file for styling

function HeaderComponent() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isTokenValid();

  const handleLogout = () => {
    authContext.logout();
    window.location.href = "/login";
  };

  return (
    <div className="nav-holder">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="Attendance Management System"
            style={{ width: "100%", height: "40px", marginRight: "50px" }}
          />
          <h4>Student Attendance Management</h4>
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
                  <Nav.Link
                    as={Link}
                    to="/dashboard"
                    className="text-dark mx-auto"
                  >
                    Dashboard
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/attendance"
                    className="text-dark mx-auto"
                  >
                    Attendance
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/reports"
                    className="text-dark mx-auto"
                  >
                    Reports
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/profile"
                    className="text-dark mx-auto"
                  >
                    Profile
                  </Nav.Link>
                  <Button
                    variant="outline-danger"
                    onClick={handleLogout}
                    className="mx-auto"
                  >
                    Logout
                  </Button>
                </Nav>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {isAuthenticated && (
        <div className="dropdown">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
            alt="icon"
            width="50"
            height="50"
          />
          <div className="dropdown-content">
            <a href="#">{authContext.username}</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderComponent;
