import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./AccountList.css";

const Account = (input) => (
  <Row
    className="account-area"
    onClick={() => (window.location.pathname = "/item/" + input.data._id)}
  >
    <Col md={{ span: 2, offset: 1 }}>
      <Image
        src={process.env.REACT_APP_API_URL + "/" + input.data.image}
        className="account-img"
        rounded
      />
    </Col>
    <Col md={8} className="description-area">
      <h2 className="account-title">{input.data.title}</h2>
      <h5 className="account-category">{input.data.category}</h5>
      <h5 className="account-price">Price: {input.data.price}€</h5>
    </Col>
  </Row>
);

function AccountTable(input) {
  function itemList(array) {
    return array.map((item) => {
      return <Account data={item} key={item.price * Math.random(0, 1)} />;
    });
  }

  return <div>{itemList(input.data)}</div>;
}

export default AccountTable;
