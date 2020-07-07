import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./NavBar.css";
import { AuthContext } from "Contexts/AuthContext";

function NavBar() {
  const { state, logout } = useContext(AuthContext);

  function handleLogout() {
    logout();
    window.location.href = "/";
  }

  if (state.isLoading) {
    return <div></div>;
  } else {
    return (
      <div className="navbar-area">
        <Container>
          <Navbar expand="lg">
            <Navbar.Brand href="/">eShop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <DropdownButton variant="success" title="My Account">
                  {state.isAuth ? (
                    <>
                      <Dropdown.Item href="/auth">Profile</Dropdown.Item>
                      <Dropdown.Item href="/admin">Admin</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item href="/login">Login</Dropdown.Item>
                      <Dropdown.Item href="/register">Register</Dropdown.Item>
                    </>
                  )}
                </DropdownButton>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </div>
    );
  }
}

export default NavBar;
