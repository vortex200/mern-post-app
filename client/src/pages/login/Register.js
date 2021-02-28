import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import http from "Utils/http-common";

const initialState = {
  email: "",
  password: "",
  repeatPassword: "",
};

function Register() {
  const [data, setData] = useState(initialState);

  const { email, password, repeatPassword } = data;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (password === repeatPassword) {
        const res = await http.post("/api/user/register", {
          email,
          password,
        });

        if (res.status === 200) {
          window.location.reload(false);
        } else {
          console.log(res);
        }
      } else {
        alert("Passwords must match.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Form onSubmit={handleSubmit} className="form-auth">
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          name="email"
          onChange={handleChangeInput}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="password"
          onChange={handleChangeInput}
        />
      </Form.Group>

      <Form.Group controlId="formRepeatPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={repeatPassword}
          name="repeatPassword"
          onChange={handleChangeInput}
        />
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
