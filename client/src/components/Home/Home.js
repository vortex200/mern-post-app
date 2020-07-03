import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import AccountList from "./AccountList";
import Categories from "../shared/Categories";
import "./Home.css";

function Home() {
  const categories = Categories;
  const pageLength = 5;
  const [accounts, setAccounts] = useState([]);
  const [visibleAccounts, setVisibleAccounts] = useState([]);
  const [priceLowToHigh, setPriceLowToHigh] = useState(false);
  const [categoryLowToHigh, setCategoryLowToHigh] = useState(false);
  const [titleLowToHigh, setTitleLowToHigh] = useState(false);
  const [page, setPage] = useState(1);

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

    switch (method) {
      case "price":
        setPriceLowToHigh(!priceLowToHigh);
        if (priceLowToHigh) {
          sorted = visibleAccounts.sort(function (a, b) {
            return a.price - b.price;
          });
        } else {
          sorted = visibleAccounts.sort(function (a, b) {
            return b.price - a.price;
          });
        }
        break;
      case "category":
        setCategoryLowToHigh(!categoryLowToHigh);
        if (categoryLowToHigh) {
          sorted = visibleAccounts.sort(function (a, b) {
            if (a.category < b.category) {
              return 1;
            }
            if (a.category > b.category) {
              return -1;
            }
            return 0;
          });
        } else {
          sorted = visibleAccounts.sort(function (a, b) {
            if (a.category < b.category) {
              return -1;
            }
            if (a.category > b.category) {
              return 1;
            }
            return 0;
          });
        }
        break;
      case "title":
        setTitleLowToHigh(!titleLowToHigh);
        if (titleLowToHigh) {
          sorted = visibleAccounts.sort(function (a, b) {
            if (a.title < b.title) {
              return 1;
            }
            if (a.title > b.title) {
              return -1;
            }
            return 0;
          });
        } else {
          sorted = visibleAccounts.sort(function (a, b) {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          });
        }
        break;
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

  function pageNumbers() {
    let items = [];

    items.push(
      <Pagination.Prev onClick={() => setPage(page === 1 ? 1 : page - 1)} />
    );

    for (
      let number = 1;
      number <= Math.ceil(visibleAccounts.length / pageLength);
      number++
    ) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => setPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Next
        onClick={() =>
          setPage(
            page === Math.ceil(visibleAccounts.length / pageLength)
              ? page
              : page + 1
          )
        }
      />
    );

    return <Pagination>{items}</Pagination>;
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
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th onClick={() => sortAccounts("title")}>Title</th>
            <th onClick={() => sortAccounts("category")}>Category</th>
            <th onClick={() => sortAccounts("price")}>Price</th>
            <th>Buy</th>
          </tr>
        </thead>
        <AccountList
          data={visibleAccounts}
          page={{
            start: page === 1 ? 0 : (page - 1) * pageLength,
            end: page * pageLength,
          }}
        />
      </Table>
      {pageNumbers()}
    </Container>
  );
}

export default Home;
