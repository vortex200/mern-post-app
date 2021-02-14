import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Account from "./Account";
import http from "Utils/http-common";

function AdminPanel() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    http
      .get("/api/posts")
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
