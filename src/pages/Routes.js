import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Employees from "./Employees";
import NotFound from "./NotFound";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/employees/:id?" component={Employees} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
