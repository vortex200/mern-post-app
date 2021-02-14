import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Post from "Components/Post";
import SetHeaders from "Utils/SetHeaders";
import http from "Utils/http-common";

function MyPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    http
      .get("/api/user/posts", SetHeaders())
      .then((res) => {
        setPosts(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function postList() {
    return posts.map((item, index) => {
      return <Post data={item} key={index} />;
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
          {postList()}
        </thead>
      </Table>
      <Button variant="primary" href="/user/new-post/">
        New Post
      </Button>
    </Container>
  );
}

export default MyPosts;
