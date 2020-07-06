import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import {
  NavBar,
  Home,
  AdminPanel,
  NewItem,
  EditItem,
  Login,
  Register,
} from "./index";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/items" component={Home} />
        <Route exact path="/admin" component={AdminPanel} />
        <Route path="/admin/new" component={NewItem} />
        <Route path="/admin/edit/:id" component={EditItem} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
};

export default App;
