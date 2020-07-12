import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Account = (input) => (
  <tr>
    <td>
      <img
        src={process.env.API_URL + "/" + input.data.image}
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
    .delete(process.env.API_URL + "/api/posts/" + id)
    .then((res) => {
      if (res.status === 200) {
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

export default Account;
