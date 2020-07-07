import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import {
  NavBar,
  Products,
  AdminPanel,
  NewItem,
  EditItem,
  Login,
  Register,
  Details,
} from "./index";
import { AuthContextProvider } from "Contexts/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <NavBar />
        <Switch>
          <Elements stripe={stripePromise}>
            <Route exact path="/" component={Products} />
            <Route exact path="/admin" component={AdminPanel} />
            <Route path="/admin/new" component={NewItem} />
            <Route path="/admin/edit/:id" component={EditItem} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/auth" component={Details} />
          </Elements>
        </Switch>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
