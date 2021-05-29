/* eslint-disable react/button-has-type */
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import DatePicker from "react-datepicker";
import { add } from "../../store/appointment";
import Popup from "../Popup";
import Button from "./Button";
import "react-datepicker/dist/react-datepicker.css";
import ComboBox from "../ComboBox";
import Workers from "../../store/employees";
import DateSelector from "../DateSelector";
import { mapToDates } from "../../helper";
import { validateAppointment } from "../../validator";

const PlusButton = () => {
  const now = new Date();
  // eslint-disable-next-line prefer-const
  let afterThreeMonts = new Date();
  afterThreeMonts.setDate(afterThreeMonts.getDay() + 90);
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
    setFilteredSelect([]);
    setDisabled(true);
  }

  const togglePopup = () => {
    if (isOpen) {
      setValues();
    }
    setIsOpen(!isOpen);
  };
  const [filteredUser, setFilteredSelect] = useState([]);
  const handeSelect = (event) => {
    setType(event.target.value);
    setFilteredSelect(Workers.filter((user) => user.type.includes(event.target.value)));
  };

  const dispatch = useDispatch();
  const onClick = () => {
    const foundWorker = Workers.find((worker) => worker.userName === workerName);
    if (foundWorker === undefined) return;
    const result = validateAppointment(phoneNumber, now, startDate);
    if (!result) return;
    dispatch(add(foundWorker.id, name, surname, phoneNumber, startDate, type));
    togglePopup();
  };
  const tempAppointments = useSelector((state) => state.adder.appointments);
  const arrayAppoint = tempAppointments === undefined ? [] : tempAppointments;

  const handleWorkerSelect = (event) => {
    setDisabled(false);
    setWorkerName(event.target.value);
  };

  function findWorkerId() {
    const found = Workers.find((worker) => worker.userName === workerName);
    if (found === undefined) return -1;
    return found.id;
  }

  return (
    <div className="bottom-0 right-0 absolute ml-auto py-3 px-3 flex flex-col space-y-2 justify-center items-center">
      <Button
        onClick={togglePopup}
        className="flex flex-col items-center bg-accent w-12 h-12 rounded-3xl justify-center"
        type="button">
        <BsPlus color="#e6e6e6" size="2em" />
      </Button>
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
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary"
                    placeholder="Name"
                  />
                  <input
                    value={surname}
                    onChange={(event) => setSurname(event.target.value)}
                    className=" px-2 h-7 rounded-3xl bg-popup text-secondary"
                    placeholder="Surname"
                  />
                  <input
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <p className="text-secondary">Worker Information</p>
                  <ComboBox
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary"
                    placeholder="Type"
                    values={["Man Hairdresser", "Woman Hairdresser", "Laser", "Skin Care"]}
                    onChange={handeSelect}
                  />
                  <ComboBox
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary"
                    placeholder="Worker"
                    value={workerName}
                    values={filteredUser.map((user) => user.userName)}
                    onChange={handleWorkerSelect}
                  />
                  <DateSelector
                    handleDisable={isDisabled}
                    handleDate={(date) => setStartDate(date)}
                    startDate={startDate}
                    now={now}
                    bannedDateList={mapToDates(arrayAppoint, findWorkerId())}
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
    </div>
  );
};

export default PlusButton;
