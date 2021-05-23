import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button } from "../../components";
import { decrease, increase } from "../../store/counter";

const Employees = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const onIncrement = () => dispatch(increase());
  const onDecrement = () => dispatch(decrease());

  return (
    <div className="flex flex-col space-y-2 justify-center items-center">
      <div style={{ marginLeft: "auto" }}>
        <Link to="/" style={{ display: "inline-block" }}>
          <Button
            className="flex flex-col items-center bg-accent w-12 h-12 rounded-3xl justify-center"
            type="button">
            <IoArrowForward color="#e6e6e6" size="2em" />
          </Button>
        </Link>
      </div>
      <div>
        <p>Counter: {counter}</p>
      </div>
      <div>
        <Button className="bg-accent w-32 h-10 rounded-3xl" type="button" onClick={onDecrement}>
          -
        </Button>
      </div>
    </div>
  );
};

export default Employees;
