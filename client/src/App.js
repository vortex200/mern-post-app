import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "Parts/NavBar";

import Products from "Pages/landing";
import Login from "Pages/login";
import Details from "Pages/details";
import NewPost from "Pages/user/NewPost";
import MyPosts from "Pages/user/MyPosts";
import EditPost from "Pages/user/EditPost";

import { AuthContextProvider } from "Contexts/AuthContext";

import "Styles/Main.scss";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <NavBar />
        <div className="main-body">
          <Switch>
            <Route exact path="/" component={Products} />
            <Route path="/login" component={Login} />
            <Route path="/auth" component={Details} />
            <Route path="/user/new-post" component={NewPost} />
            <Route path="/user/my-posts" component={MyPosts} />
            <Route path="/user/edit/:id" component={EditPost} />
          </Switch>
        </div>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
