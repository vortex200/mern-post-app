import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import AccountTable from "./AccountTable";

function Home() {
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

  function sortAccounts(method) {
    let sorted;

    if (method === "priceLowToHigh") {
      sorted = accounts.sort(function (a, b) {
        return a.price - b.price;
      });
    } else if (method === "priceHighToLow") {
      sorted = accounts.sort(function (a, b) {
        return b.price - a.price;
      });
    } else if (method === "dateNewToOld") {
      sorted = accounts.sort(function (a, b) {
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      });
    } else if (method === "dateOldToNew") {
      sorted = accounts.sort(function (a, b) {
        return Date.parse(a.createdAt) - Date.parse(b.createdAt);
      });
    }

    setAccounts([...sorted]);
  }

  return (
    <Container>
      <DropdownButton title="Sort by">
        <Dropdown.Item onClick={() => sortAccounts("priceLowToHigh")}>
          Price (Low to High)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => sortAccounts("priceHighToLow")}>
          Price (High to Low)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => sortAccounts("dateNewToOld")}>
          Date (New to Old)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => sortAccounts("dateOldToNew")}>
          Date (Old to New)
        </Dropdown.Item>
      </DropdownButton>

      <AccountTable data={accounts} />
    </Container>
  );
}

export default Home;
