import React, { useMemo, useState } from "react";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { useHistory, useParams } from "react-router-dom";
import { BackButton } from "../../components/Button";
import Workers from "../../store/employees";
import { WeeklySchedule } from "../../components";
import NotFound from "../NotFound";

const EmployeeCalendar = () => {
  const { id: idParam } = useParams();
  const id = Number(idParam);

  const history = useHistory();
  const worker = useMemo(() => Workers.find((w) => w.id === id), [id]);

  const handleForward = () => {
    history.push(`/employees/${id + 1}`);
  };
  const handleBackward = () => {
    history.push(`/employees/${id - 1}`);
  };

  const handleSlotClick = (event, args) => {
    console.log(event.target.textContent, args);
  };
  const renderSlot = (event, args) => <span className="text-black">sss</span>;

  return worker ? (
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
            <BackButton onClick={handleBackward} disabled={Workers[0].id === id}>
              <IoArrowBack color="#e6e6e6" size="2em" />
            </BackButton>
          </div>
          <div className="w-40 flex justify-center">
            <span className="">{worker?.userName}</span>
          </div>
          <div>
            <BackButton onClick={handleForward} disabled={Workers[Workers.length - 1].id === id}>
              <IoArrowForward color="#e6e6e6" size="2em" />
            </BackButton>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default EmployeeCalendar;
