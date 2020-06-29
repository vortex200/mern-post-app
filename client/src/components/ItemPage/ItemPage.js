import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

function Home() {
  const [item, setItem] = useState({});
  const itemId = window.location.pathname.replace("/item/", "");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/account/" + itemId)
      .then((res) => {
        setItem(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <h1>Item</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{item._id}</td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{item.category}</td>
            <td>{item.price}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default Home;
