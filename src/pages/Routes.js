import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Employees from "./Employees";
import NotFound from "./NotFound";
import Search from "./Search";
import Calendar from "./Calendar";
import EmployeeCalendar from "./EmployeeCalendar";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route exact path="/employees/:id(\d+)" component={EmployeeCalendar} />
      <Route path="/employees" component={Employees} />
      <Route path="/search" component={Search} />
      <Route path="/calendar" component={Calendar} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
