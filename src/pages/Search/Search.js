import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Button, BackButton } from "../../components/Button";
import Workers from "../../store/employees";
import { parseToFormat, parseToHour, mapToDates } from "../../helper";
import { NEW, DONE, cancelAppointment, updateAppointment } from "../../store/appointment";
import "react-datepicker/dist/react-datepicker.css";
import Popup from "../../components/Popup";
import ComboBox from "../../components/ComboBox";
import DateSelector from "../../components/DateSelector";
import { validateAppointment } from "../../validator";

const Search = () => {
  const nowDate = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const searchWord = useSelector((state) => state.searchKey);
  const tempAppointments = useSelector((state) => state.adder.appointments);
  const arrayAppoint = tempAppointments === undefined ? [] : tempAppointments;

  const [startDate, setStartDate] = useState(nowDate);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("");
  const [appointmentId, setId] = useState(0);

  const [filteredUser, setFilteredSelect] = useState([]);
  const handleClick = () => {
    history.goBack();
  };

  function findWorker(id, workername) {
    const workEr = Workers.find((worker) => worker.id === id || worker.userName === workername);
    return workEr;
  }

  function findAppointment(id) {
    const found = arrayAppoint.find((appointment) => appointment.id === id);
    return found;
  }

  function setValues(id) {
    const appointment = findAppointment(id);

    if (appointment !== undefined) {
      setId(id);
      setName(appointment.Name);
      setSurname(appointment.Surname);
      setPhoneNumber(appointment.PhoneNumber);
      const worker = findWorker(parseInt(appointment.workerId, 10), "");
      setWorkerName(worker.userName);
      const appDate = new Date(appointment.Date);
      setStartDate(appDate);
      setType(appointment.RoomType);
    }
  }

  function setInitialValues() {
    setName("");
    setSurname("");
    setPhoneNumber("");
    setStartDate();
    setFilteredSelect([]);
  }

  const togglePopup = (event) => {
    if (!isOpen) {
      setValues(parseInt(event.target.id, 10));
    } else {
      setInitialValues();
    }
    setIsOpen(!isOpen);
  };

  const handeSelect = (event) => {
    setType(event.target.value);
    setFilteredSelect(Workers.filter((user) => user.type.includes(event.target.value)));
  };

  const onClick = () => {
    const foundWorker = findWorker(-1, workerName);
    if (foundWorker === undefined) return;
    const result = validateAppointment(phoneNumber, nowDate, startDate);
    if (!result) return;
    dispatch(updateAppointment(appointmentId, foundWorker.id, phoneNumber, startDate, type));
    togglePopup();
  };

  const handleCancel = () => {
    dispatch(cancelAppointment(appointmentId));
    togglePopup();
  };

  const handleDisabled = () => {};
  return (
    <>
      <BackButton onClick={handleClick}>
        <IoArrowBack color="#e6e6e6" size="2em" />
      </BackButton>
      <div className="flex space-x-48 h-5/6">
        <div className="text-xs overflow-y-scroll flex flex-col items-center ml-40 w-1/6 h-full p-4 rounded-3xl px-3 bg-header items-center">
          {arrayAppoint.map(
            (appointment) =>
              appointment.Type === NEW &&
              appointment.Name.toLowerCase().includes(
                searchWord === null ? "" : searchWord.toLowerCase()
              ) && (
                <Button
                  className=" text-secondary p-2"
                  id={appointment.id}
                  type="button"
                  onClick={togglePopup}>
                  {`${parseToFormat(appointment.Date)}----------${parseToHour(appointment.Date)}`}
                  <br />
                  {`${appointment.Name} ${appointment.Surname}`}
                  <br />
                  {findWorker(appointment.workerId, "").userName}
                </Button>
              )
          )}
        </div>
        <div className="overflow-y-scroll flex flex-col items-center ml-40 w-1/6 h-full p-4 rounded-3xl px-3 bg-header items-center">
          {Workers.map(
            (worker) =>
              worker.userName
                .toLowerCase()
                .includes(searchWord === null ? "" : searchWord.toLowerCase()) && (
                <h1 key={worker.userName} className=" text-secondary p-2">
                  {worker.userName}
                </h1>
              )
          )}
        </div>
        <div className="text-xs overflow-y-scroll flex flex-col items-center ml-40 w-1/6 h-full p-4 rounded-3xl px-3 bg-header items-center">
          {arrayAppoint.map(
            (appointment) =>
              appointment.Type === DONE &&
              appointment.Name.toLowerCase().includes(
                searchWord === null ? "" : searchWord.toLowerCase()
              ) && (
                <div className=" text-secondary p-2">
                  {`${parseToFormat(appointment.Date)}----------${parseToHour(appointment.Date)}`}
                  <br />
                  {`${appointment.Name} ${appointment.Surname}`}
                  <br />
                  {findWorker(appointment.workerId, "").userName}
                </div>
              )
          )}
        </div>
      </div>
      <div>
        {isOpen && (
          <Popup
            content={
              <>
                <div className="grid grid-cols-1 gap-2">
                  <p className="text-secondary">Appointment Information</p>
                  <h1 className="px-2 h-7 rounded-3xl bg-popup text-secondary">{name}</h1>
                  <h1 className=" px-2 h-7 rounded-3xl bg-popup text-secondary">{surname}</h1>
                  <input
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <p className="text-secondary">Worker Information</p>
                  <ComboBox
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary"
                    placeholder={type}
                    values={["Man Hairdresser", "Woman Hairdresser", "Laser", "Skin Care"]}
                    onChange={handeSelect}
                  />
                  <ComboBox
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary"
                    placeholder={workerName}
                    values={filteredUser.map((user) => user.userName)}
                    onChange={(event) => setWorkerName(event.target.value)}
                  />
                  <DateSelector
                    handleDate={(date) => setStartDate(date)}
                    startDate={startDate}
                    now={nowDate}
                    bannedDateList={mapToDates(arrayAppoint)}
                  />
                </div>
                <Button
                  type="submit"
                  onClick={onClick}
                  className="bg-accent flex-col absolute bottom-5 w-24 h-12 rounded-3xl right-5">
                  Update
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  className="bg-cancel flex-col absolute bottom-5 w-24 h-12 rounded-3xl left-5">
                  Cancel
                </Button>
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </div>
    </>
  );
};

export default Search;
