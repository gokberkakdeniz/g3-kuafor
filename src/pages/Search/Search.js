import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import Fade from "react-reveal/Fade";
import { Button, BackButton } from "../../components/Button";
import Workers from "../../store/employees";
import { parseToFormat, parseToHour } from "../../helper";
import { NEW, DONE, add } from "../../store/appointment";
import "react-datepicker/dist/react-datepicker.css";
import Popup from "../../components/Popup";
import ComboBox from "../../components/ComboBox";

const Search = () => {
  const now = new Date();
  // eslint-disable-next-line prefer-const
  let afterThreeMonts = new Date();
  afterThreeMonts.setDate(afterThreeMonts.getDay() + 90);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const searchWord = useSelector((state) => state.searchKey);
  const handleClick = () => {
    history.goBack();
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const [startDate, setStartDate] = useState(now);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("");

  const [filteredUser, setFilteredSelect] = useState([]);
  const handeSelect = (event) => {
    setType(event.target.value);
    setFilteredSelect(Workers.filter((user) => user.type === event.target.value));
  };

  const dispatch = useDispatch();
  const onClick = () => {
    console.log(String(startDate));
    const foundWorker = Workers.find((worker) => worker.userName === workerName);
    if (foundWorker === undefined) return;
    dispatch(add(foundWorker.id, name, surname, phoneNumber, startDate, type));
  };
  const arrayAppoint = useSelector((state) => state.adder.appointments);

  return (
    <Fade top duration={250}>
      <div className="h-full">
        <BackButton onClick={handleClick}>
          <IoArrowBack color="#e6e6e6" size="2em" />
        </BackButton>
        <div className="flex space-x-48 h-5/6">
          <div className="text-xs overflow-y-scroll grid grid-cols-1 flex-col place-items-center ml-40 w-1/6 h-full space-y-8 rounded-3xl px-3 bg-header items-center">
            {arrayAppoint.map(
              (appointment) =>
                appointment.Type === NEW &&
                appointment.Name.toLowerCase().includes(
                  searchWord === null ? "" : searchWord.toLowerCase()
                ) && (
                  <button type="button" onClick={togglePopup}>
                    <h1 key={appointment.id} className=" text-secondary">
                      {`${parseToFormat(appointment.Date)}----------${parseToHour(
                        appointment.Date
                      )}`}
                      <br />
                      {`${appointment.Name} ${appointment.Surname}`}
                      <br />
                      {Workers.filter((worker) => worker.id === appointment.workerId)[0].userName}
                    </h1>
                  </button>
                )
            )}
          </div>
          <div className="overflow-y-scroll grid grid-cols-1 flex-col place-items-center ml-40 w-1/6 h-full space-y-8 rounded-3xl px-3 bg-header items-center">
            {Workers.map(
              (worker) =>
                worker.userName
                  .toLowerCase()
                  .includes(searchWord === null ? "" : searchWord.toLowerCase()) && (
                  <h1 key={worker.userName} className=" text-secondary">
                    {worker.userName}
                  </h1>
                )
            )}
          </div>
          <div className="text-xs overflow-y-scroll grid grid-cols-1 flex-col place-items-center ml-40 w-1/6 h-full space-y-8 rounded-3xl px-3 bg-header items-center" />
        </div>
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
                      values={["man", "woman", "beauty"]}
                      onChange={handeSelect}
                    />
                    <ComboBox
                      className="px-2 h-7 rounded-3xl bg-popup text-secondary"
                      placeholder="Worker"
                      value={workerName}
                      values={filteredUser.map((user) => user.userName)}
                      onChange={(event) => setWorkerName(event.target.value)}
                    />
                    <DatePicker
                      className="px-2 h-7 rounded-3xl bg-popup text-secondary"
                      showTimeSelect
                      required
                      filterDate={(date) => !String(date).includes("Mo") && date < afterThreeMonts}
                      placeholderText="Date"
                      minDate={now}
                      dateFormat="Pp"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
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
    </Fade>
  );
};

export default Search;
