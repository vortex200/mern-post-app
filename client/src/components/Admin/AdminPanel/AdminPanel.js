import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./Admin.css";

const Account = (input) => (
  <tr>
    <td>
      <img
        src={process.env.REACT_APP_API_URL + "/" + input.data.image}
        style={{ width: "50px", height: "50px" }}
      />
    </td>
    <td>{input.data.title}</td>
    <td>{input.data.description}</td>
    <td>{input.data.category}</td>
    <td>{input.data.price}</td>
    <td>
      <ButtonGroup>
        <Button variant="warning" href={"/admin/edit/" + input.data._id}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => deleteAccount(input.data._id)}>
          Delete
        </Button>
      </ButtonGroup>
    </td>
  </tr>
);

function deleteAccount(id) {
  axios
    .delete(process.env.REACT_APP_API_URL + "/api/account/" + id)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Account deleted succesfully!");
        window.location.reload(false);
      } else {
        toast.warning("Error deleting account... Unexpected status");
        console.log(res);
      }
    })
    .catch((err) => {
      toast.warning("Error uploading account...");
      console.log(err);
    });
}

function AdminPanel() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/account")
      .then((res) => {
        setAccounts(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function itemList() {
    return accounts.map((item) => {
      return <Account data={item} key={item.price * Math.random(0, 1)} />;
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
      <Button variant="primary" href={"/admin/new/"}>
        New Item
      </Button>
      <ToastContainer />
    </Container>
  );
}

export default AdminPanel;
