import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import {
  NavBar,
  Products,
  // AdminPanel,
  // NewItem,
  // EditItem,
  Details,
  Auth,
  NewPost,
  MyPosts,
  EditPost,
} from "./index";
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
          <Route path="/login" component={Auth} />
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
