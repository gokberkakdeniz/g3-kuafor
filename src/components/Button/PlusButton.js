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
// state.push ta sıkıntı var
const PlusButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("");
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const [filteredUser, setFilteredSelect] = useState([]);
  const handeSelect = (event) => {
    setType(event.target.value);
    setFilteredSelect(Workers.filter((user) => user.type === event.target.value));
  };
  const adder = useSelector((state) => state.adder);
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(add({ workerId: 1, date: startDate, room: type, userId: 1 }));
  };
  const nameChange = (event) => {
    setName(event.target.value);
  };
  const surnameChange = (event) => {
    setSurname(event.target.value);
  };
  const phoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const workerChange = (event) => {
    setWorkerName(event.target.value);
  };
  return (
    <div
      style={{ bottom: "0", right: "0" }}
      className="absolute ml-auto py-3 px-3 flex flex-col space-y-2 justify-center items-center">
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
                    onChange={nameChange}
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary"
                    placeholder="Name"
                  />
                  <input
                    onChange={surnameChange}
                    className=" px-2 h-7 rounded-3xl bg-popup text-secondary"
                    placeholder="Surname"
                  />
                  <input
                    onChange={phoneChange}
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <p className="text-secondary">Worker Information</p>
                  <ComboBox
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary"
                    placeholder="Type"
                    values={["man", "woman", "beauty"]}
                    onChange={handeSelect}
                  />
                  <ComboBox
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary"
                    placeholder="Worker"
                    values={filteredUser.map((user) => user.userName)}
                    onChange={workerChange}
                  />
                  <DatePicker
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary"
                    showTimeSelect
                    dateFormat="Pp"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <Button
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
