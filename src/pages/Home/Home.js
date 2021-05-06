import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components";

const Home = () => {
  return (
    <div>
      <Link to="/employees">
        <Button type="button" onClick={console.log}>
          Employees
        </Button>
      </Link>
    </div>
  );
};

export default Home;
