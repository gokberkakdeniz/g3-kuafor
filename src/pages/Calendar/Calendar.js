import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button, BackButton } from "../../components/Button";
import { decrease, increase } from "../../store/counter";
import { NameDiv, Titles } from "../../components";
import Users from "../../store/employees";

const Calendar = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const onIncrement = () => dispatch(increase());
  const onDecrement = () => dispatch(decrease());

  return (
    <>
      <Link to="/" className="ml-auto" style={{ display: "inline-block" }}>
        <BackButton>
          <IoArrowBack color="#e6e6e6" size="2em" />
        </BackButton>
      </Link>
      <div className="flex flex-col space-y-2 justify-center items-center">CALENDAR</div>
    </>
  );
};

export default Calendar;
