import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button, BackButton } from "../../components/Button";
import { decrease, increase } from "../../store/counter";
import { NameDiv, Titles } from "../../components";
import Users from "../../store/employees";

const Employees = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const onIncrement = () => dispatch(increase());
  const onDecrement = () => dispatch(decrease());

  return (
    <div className="flex flex-col space-y-2 justify-center items-center">
      <Titles />
      <div style={{ marginLeft: "auto" }}>
        <Link to="/" style={{ display: "inline-block" }}>
          <BackButton>
            <IoArrowForward color="#e6e6e6" size="2em" />
          </BackButton>
        </Link>
      </div>
      <NameDiv style={{ marginTop: "40%" }} list={Users.filter((user) => user.type === "woman")} />
      <NameDiv
        style={{ marginTop: "40%", marginRight: "50%" }}
        list={Users.filter((user) => user.type === "man")}
      />
      <NameDiv
        style={{ marginTop: "40%", marginLeft: "50%" }}
        list={Users.filter((user) => user.type === "beauty")}
      />
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
