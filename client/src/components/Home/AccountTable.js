import React from "react";
import Table from "react-bootstrap/Table";

const Account = (input) => (
  <tr>
    <td>
      <img
        src={process.env.REACT_APP_API_URL + "/" + input.data.image}
        style={{ width: "50px", height: "50px" }}
      />
    </td>
    <td>{input.data.value}€</td>
    <td>{input.data.description}</td>
    <td>{input.data.price}€</td>
    <td>{Math.round(100 - (input.data.price / input.data.value) * 100)}%</td>
  </tr>
);

function AccountTable(input) {
  function itemList(array) {
    return array.map((item) => {
      return <Account data={item} key={item.price * Math.random(0, 1)} />;
    });
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Image</th>
          <th>Value</th>
          <th>Description</th>
          <th>Price</th>
          <th>Discount</th>
        </tr>
        {itemList(input.data)}
      </thead>
    </Table>
  );
}

export default AccountTable;
