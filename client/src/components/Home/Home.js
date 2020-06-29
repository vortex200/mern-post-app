import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";
import AccountList from "./AccountList";
import Categories from "../shared/Categories";
import "./Home.css";

function Home() {
  const categories = Categories;
  const [accounts, setAccounts] = useState([]);
  const [visibleAccounts, setVisibleAccounts] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/account")
      .then((res) => {
        setAccounts(res.data.result);
        setVisibleAccounts(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function sortAccounts(method) {
    let sorted;

    if (method === "priceLowToHigh") {
      sorted = visibleAccounts.sort(function (a, b) {
        return a.price - b.price;
      });
    } else if (method === "priceHighToLow") {
      sorted = visibleAccounts.sort(function (a, b) {
        return b.price - a.price;
      });
    } else if (method === "dateNewToOld") {
      sorted = visibleAccounts.sort(function (a, b) {
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      });
    } else if (method === "dateOldToNew") {
      sorted = visibleAccounts.sort(function (a, b) {
        return Date.parse(a.createdAt) - Date.parse(b.createdAt);
      });
    }

    setVisibleAccounts([...sorted]);
  }

  function filterAccounts(filterCategory) {
    if (filterCategory) {
      setVisibleAccounts(
        accounts.filter((item) => item.category === filterCategory)
      );
    } else {
      setVisibleAccounts(accounts);
    }
  }

  function filterList() {
    return categories.map((item, index) => {
      return (
        <Dropdown.Item
          key={index * Math.random(0, 1)}
          onClick={() => filterAccounts(item)}
        >
          {item}
        </Dropdown.Item>
      );
    });
  }

  return (
    <Container>
      <Row>
        <DropdownButton title="Filter">
          <Dropdown.Item onClick={() => filterAccounts()}>
            Select All
          </Dropdown.Item>
          {filterList()}
        </DropdownButton>
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
      </Row>

      <AccountList data={visibleAccounts} />
    </Container>
  );
}

export default Home;
