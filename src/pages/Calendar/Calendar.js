import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { BackButton } from "../../components/Button";
import { mapToSpan } from "../../helper";
import Workers from "../../store/employees";
import { WeeklySchedule } from "../../components";

const rooms = ["Man Hairdresser", "Woman Hairdresser", "Skin Care", "Laser"];

const Calendar = () => {
  const tempAppointments = useSelector((state) => state.adder.appointments || []);

  const [current, setCurrent] = useState(0);
  const history = useHistory();

  const handleForward = () => {
    if (current === rooms.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };
  const handleBackward = () => {};

  const handleSlotClick = (event, args) => {
    console.log(event.target.textContent, args);
  };
  const renderSlot = (event, args) => <span className="text-black">sss</span>;

  return (
    <div className="p-4">
      <div className="ml-auto" style={{ display: "inline-block" }}>
        <BackButton onClick={() => history.push("/")}>
          <IoArrowBack color="#e6e6e6" size="2em" />
        </BackButton>
      </div>

      <WeeklySchedule onClick={handleSlotClick} renderer={renderSlot} />

      <div className="absolute left-8 bottom-8">
        <div className="flex flex-row space-x-4 items-center mt-auto" style={{ width: "92.5rem" }}>
          <div>
            <BackButton onClick={handleBackward}>
              <IoArrowBack color="#e6e6e6" size="2em" />
            </BackButton>
          </div>
          <div>
            <span className="">{rooms[current]}</span>
          </div>
          <div>
            <BackButton onClick={handleForward}>
              <IoArrowForward color="#e6e6e6" size="2em" />
            </BackButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
