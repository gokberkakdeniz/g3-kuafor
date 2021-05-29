import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowForward } from "react-icons/io5";
import { Link, useHistory } from "react-router-dom";
import { Button, BackButton } from "../../components/Button";
import { decrease, increase } from "../../store/counter";
import { NameDiv } from "../../components";
import Workers from "../../store/employees";

const Employees = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <>
      <div className="float-right">
        <BackButton onClick={() => history.push("/")}>
          <IoArrowForward color="#e6e6e6" size="2em" />
        </BackButton>
      </div>

      <div className="flex flex-col space-y-2 justify-center items-center">
        <h1 className="mt-2 flex text-primary text-3xl font-Open-Sans font-semibold">EMPLOYEES</h1>
        <div className="flex flex-row text-center">
          <NameDiv
            list={Workers.filter((user) => user.type.includes("Man Hairdresser"))}
            title="MAN HAIRDRESSER"
          />
          <NameDiv
            list={Workers.filter((user) => user.type.includes("Woman Hairdresser"))}
            title="WOMAN HAIRDRESSER"
          />
          <NameDiv
            list={Workers.filter(
              (user) => user.type.includes("Laser") && user.type.includes("Skin Care")
            )}
            title="BEAUTY CENTER"
          />
        </div>
      </div>
    </>
  );
};

export default Employees;
