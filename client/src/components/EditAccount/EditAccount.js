import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function EditAccount() {
  const [value, setvalue] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const accountId = window.location.pathname.replace("/admin/edit/", "");

  useEffect(() => {
    console.log(window.location.pathname.replace("/admin/edit/", ""));
    axios
      .get(process.env.REACT_APP_API_URL + "/api/account/" + accountId)
      .then((res) => {
        if (res.status === 200) {
          const oldvalue = res.data.result.value;
          const oldDescription = res.data.result.description;
          const oldPrice = res.data.result.price;
          setvalue(oldvalue);
          setDescription(oldDescription);
          setPrice(oldPrice);
        } else {
          console.log(res);
          toast.warning("Error getting account data... Unexpected status");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.warning("Error getting account data...");
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("value", value);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(
        process.env.REACT_APP_API_URL + "/api/account/" + accountId,
        formData,
        config
      )
      .then((res) => {
        if (res.status === 200) {
          window.location.pathname = "/admin";
        } else {
          console.log(res);
          toast.warning("Error updating account... Unexpected status");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.warning("Error updating account...");
      });
  }

  function handleChange(e) {
    switch (e.target.name) {
      case "value":
        setvalue(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "image":
        setImage(e.target.files[0]);
        break;
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formvalue">
              <Form.Label>Profile ID</Form.Label>
              <Form.Control
                type="text"
                name="value"
                value={value}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={price}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </Form.Group>

        <input type="file" name="image" onChange={handleChange} />

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <ToastContainer />
      </Form>
    </Container>
  );
}

export default EditAccount;
