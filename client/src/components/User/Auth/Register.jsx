import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import http from "Utils/http-common";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (password === repeatPassword) {
      http
        .post("/api/user/register", {
          email,
          password,
        })
        .then((res) => {
          if (res.status === 200) {
            window.location.reload(false);
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Passwords must match.");
    }
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

      <Form.Group
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        controlId="formRepeatPassword"
      >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" />
      </Form.Group>

      <div className="btn-area">
        <Button className="btn-submit" variant="outline-primary" type="submit">
          Register
        </Button>
      </div>
    </Form>
  );
}

export default Register;
