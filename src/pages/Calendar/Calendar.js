import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import Dayzed, { useDayzed } from "dayzed";
import { Button, BackButton } from "../../components/Button";
import { decrease, increase } from "../../store/counter";
import { NameDiv } from "../../components";
import Workers from "../../store/employees";

const Calendar = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const onIncrement = () => dispatch(increase());
  const onDecrement = () => dispatch(decrease());
  const monthNamesShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const weekdayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function Malendar({ calendars, getBackProps, getForwardProps, getDateProps }) {
    if (calendars.length) {
      return (
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div>
            <button type="button" {...getBackProps({ calendars })}>
              Back
            </button>
            <button type="button" {...getForwardProps({ calendars })}>
              Next
            </button>
          </div>
          {calendars.map((calendar) => (
            <div
              key={`${calendar.month}${calendar.year}`}
              style={{
                display: "inline-block",
                width: "50%",
                padding: "0 10px 30px",
                boxSizing: "border-box"
              }}>
              <div>
                {monthNamesShort[calendar.month]} {calendar.year}
              </div>
              {weekdayNamesShort.map((weekday) => (
                <div
                  key={`${calendar.month}${calendar.year}${weekday}`}
                  style={{
                    display: "inline-block",
                    width: "calc(100% / 7)",
                    border: "none",
                    background: "transparent"
                  }}>
                  {weekday}
                </div>
              ))}
              {calendar.weeks.map((week, weekIndex) =>
                week.map((dateObj, index) => {
                  const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                  if (!dateObj) {
                    return (
                      <div
                        key={key}
                        style={{
                          display: "inline-block",
                          width: "calc(100% / 7)",
                          border: "none",
                          background: "transparent"
                        }}
                      />
                    );
                  }
                  const { date, selected, selectable, today } = dateObj;
                  let background = today ? "cornflowerblue" : "";
                  background = selected ? "purple" : background;
                  background = !selectable ? "teal" : background;
                  return (
                    <button
                      type="button"
                      style={{
                        display: "inline-block",
                        width: "calc(100% / 7)",
                        border: "none",
                        background: "black"
                      }}
                      key={key}
                      {...getDateProps({ dateObj })}>
                      {selectable ? date.getDate() : "X"}
                    </button>
                  );
                })
              )}
            </div>
          ))}
        </div>
      );
    }
    return null;
  }

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
