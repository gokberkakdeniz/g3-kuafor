import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { BackButton, WeeklySchedule, Popup, DateSelector, Button } from "../../components";
import { mapToSpan, mapToDates, findWorkerId } from "../../helper";
import Workers from "../../store/employees";
import { validateAppointment } from "../../validator";
import { add, NEW, DONE } from "../../store/appointment";

const rooms = ["Man Hairdresser", "Woman Hairdresser", "Skin Care", "Laser"];

const Calendar = () => {
  const now = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("");
  const [isDisabled, setDisabled] = useState(true);
  function setValues() {
    setName("");
    setSurname("");
    setPhoneNumber("");
    setStartDate();
    setDisabled(true);
  }

  const togglePopup = () => {
    if (isOpen) {
      setValues();
    }
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();

  function chooseType() {
    return rooms[current].includes("Man Hairdresser") ? NEW : DONE;
  }

  const onClick = () => {
    const foundWorker = Workers.find((worker) => worker.userName === workerName);
    if (foundWorker === undefined) return;
    const result = validateAppointment(phoneNumber, now, startDate);
    if (!result) return;
    const beautyPlace = type.includes("Beauty Center") ? chooseType() : NEW;
    dispatch(add(foundWorker.id, name, surname, phoneNumber, startDate, type, beautyPlace));
    togglePopup();
  };
  const Appointments = useSelector((state) => state.adder.appointments || []);

  const [current, setCurrent] = useState(0);
  const history = useHistory();

  const handleForward = () => {
    if (current === rooms.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };
  const handleBackward = () => {
    if (current === 0) setCurrent(rooms.length - 1);
    else setCurrent(current - 1);
  };

  const handleSlotClick = (event, args) => {
    if (event.target.textContent.includes("-")) return;
    if (new Date() > new Date(args.start.$d)) return;
    setWorkerName(event.target.textContent);
    const foundWorker = Workers.find((worker) => worker.userName === event.target.textContent);
    setStartDate(args.start.$d);
    const roomValue = ["Skin Care", "Laser"].includes(rooms[current])
      ? rooms[current]
      : "Beauty Center";
    setType(Array.isArray(foundWorker.type) ? roomValue : rooms[current]);
    togglePopup();
  };
  const renderSlot = (args) => {
    return mapToSpan({
      date: args.start,
      workers: Workers,
      appointments: Appointments,
      type: rooms[current]
    });
  };

  return (
    <div className="p-4">
      <div>
        {isOpen && (
          <Popup
            content={
              <>
                <div className="grid grid-cols-1 gap-2">
                  <p className="text-secondary">Appointment Information</p>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary border border-transparent outline-none focus:outline-none focus:border-accent"
                    placeholder="Name"
                  />
                  <input
                    value={surname}
                    onChange={(event) => setSurname(event.target.value)}
                    className=" px-2 h-7 rounded-3xl bg-popup text-secondary border border-transparent outline-none focus:outline-none focus:border-accent"
                    placeholder="Surname"
                  />
                  <input
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary border border-transparent outline-none focus:outline-none focus:border-accent"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <p className="text-secondary">Worker Information</p>
                  <h1 className="px-2 h-7 rounded-3xl bg-popup text-secondary">{type}</h1>
                  <h1 className="px-2 h-7 rounded-3xl bg-popup text-secondary">{workerName}</h1>
                  <DateSelector
                    handleDisable={isDisabled}
                    startDate={startDate}
                    now={now}
                    bannedDateList={mapToDates(Appointments, findWorkerId(Workers, workerName))}
                  />
                </div>
                <Button
                  type="submit"
                  onClick={onClick}
                  className="bg-accent flex-col absolute bottom-5 w-24 h-12 rounded-3xl right-5">
                  Create
                </Button>
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </div>
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
          <div className="w-40 flex justify-center">
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
