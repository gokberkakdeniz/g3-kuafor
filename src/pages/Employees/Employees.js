import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button, BackButton } from "../../components/Button";
import { decrease, increase } from "../../store/counter";
import { Titles } from "../../components";
import Users from "../../store/employees";

const Employees = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const classAtt = "bg-primary w-40 h-10 font-Open-Sans font-semibold text-xl";
  const onIncrement = () => dispatch(increase());
  const onDecrement = () => dispatch(decrease());

  return (
    <div className="flex flex-col space-y-2 justify-center items-center">
      <Titles />
      <div className="ml-auto">
        <Link to="/" style={{ display: "inline-block" }}>
          <BackButton>
            <IoArrowForward color="#e6e6e6" size="2em" />
          </BackButton>
        </Link>
      </div>
      <div className="grid grid-cols-3 absolute gap-5 spacing-x-5" style={{ marginTop: "40%" }}>
        {Users.map((employee) => (
          <Link to="*" style={{ display: "inline-block" }}>
            <Button className={classAtt} type="button">
              {employee.userName}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Employees;
/* <div className="absolute">
        {Users.map((employee) => (
          <Link to="*" style={{ display: "inline-block" }}>
            {employee.type === "man" && (
              <Button className={`${classAtt}`} type="button">
                {employee.userName}{" "}
              </Button>
            )}
            {employee.type === "woman" && (
              <Button className={`${classAtt}`} type="button">
                {employee.userName}{" "}
              </Button>
            )}
            {employee.type === "beauty" && (
              <Button className={`${classAtt}`} type="button">
                {employee.userName}{" "}
              </Button>
            )}
          </Link>
        ))}
      </div> */
