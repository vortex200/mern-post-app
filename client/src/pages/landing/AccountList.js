import React from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";

const Account = (input) => (
  <tr>
    <td>{input.index + 1}</td>
    <td md={{ span: 2, offset: 1 }}>
      <Image src={input.data.image} className="account-image" rounded />
    </td>
    <td>
      {input.data.title}
      <Accordion defaultActiveKey="1">
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          More info!
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="0">
          <p>{input.data.description}</p>
        </Accordion.Collapse>
      </Accordion>
    </td>
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
