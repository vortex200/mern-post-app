import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import { AuthContext } from "Contexts/AuthContext";

function NavBar() {
  const { state, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(() => (window.location.href = "/"));
  };

  if (state.isLoading) {
    return <div></div>;
  } else {
    return (
      <div className="navbar-area">
        <Container>
          <Navbar expand="lg">
            <Navbar.Brand href="/">Postapp</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                {state.isAuth ? (
                  <DropdownButton variant="success" title="My Account">
                    <Dropdown.Item href="/user/my-posts">
                      My posts
                    </Dropdown.Item>
                    <Dropdown.Item href="/auth">Profile</Dropdown.Item>
                    <Dropdown.Item href="/admin">Admin</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </DropdownButton>
                ) : (
                  <>
                    <Button variant="outline-primary" href="/login">
                      Login
                    </Button>
                  </>
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
