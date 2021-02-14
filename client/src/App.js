import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "Components/NavBar";
// import {
//   AdminPanel,
//   NewItem,
//   EditItem,
// } from "./components";

import Products from "Pages/index";
import Login from "Pages/login";
import Details from "Pages/details";
import NewPost from "Pages/user/NewPost";
import MyPosts from "Pages/user/MyPosts";
import EditPost from "Pages/user/EditPost";

import { AuthContextProvider } from "Contexts/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Products} />
          {/* <Route exact path="/admin" component={AdminPanel} />
          <Route path="/admin/new" component={NewItem} />
          <Route path="/admin/edit/:id" component={EditItem} /> */}
          <Route path="/login" component={Login} />
          <Route path="/auth" component={Details} />
          <Route path="/user/new-post" component={NewPost} />
          <Route path="/user/my-posts" component={MyPosts} />
          <Route path="/user/edit/:id" component={EditPost} />
        </Switch>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
