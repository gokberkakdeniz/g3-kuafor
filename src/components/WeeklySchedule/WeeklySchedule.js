import React from "react";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { BackButton } from "../Button";
import useWeeklySchedule from "./useWeeklySchedule";

const WeeklySchedule = ({ renderer, onClick, from = 7, to = 24, length = 0.5 }) => {
  const [days, weekText, back, next] = useWeeklySchedule(from, to, length);

  return (
    <div className="p-4 max-w-full mx-auto">
      <div className="grid grid-rows-2 grid-flow-row">
        <div className="row-span-2 text-right">
          <div className="flex flex-row space-x-4 justify-end items-center mx-auto pb-4">
            <div>
              <BackButton onClick={back} small>
                <IoArrowBack color="#e6e6e6" size="1.5em" />
              </BackButton>
            </div>
            <div className="w-60 flex justify-center">
              <span className="">{weekText}</span>
            </div>
            <div>
              <BackButton onClick={next} small>
                <IoArrowForward color="#e6e6e6" size="1.5em" />
              </BackButton>
            </div>
          </div>
          <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-6">
            {days.map(({ day, slots }, dayIndex) => (
              <div key={`col-${day.unix()}`} className="flex flex-col">
                <div className="bg-popup text-center py-2 border-b-2 md:border-transparent border-black">
                  <span className="font-black text-black">{day.format("dddd")}</span>
                  <br />
                  <span className="text-black text-sm">{day.format("DD MMMM YYYY")}</span>
                </div>

                <div className="flex flex-col mb-4 md:mt-4 overflow-y-auto overflow-x-hidden h-96 scrollbar--gray">
                  {slots.map(([start, end], slotIndex) => (
                    <div
                      key={`slot-${start.unix()}`}
                      className="bg-popup text-center w-full py-2 border-b-2 border-gray-500 outline-none"
                      role="button"
                      tabIndex={0}
                      aria-hidden="true"
                      onClick={(event) => onClick(event, { start, end, day, dayIndex, slotIndex })}
                      title="Click to reserve">
                      <span className="text-black text-sm font-bold">
                        {`${start.format("HH:mm")} - ${end.format("HH:mm")}`}
                      </span>
                      <br />
                      {renderer({ start, end, day, dayIndex, slotIndex })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklySchedule;
