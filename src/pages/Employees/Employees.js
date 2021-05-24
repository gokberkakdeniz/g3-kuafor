import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button, BackButton } from "../../components/Button";
import { decrease, increase } from "../../store/counter";
import { Titles } from "../../components";

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
      <div
        style={{ marginTop: "40%" }}
        className=" flex flex-col grid grid-cols-3 md:gap-10 place-items-start h-48 absolute">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>6</div>
        <div>6</div>
        <div>6</div>
      </div>
    </div>
  );
};

export default Employees;
