import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "Styles/Login.scss";
import Login from "Components/Login";
import Register from "Components/Register";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container>
      <div className="formArea">
        <Nav
          className="justify-content-center"
          variant="tabs"
          defaultActiveKey="sign-in"
        >
          <Nav.Item>
            <Nav.Link eventKey="sign-in" onClick={() => setIsLogin(true)}>
              Sign in
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="sign-up" onClick={() => setIsLogin(false)}>
              Sign up
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {isLogin ? <Login /> : <Register />}
      </div>
    </Container>
  );
}

export default Auth;
