import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import clsx from "clsx";
import { Popup, Button, BackButton, DateSelector, ComboBox } from "../../components";
import Workers from "../../store/employees";
import { parseToFormat, parseToHour, mapToDates } from "../../helper";
import { NEW, DONE, cancelAppointment, updateAppointment } from "../../store/appointment";
import "react-datepicker/dist/react-datepicker.css";
import { validateAppointment } from "../../validator";

const Search = () => {
  const nowDate = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const searchWord = useSelector((state) => state.searchKey);
  const arrayAppoint = useSelector((state) => state.adder.appointments || []);

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

  function toValue(value) {
    return value === null ? "" : value.toLowerCase();
  }

  function checkSubNames(appointment, word, worker) {
    const splitted = word.split(" ");
    return (
      (appointment.Name.toLocaleLowerCase().includes(toValue(splitted[0])) &&
        appointment.Surname.toLocaleLowerCase().includes(toValue(splitted[1]))) ||
      worker.userName.toLocaleLowerCase().includes(toValue(word))
    );
  }

  function checkValue(appointment, word) {
    const worker = findWorker(appointment.workerId, "");
    // eslint-disable-next-line prettier/prettier
    return ( word.includes(" ") ? checkSubNames(appointment,word,worker) : false || 
          appointment.Name.toLocaleLowerCase().includes(toValue(word)) ||
          appointment.Surname.toLocaleLowerCase().includes(toValue(word)) ||
          // eslint-disable-next-line prettier/prettier
      worker.userName.toLocaleLowerCase().includes(toValue(word))
    );
  }

  return (
    <>
      <BackButton onClick={handleClick}>
        <IoArrowBack color="#e6e6e6" size="2em" />
      </BackButton>
      <div className="flex space-x-48 h-5/6 justify-center">
        <div className="w-1/6 rounded-3xl p-2 bg-header">
          <div className="scrollbar--gray text-xs overflow-y-auto overflow-x-hidden flex flex-col w-full items-center h-full bg-transparent">
            {arrayAppoint.map(
              (appointment) =>
                new Date(appointment.Date) > new Date() &&
                checkValue(appointment, searchWord) && (
                  <Button
                    className="w-5/6 p-2"
                    id={appointment.id}
                    type="button"
                    onClick={togglePopup}>
                    <div id={appointment.id} className="w-full inline-block">
                      <div id={appointment.id} className="text-left inline float-left">
                        <span id={appointment.id} className="text-secondary">
                          {dayjs(appointment.Date).format("DD.MM.YYYY")}
                        </span>
                      </div>
                      <div id={appointment.id} className="text-right inline float-right">
                        <span id={appointment.id} className="text-secondary">{`${dayjs(
                          appointment.Date
                        ).format("HH:mm")} - ${dayjs(appointment.Date)
                          .add(30, "minutes")
                          .format("HH:mm")}`}</span>
                      </div>
                    </div>

                    <br />
                    <span
                      id={appointment.id}
                      className="text-secondary">{`${appointment.Name} ${appointment.Surname}`}</span>
                    <br />
                    <span id={appointment.id} className="text-secondary">
                      {findWorker(appointment.workerId, "").userName}
                    </span>
                  </Button>
                )
            )}
          </div>
        </div>
        <div className="w-1/6 rounded-3xl p-2 bg-header">
          <div className="scrollbar--gray text-xs overflow-y-auto overflow-x-hidden flex flex-col w-full items-center h-full bg-transparent">
            {Workers.map(
              (worker) =>
                worker.userName.toLowerCase().includes(toValue(searchWord)) && (
                  <Link to={`/employees/${worker.id}`}>
                    {" "}
                    <h1 key={worker.userName} className=" text-secondary p-2">
                      {worker.userName}
                    </h1>
                  </Link>
                )
            )}
          </div>
        </div>
        <div className="w-1/6rounded-3xl p-2 bg-header">
          <div className="scrollbar--gray text-xs overflow-y-auto overflow-x-hidden flex flex-col w-full items-center h-full bg-transparent">
            {arrayAppoint.map(
              (appointment) =>
                new Date(appointment.Date) < new Date() &&
                checkValue(appointment, searchWord) && (
                  <div className=" text-secondary p-2">
                    {dayjs(appointment.Date).format("DD.MM.YYYY - HH:mm")}
                    <br />
                    {`${appointment.Name} ${appointment.Surname}`}
                    <br />
                    {findWorker(appointment.workerId).userName}
                  </div>
                )
            )}
          </div>
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
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary border border-transparent outline-none focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <p className="text-secondary">Worker Information</p>
                  <ComboBox
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary"
                    placeholder={type}
                    values={[
                      "Man Hairdresser",
                      "Woman Hairdresser",
                      "Laser",
                      "Skin Care",
                      "Beauty Center"
                    ]}
                    onChange={handeSelect}
                  />
                  <ComboBox
                    className={clsx(
                      "px-2 h-7 rounded-3xl bg-popup",
                      filteredUser.length === 0 ? "text-gray-400" : "text-secondary"
                    )}
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
