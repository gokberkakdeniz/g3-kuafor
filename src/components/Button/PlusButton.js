/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import DatePicker from "react-datepicker";
import Popup from "../Popup";
import Button from "./Button";
import "react-datepicker/dist/react-datepicker.css";
import ComboBox from "../ComboBox";
import Users from "../../store/employees";

const PlusButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const [filteredUser, setFilteredSelect] = useState([]);
  const handeSelect = () => {
    setFilteredSelect(Users.filter((user) => user.type === "man"));
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
                <div>
                  <p className="text-secondary">Appointment Information</p>
                  <input className="px-2 rounded-3xl bg-popup text-secondary" placeholder="Name" />
                  <input
                    className=" px-2 rounded-3xl bg-popup text-secondary"
                    placeholder="Surname"
                  />
                  <input
                    className="px-2 rounded-3xl bg-popup text-secondary"
                    placeholder="Phone Number"
                  />
                </div>
                <div>
                  <p className="text-secondary">Worker Information</p>
                  <ComboBox
                    className="px-2 rounded-3xl bg-popup text-secondary"
                    placeholder="Type"
                    values={["man", "woman", "beauty"]}
                    onClick={handeSelect}
                  />
                  <ComboBox
                    className="px-2 rounded-3xl bg-popup text-secondary"
                    placeholder="Type"
                    values={filteredUser.map((user) => user.userName)}
                    onClick={handeSelect}
                  />
                  <DatePicker
                    className="px-2 rounded-3xl bg-popup text-secondary"
                    showTimeSelect
                    dateFormat="Pp"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <Button className="bg-accent flex-col absolute bottom-5 w-24 h-12 rounded-3xl right-5">
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
