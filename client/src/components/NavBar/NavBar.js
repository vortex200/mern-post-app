import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
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
                <Nav.Link href="/admin">Admin</Nav.Link>
                <Nav.Link href="/auth">Auth</Nav.Link>
                {state.isAuth ? (
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                ) : (
                  <Nav.Link href="/login">Login</Nav.Link>
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
