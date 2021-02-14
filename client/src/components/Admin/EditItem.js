import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Categories from "Utils/Categories";
import SetHeaders from "Utils/SetHeaders";
import http from "Utils/http-common";

function EditItem() {
  const categories = Categories;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const accountId = window.location.pathname.replace("/admin/edit/", "");

  useEffect(() => {
    http
      .get("/api/posts/" + accountId)
      .then((res) => {
        if (res.status === 200) {
          const oldtitle = res.data.result.title;
          const oldDescription = res.data.result.description;
          const oldCategory = res.data.result.category;
          const oldPrice = res.data.result.price;
          setTitle(oldtitle);
          setDescription(oldDescription);
          setCategory(oldCategory);
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
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("image", image);

    const config = SetHeaders();

    http
      .post("/api/posts/" + accountId, formData, config)
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
      case "description":
        setDescription(e.target.value);
        break;
      case "category":
        setCategory(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;

      case "image":
        setImage(e.target.files[0]);
        break;
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
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
    </Container>
  );
}

export default EditItem;
