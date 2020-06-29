import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import {
  NavBar,
  Home,
  Admin,
  Login,
  Register,
  EditAccount,
  ItemPage,
} from "./index";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Admin} />
        <Route path="/admin/edit/:id" component={EditAccount} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/item/:id" component={ItemPage} />
      </Switch>
    </Router>
  );
};

export default App;
