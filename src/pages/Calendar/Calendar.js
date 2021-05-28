import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { Link, useHistory } from "react-router-dom";
import dayjs from "dayjs";
import { Button, BackButton } from "../../components/Button";
import { NameDiv } from "../../components";
// 7 - 24

function getWeekDays(date) {
  const d = dayjs(date).set("millisecond", 0).set("second", 0).set("minute", 0).set("hour", 0);
  const startOfWeek = d.subtract(d.day(), "day");

  return [0, 1, 3, 4, 5, 6].map((i) => startOfWeek.add(i, "day"));
}

function getSlots(date, startHour, endHour, lengthHour) {
  const result = [];

  for (let index = startHour; index < endHour; index += lengthHour) {
    const start = date.add(index, "hours");
    const end = start.add(lengthHour * 60, "minute");
    result.push([start, end]);
  }

  return result;
}

function getWeekRangeText(date) {
  const d = dayjs(date).set("millisecond", 0).set("second", 0).set("minute", 0).set("hour", 0);

  const start = d.subtract(d.day(), "day");
  const end = start.add(6, "day");

  return `${d.date()} ${
    start.month() === end.month() ? "" : start.format("MMMM")
  } - ${end.date()} ${end.format("MMMM")}`;
}

function useWeeklySchedule(from, to, length) {
  const [days, setDays] = useState(getWeekDays(Date.now()));

  const daySlots = useMemo(() => {
    return days.map((day) => getSlots(day, from, to, length));
  }, [days, from, to, length]);

  const back = () => setDays(getWeekDays(days[0].subtract(days[0].day() + 1, "day")));
  const next = () => setDays(getWeekDays(days[0].add(days[0].day() + 7, "day")));

  return [
    days.map((day, i) => ({ day, slots: daySlots[i] })),
    getWeekRangeText(days[0]),
    back,
    next
  ];
}

const Calendar = () => {
  const [days, weekText, back, next] = useWeeklySchedule(7, 24, 0.5);
  const history = useHistory();
  const handleSlotClick = (...args) => console.log(...args);

  return (
    <div className="p-4">
      <div className="ml-auto" style={{ display: "inline-block" }}>
        <BackButton onClick={() => history.push("/")}>
          <IoArrowBack color="#e6e6e6" size="2em" />
        </BackButton>
      </div>

      <div>
        <div
          className="flex flex-row space-x-4 justify-end items-center mx-auto pb-4"
          style={{ width: "92.5rem" }}>
          <div>
            <BackButton onClick={back} small>
              <IoArrowBack color="#e6e6e6" size="1.5em" />
            </BackButton>
          </div>
          <div>
            <span className="">{weekText}</span>
          </div>
          <div>
            <BackButton onClick={next} small>
              <IoArrowForward color="#e6e6e6" size="1.5em" />
            </BackButton>
          </div>
        </div>
        <div className="flex flex-row space-x-2 justify-center items-center">
          {days.map(({ day, slots }) => (
            <div key={`col-${day.unix()}`} className="flex flex-col w-60">
              <div className="bg-popup text-center py-2">
                <span className="font-black text-black">{day.format("dddd")}</span>
                <br />
                <span className="text-black text-sm">{day.format("DD MMMM YYYY")}</span>
              </div>

              <div className="flex flex-col my-4 overflow-y-auto overflow-x-hidden h-96">
                {slots.map(([start, end]) => (
                  <div
                    key={`slot-${start.unix()}`}
                    className="bg-popup text-center w-full py-2 border-b-2 border-gray-500"
                    role="button"
                    tabIndex={0}
                    aria-hidden="true"
                    onClick={() => handleSlotClick(day, start, end)}
                    title="Click to reserve">
                    <span className="font-black text-black">sdfsdf</span>
                    <br />
                    <span className="text-black text-sm">
                      {`${start.format("HH:mm")} - ${end.format("HH:mm")}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-8 bottom-8">
        <div className="flex flex-row space-x-4 items-center mt-auto" style={{ width: "92.5rem" }}>
          <div>
            <BackButton onClick={() => {}}>
              <IoArrowBack color="#e6e6e6" size="2em" />
            </BackButton>
          </div>
          <div>
            <span className="">Man Hairdresser (Not implemented)</span>
          </div>
          <div>
            <BackButton onClick={() => {}}>
              <IoArrowForward color="#e6e6e6" size="2em" />
            </BackButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
