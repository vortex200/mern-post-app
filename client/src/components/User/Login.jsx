import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(process.env.API_URL + "/api/user/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("authToken", res.data.token);
          window.location.href = "/";
        } else {
          toast.warning("Error logging in... Unexpected status");
          console.log(res);
        }
      })
      .catch((err) => {
        toast.warning("Error logging in...");
        console.log(err);
      });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="success" href="/register">
          Register
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
}

export default Login;
