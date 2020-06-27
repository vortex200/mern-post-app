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
    console.log(email, password);
    axios
      .post(process.env.REACT_APP_API_URL + "/api/users/register", {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Account succesfully registered!");
          window.location.reload(false);
        } else {
          toast.warning("Error registering account... Unexpected status");
          console.log(res);
        }
      })
      .catch((err) => {
        toast.warning("Error registering account...");
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
          Register
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
}

export default Login;
