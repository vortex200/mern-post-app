import React from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import "./AccountList.css";

const Account = (input) => (
  <tr onClick={() => (window.location.pathname = "/items/" + input.data._id)}>
    <td>{input.index + 1}</td>
    <td md={{ span: 2, offset: 1 }}>
      <Image
        src={process.env.REACT_APP_API_URL + "/" + input.data.image}
        className="account-image"
        rounded
      />
    </td>
    <td>{input.data.title}</td>
    <td>{input.data.category}</td>
    <td>Price: {input.data.price}€</td>
    <td>
      <Button>Buy</Button>
    </td>
  </tr>
);

function AccountTable(input) {
  function itemList(array) {
    return array.slice(input.page.start, input.page.end).map((item, index) => {
      return (
        <Account
          data={item}
          index={index}
          key={item.price * Math.random(0, 1)}
        />
      );
    });
  }

  return <tbody>{itemList(input.data)}</tbody>;
}

export default AccountTable;
