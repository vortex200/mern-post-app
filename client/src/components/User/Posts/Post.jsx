import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import SetHeaders from "Utils/SetHeaders";

const Post = (input) => (
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
        <Button variant="warning" href={"/user/edit/" + input.data._id}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => deletePost(input.data._id)}>
          Delete
        </Button>
      </ButtonGroup>
    </td>
  </tr>
);

function deletePost(id) {
  axios
    .delete(process.env.API_URL + "/api/posts/" + id, SetHeaders())
    .then((res) => {
      if (res.status === 200) {
        window.location.reload(false);
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export default Post;
