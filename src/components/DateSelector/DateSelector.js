import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = ({ handleDisable, handleDate, startDate, bannedDateList, now }) => {
  const afterThreeMonts = new Date(new Date().setDate(new Date().getDate() + 90));
  // eslint-disable-next-line prefer-const
  let blockedDates = [];
  function checkAvailability(dateObj) {
    if (bannedDateList === undefined) return true;
    if (bannedDateList === []) return true;
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
    const result = checkAvailability(selectedDate) && endTime && startTime;
    if (!result) blockedDates.push(time);
    return result;
  };
  const filterDate = (time) => {
    const result = !String(time).includes("Mo") && time < afterThreeMonts;
    if (!result) blockedDates.push(time);
    return result;
  };

  const handleColor = (time) => {
    const found = blockedDates.find((date) => date.getTime() === time.getTime());
    if (found === undefined) return "text-secondary";
    return "text-accent";
  };
  return (
    <DatePicker
      disabled={handleDisable}
      timeClassName={handleColor}
      dayClassName={handleColor}
      className="px-2 h-7 rounded-3xl bg-popup text-secondary"
      showTimeSelect
      required
      filterDate={filterDate}
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
