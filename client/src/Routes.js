import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./views/Landing";
import Home from "./views/Home";

const Routes = () => {
  return (
    <Switch>
      <Route exact component={Landing} path="/" />
      <Route exact component={Home} path="/home"/>
    </Switch>
  );
};

export default Routes;
