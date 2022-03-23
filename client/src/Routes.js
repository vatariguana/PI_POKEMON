import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./views/Landing";
import Home from "./views/Home";
import DetailsPokemon from "./views/DetailsPokemon";
import Create from "./views/CreatePokemon";

const Routes = () => {
  return (
    <Switch>
      <Route exact component={Landing} path="/" />
      <Route exact component={Home} path="/home"/>
      <Route exact component={DetailsPokemon} path="/home/detail/:id" />
      <Route exact component={Create} path="/home/new"/>
    </Switch>
  );
};

export default Routes;
