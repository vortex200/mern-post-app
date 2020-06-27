import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function UploadForm() {
  const [value, setvalue] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

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
      .post(process.env.REACT_APP_API_URL + "/api/account", formData, config)
      .then((res) => {
        if (res.status === 200) {
          window.location.reload(false);
        } else {
          console.log(res);
          toast.warning("Error uploading account... Unexpected status");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.warning("Error uploading account...");
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
    <>
      <Form onSubmit={handleSubmit} className="form-area">
        <Row>
          <Col>
            <Form.Group controlId="formvalue">
              <Form.Label>Value</Form.Label>
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
    </>
  );
}

export default UploadForm;
