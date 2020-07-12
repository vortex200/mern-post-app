import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Account from "./Account";

function AdminPanel() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.API_URL + "/api/posts")
      .then((res) => {
        setAccounts(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function itemList() {
    return accounts.map((item, index) => {
      return <Account data={item} key={index} />;
    });
  }

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Options</th>
          </tr>
          {itemList()}
        </thead>
      </Table>
      <Button variant="primary" href="/admin/new/">
        New Item
      </Button>
      <ToastContainer />
    </Container>
  );
}

export default AdminPanel;
