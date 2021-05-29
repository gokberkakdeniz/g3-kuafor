import dayjs from "dayjs";
import { useMemo, useState } from "react";

function getWeekDays(date) {
  const d = dayjs(date).set("millisecond", 0).set("second", 0).set("minute", 0).set("hour", 0);
  const startOfWeek = d.subtract(d.day(), "day");

  return [1, 2, 3, 4, 5, 6].map((i) => startOfWeek.add(i, "day"));
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

export default function useWeeklySchedule(from, to, length) {
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
