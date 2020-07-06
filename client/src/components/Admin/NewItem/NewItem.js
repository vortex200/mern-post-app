import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Categories from "../../shared/Categories";
import SetHeaders from "../../shared/SetHeaders";
import "./NewItem.css";

function UploadForm() {
  const categories = Categories;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Team Fortress 2");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("image", image);

    const config = SetHeaders();

    axios
      .post(process.env.REACT_APP_API_URL + "/api/account", formData, config)
      .then((res) => {
        if (res.status === 200) {
          window.location.pathname = "/admin";
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

  function optionList() {
    return categories.map((item, index) => {
      return <option key={index * Math.random(0, 1)}>{item}</option>;
    });
  }

  function handleChange(e) {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;
      case "category":
        setCategory(e.target.value);
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
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={category}
                onChange={handleChange}
              >
                {optionList()}
              </Form.Control>
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
