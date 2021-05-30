import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components";
import EmployeeLogo from "../../store/images/EmployeesColored.png";
import CalendarLogo from "../../store/images/CalendarColored.png";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="m-2">
        <Link to="/employees">
          <div className="text-center">
            <img
              src={EmployeeLogo}
              alt=""
              className="md:w-96 md:h-96 sm:w-48 sm:h-48 h-24 w-24 mx-auto"
            />
            <h2 className="font-bold font-serif md:text-xl sm:text-lg text-md p-4 text-white">
              Employees
            </h2>
          </div>
        </Link>
      </div>

      <div className="m-2">
        <Link to="/calendar">
          <div className="text-center">
            <img
              src={CalendarLogo}
              alt=""
              className="md:w-96 md:h-96 sm:w-48 sm:h-48 h-24 w-24 mx-auto"
            />
            <h2 className="font-bold font-serif md:text-xl sm:text-lg text-md p-4 text-white">
              Calendar
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
