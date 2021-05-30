/* eslint-disable react/button-has-type */
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import clsx from "clsx";
import { add } from "../../store/appointment";
import Popup from "../Popup";
import Button from "./Button";
import "react-datepicker/dist/react-datepicker.css";
import ComboBox from "../ComboBox";
import Workers from "../../store/employees";
import DateSelector from "../DateSelector";
import { mapToDates, findWorkerId } from "../../helper";
import { isNumeric, validateDate } from "../../validator";

const nameErrorMessage = "Name must be at least 2 characters.";
const surnameErrorMessage = "Surname must be at least 2 characters.";
const phoneNumberErrorMessage = "Phone number must be 10 digit number.";
const typeErrorMessage = "Type must be selected";
const workerErrorMessage = "Worker must be selected";
const startDateErrorMessage = "Date cannot be in the past.";

const PlusButton = () => {
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

      dispatch(add(foundWorker.id, name.trim(), surname.trim(), phoneNumber, startDate, type));
      togglePopup();
    }
  };
  const arrayAppoint = useSelector((state) => state.adder.appointments || []);

  const handleWorkerSelect = (event) => {
    setDisabled(false);
    setWorkerName(event.target.value);
  };

  return (
    <div className="bottom-0 right-0 fixed ml-auto py-3 px-3 flex flex-col space-y-2 justify-center items-center">
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
                    className={clsx(
                      "px-2 h-7 rounded-3xl bg-popup text-secondary border outline-none focus:outline-none",
                      error.name
                        ? "border-red-600 focus:border-red-600"
                        : "border-transparent focus:border-accent"
                    )}
                    placeholder="Name"
                  />
                  {error.name && <span className="text-red-500">{error.name}</span>}

                  <input
                    value={surname}
                    onChange={(event) => setSurname(event.target.value)}
                    className={clsx(
                      "px-2 h-7 rounded-3xl bg-popup text-secondary border outline-none focus:outline-none",
                      error.surname
                        ? "border-red-600 focus:border-red-600"
                        : "border-transparent focus:border-accent"
                    )}
                    placeholder="Surname"
                  />
                  {error.surname && <span className="text-red-500">{error.surname}</span>}

                  <input
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    className={clsx(
                      "px-2 h-7 rounded-3xl bg-popup text-secondary border outline-none focus:outline-none",
                      error.phoneNumber
                        ? "border-red-600 focus:border-red-600"
                        : "border-transparent focus:border-accent"
                    )}
                    placeholder="Phone Number"
                  />
                  {error.phoneNumber && <span className="text-red-500">{error.phoneNumber}</span>}
                </div>
                <div className="grid grid-cols-1 gap-2 pt-4">
                  <p className="text-secondary">Worker Information</p>
                  <ComboBox
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary"
                    placeholder="Type"
                    values={[
                      "Man Hairdresser",
                      "Woman Hairdresser",
                      "Laser",
                      "Skin Care",
                      "Beauty Center"
                    ]}
                    onChange={handeSelect}
                  />
                  {error.type && <span className="text-red-500">{error.type}</span>}

                  <ComboBox
                    className={clsx(
                      "px-2 h-7 rounded-3xl bg-popup",
                      filteredUser.length === 0 ? "text-gray-400" : "text-secondary"
                    )}
                    placeholder="Worker"
                    value={workerName}
                    disabled={filteredUser.length === 0}
                    values={filteredUser.map((user) => user.userName)}
                    onChange={handleWorkerSelect}
                  />
                  {error.workerName && <span className="text-red-500">{error.workerName}</span>}

                  <DateSelector
                    handleDisable={isDisabled}
                    handleDate={(date) => setStartDate(date)}
                    startDate={startDate}
                    now={now}
                    bannedDateList={mapToDates(arrayAppoint, findWorkerId(Workers, workerName))}
                  />
                  {error.startDate && <span className="text-red-500">{error.startDate}</span>}
                </div>
                <Button
                  type="submit"
                  onClick={onClick}
                  className="bg-accent flex-col absolute bottom-5 w-24 h-10 rounded-3xl right-5 justify-center items-center leading-10 text-white">
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
