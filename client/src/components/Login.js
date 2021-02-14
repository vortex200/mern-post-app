import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import http from "Utils/http-common";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [data, setData] = useState(initialState);

  const { email, password } = data;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await http.post("/api/user/login", {
        email,
        password,
      });

      if (res.status === 200) {
        localStorage.setItem("authToken", res.data.token);
        window.location.href = "/";
      } else {
        console.log(res);
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

      <div className="btn-area">
        <Button className="btn-submit" variant="outline-primary" type="submit">
          Log in
        </Button>
      </div>
    </Form>
  );
}

export default Login;
