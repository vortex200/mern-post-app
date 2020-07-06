import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./index.css";
import { AuthContext } from "../../contexts/AuthContext";

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
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/items">Items</Nav.Link>
                {state.isAuth ? (
                  <DropdownButton variant="success" title="My Account">
                    <Dropdown.Item href="/auth">Profile</Dropdown.Item>
                    <Dropdown.Item href="/admin">Admin</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </DropdownButton>
                ) : (
                  <Button variant="primary" href="/login">
                    Login
                  </Button>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </div>
    );
  }
}

export default NavBar;
