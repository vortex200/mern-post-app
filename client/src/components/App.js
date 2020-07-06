import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import {
  NavBar,
  Items,
  AdminPanel,
  NewItem,
  EditItem,
  Login,
  Register,
  Auth,
} from "./index";
import { AuthContextProvider } from "../contexts/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <NavBar />
        <Switch>
          <Route exact path="/items" component={Items} />
          <Route exact path="/admin" component={AdminPanel} />
          <Route path="/admin/new" component={NewItem} />
          <Route path="/admin/edit/:id" component={EditItem} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
