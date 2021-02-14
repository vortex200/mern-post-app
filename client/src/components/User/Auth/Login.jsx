import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import http from "Utils/http-common";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    http
      .post("/api/user/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("authToken", res.data.token);
          window.location.href = "/";
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Form onSubmit={handleSubmit} className="form-auth">
      <Form.Group
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        controlId="formEmail"
      >
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" />
      </Form.Group>

      <Form.Group
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        controlId="formPassword"
      >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" />
      </Form.Group>

      <div className="btn-area">
        <Button className="btn-submit" variant="outline-primary" type="submit">
          Log in
        </Button>
      </div>
    </Form>
  );
}

export default Login;
