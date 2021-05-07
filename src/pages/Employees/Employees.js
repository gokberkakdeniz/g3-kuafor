import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components";
import { decrease, increase } from "../../store/counter";

const Employees = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const onIncrement = () => dispatch(increase());
  const onDecrement = () => dispatch(decrease());

  return (
    <div className="flex flex-col space-y-2 justify-center items-center">
      <div>
        <p>Counter: {counter}</p>
      </div>
      <div>
        <Button type="button" onClick={onIncrement}>
          +
        </Button>
      </div>
      <div>
        <Button type="button" onClick={onDecrement}>
          -
        </Button>
      </div>
    </div>
  );
};

export default Employees;
