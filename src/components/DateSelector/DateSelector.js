import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = ({ handleDate, startDate, bannedDateList, now }) => {
  const afterThreeMonts = new Date(new Date().setDate(new Date().getDate() + 90));
  function checkAvailability(dateObj) {
    if (bannedDateList === undefined) return true;
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const month = dateObj.getMonth();
    const day = dateObj.getDay();
    const found = bannedDateList.find(
      (obj) =>
        obj.getMonth() === month &&
        obj.getDay() === day &&
        obj.getHours() === hours &&
        obj.getMinutes() === minutes
    );
    if (found === undefined) return true;
    return false;
  }

  const filterPassedTime = (time) => {
    const selectedDate = new Date(time);
    const hours = selectedDate.getHours();
    const endTime = hours <= 23;
    const startTime = hours >= 7;
    return checkAvailability(selectedDate) && endTime && startTime;
  };
  const handleColor = (time) => {
    return "text-secondary";
  };
  return (
    <DatePicker
      timeClassName={handleColor}
      dayClassName={handleColor}
      className="px-2 h-7 rounded-3xl bg-popup text-secondary"
      showTimeSelect
      required
      filterDate={(date) => !String(date).includes("Mo") && date < afterThreeMonts}
      placeholderText="Date"
      minDate={now}
      dateFormat="Pp"
      filterTime={filterPassedTime}
      isClearable
      selected={startDate}
      onChange={handleDate}
    />
  );
};

export default DateSelector;
