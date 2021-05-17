import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="m-2">
        <Link to="/employees">
          <div className="text-center">
            <img
              src="https://via.placeholder.com/512x512"
              alt=""
              className="md:w-96 md:h-96 sm:w-48 sm:h-48 h-24 w-24 mx-auto"
            />
            <h2 className="font-bold font-serif md:text-xl sm:text-lg text-md p-4">Employees</h2>
          </div>
        </Link>
      </div>

      <div className="m-2">
        <Link to="/calendar">
          <div className="text-center">
            <img
              src="https://via.placeholder.com/512x512"
              alt=""
              className="md:w-96 md:h-96 sm:w-48 sm:h-48 h-24 w-24 mx-auto"
            />
            <h2 className="font-bold font-serif md:text-xl sm:text-lg text-md p-4">Calendar</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
