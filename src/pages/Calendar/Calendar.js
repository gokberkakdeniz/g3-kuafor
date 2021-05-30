import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { BackButton, WeeklySchedule, Popup, DateSelector, Button } from "../../components";
import { mapToSpan, mapToDates, findWorkerId } from "../../helper";
import Workers from "../../store/employees";
import { isNumeric, validateDate } from "../../validator";

import { add } from "../../store/appointment";

const rooms = ["Man Hairdresser", "Woman Hairdresser", "Skin Care", "Laser"];
const nameErrorMessage = "Name must be at least 2 characters.";
const surnameErrorMessage = "Surname must be at least 2 characters.";
const phoneNumberErrorMessage = "Phone number must be 10 digit number.";
const typeErrorMessage = "Type must be selected";
const workerErrorMessage = "Worker must be selected";
const startDateErrorMessage = "Date cannot be in the past.";

const Calendar = () => {
  const now = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("");
  const [isDisabled, setDisabled] = useState(true);
  const [error, setError] = useState({
    name: undefined,
    surname: undefined,
    phoneNumber: undefined,
    type: undefined,
    workerName: undefined,
    startDate: undefined
  });

  useEffect(() => {
    if (name.length < 2 && name !== "") {
      setError((e) => ({
        ...e,
        name: nameErrorMessage
      }));
    } else {
      setError((e) => ({ ...e, name: name === "" ? undefined : "" }));
    }
  }, [name]);

  useEffect(() => {
    if (surname.length < 2 && surname !== "") {
      setError((e) => ({
        ...e,
        surname: surnameErrorMessage
      }));
    } else {
      setError((e) => ({ ...e, surname: surname === "" ? undefined : "" }));
    }
  }, [surname]);

  useEffect(() => {
    if ((phoneNumber.length !== 10 || !isNumeric(phoneNumber)) && phoneNumber !== "") {
      setError((e) => ({
        ...e,
        phoneNumber: phoneNumberErrorMessage
      }));
    } else {
      setError((e) => ({ ...e, phoneNumber: phoneNumber === "" ? undefined : "" }));
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (type !== "") {
      setError((e) => ({ ...e, type: "" }));
    }
  }, [type]);

  useEffect(() => {
    if (startDate !== null && !validateDate(Date.now(), startDate)) {
      setError((e) => ({ ...e, startDate: startDateErrorMessage }));
    } else {
      setError((e) => ({ ...e, startDate: startDate === null ? undefined : "" }));
    }
  }, [startDate]);

  useEffect(() => {
    if (workerName !== "") {
      setError((e) => ({ ...e, workerName: "" }));
    }
  }, [workerName]);

  function setValues() {
    setName("");
    setSurname("");
    setPhoneNumber("");
    setStartDate(null);
    setDisabled(true);
  }

  const togglePopup = () => {
    if (isOpen) {
      setValues();
    }
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();

  const onClick = () => {
    const hasError = Object.values(error).some((e) => !!e || e === undefined);

    if (hasError) {
      if (error.name === undefined) {
        setError((e) => ({ ...e, name: nameErrorMessage }));
      }
      if (error.phoneNumber === undefined) {
        setError((e) => ({ ...e, phoneNumber: phoneNumberErrorMessage }));
      }
      if (error.surname === undefined) {
        setError((e) => ({ ...e, surname: surnameErrorMessage }));
      }
      if (error.type === undefined) {
        setError((e) => ({ ...e, type: typeErrorMessage }));
      }
      if (error.workerName === undefined) {
        setError((e) => ({ ...e, workerName: workerErrorMessage }));
      }
      if (error.startDate === undefined) {
        setError((e) => ({ ...e, startDate: startDateErrorMessage }));
      }
    } else {
      const foundWorker = Workers.find((worker) => worker.userName === workerName);
      if (foundWorker === undefined) return;

      dispatch(add(foundWorker.id, name, surname, phoneNumber, startDate, type));
      togglePopup();
    }
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
    setStartDate(args.start.$d);
    setType(rooms[current]);
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
                  {error.name && <span className="text-red-500">{error.name}</span>}
                  <input
                    value={surname}
                    onChange={(event) => setSurname(event.target.value)}
                    className=" px-2 h-7 rounded-3xl bg-popup text-secondary border border-transparent outline-none focus:outline-none focus:border-accent"
                    placeholder="Surname"
                  />
                  {error.surname && <span className="text-red-500">{error.surname}</span>}
                  <input
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary border border-transparent outline-none focus:outline-none focus:border-accent"
                    placeholder="Phone Number"
                  />{" "}
                  {error.phoneNumber && <span className="text-red-500">{error.phoneNumber}</span>}
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <p className="text-secondary">Worker Information</p>
                  <h1 className="px-2 h-7 rounded-3xl bg-popup text-secondary select-none">
                    {type}
                  </h1>
                  <h1 className="px-2 h-7 rounded-3xl bg-popup text-secondary select-none">
                    {workerName}
                  </h1>
                  <DateSelector
                    handleDisable={isDisabled}
                    startDate={startDate}
                    now={now}
                    bannedDateList={mapToDates(Appointments, findWorkerId(Workers, workerName))}
                  />
                  {error.startDate && <span className="text-red-500">{error.startDate}</span>}
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
