import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Campaign from "./components/Campaign/Campaign";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/campaign" component={Campaign} />
    </Switch>
  </BrowserRouter>
);

export default Router;
