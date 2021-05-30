import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import clsx from "clsx";
import { Popup, Button, BackButton, DateSelector, ComboBox, Title } from "../../components";
import Workers from "../../store/employees";
import { mapToDates } from "../../helper";
import { cancelAppointment, updateAppointment } from "../../store/appointment";
import "react-datepicker/dist/react-datepicker.css";
import { isNumeric, validateDate } from "../../validator";

const nameErrorMessage = "Name must be at least 2 characters.";
const surnameErrorMessage = "Surname must be at least 2 characters.";
const phoneNumberErrorMessage = "Phone number must be 10 digit number.";
const typeErrorMessage = "Type must be selected";
const workerErrorMessage = "Worker must be selected";
const startDateErrorMessage = "Date cannot be in the past.";

const Search = () => {
  const nowDate = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const searchWord = useSelector((state) => state.searchKey);
  const arrayAppoint = useSelector((state) => state.adder.appointments || []);

  const [startDate, setStartDate] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("");
  const [appointmentId, setId] = useState(0);
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
    setStartDate(null);
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
      const foundWorker = findWorker(-1, workerName);
      if (foundWorker === undefined) return;
      dispatch(updateAppointment(appointmentId, foundWorker.id, phoneNumber, startDate, type));
      togglePopup();
    }
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
      <div className="pt-8 flex flex-col pb-8 xl:flex-row space-y-4 xl:space-x-24 xl:space-y-0 xl:h-5/6 justify-center">
        <div className="xl:w-1/4 w-full rounded-3xl p-2 bg-header pb-16">
          <div className="text-xl font-bold text-center text-black font-serif p-4 pb-2 border-b border-black">
            Appointments
          </div>
          <div className="scrollbar--gray my-1 text-xs overflow-y-auto overflow-x-hidden flex flex-col w-full items-center h-full bg-transparent">
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
        <div className="xl:w-1/4 w-full rounded-3xl p-2 bg-header pb-16">
          <div className="text-xl font-bold text-center text-black font-serif p-4 pb-2 border-b border-black">
            Employees Employees
          </div>
          <div className="scrollbar--gray my-1 text-xs overflow-y-auto overflow-x-hidden flex flex-col w-full items-center h-full bg-transparent">
            {Workers.map(
              (worker) =>
                worker.userName.toLowerCase().includes(toValue(searchWord)) && (
                  <Link to={`/employees/${worker.id}`}>
                    <h1 key={worker.userName} className=" text-secondary p-2">
                      {worker.userName}
                    </h1>
                  </Link>
                )
            )}
          </div>
        </div>
        <div className="xl:w-1/4 w-full rounded-3xl p-2 bg-header  pb-16">
          <div className="text-xl font-bold text-center text-black font-serif m-4 pb-2 border-b border-black">
            Past Appointments
          </div>
          <div className="scrollbar--gray my-1 text-xs overflow-y-auto overflow-x-hidden flex flex-col w-full items-center h-full bg-transparent">
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
                  <h1 className="px-2 h-7 rounded-3xl bg-popup text-secondary select-none">
                    {name}
                  </h1>
                  <h1 className=" px-2 h-7 rounded-3xl bg-popup text-secondary select-none">
                    {surname}
                  </h1>
                  <input
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary border border-transparent outline-none focus:outline-none focus:border-accent"
                  />
                  {error.phoneNumber && <span className="text-red-500">{error.phoneNumber}</span>}
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
                  {error.type && <span className="text-red-500">{error.type}</span>}

                  <ComboBox
                    className={clsx(
                      "px-2 h-7 rounded-3xl bg-popup",
                      filteredUser.length === 0 ? "text-gray-400" : "text-secondary"
                    )}
                    placeholder={workerName}
                    values={filteredUser.map((user) => user.userName)}
                    onChange={(event) => setWorkerName(event.target.value)}
                  />
                  {error.workerName && <span className="text-red-500">{error.workerName}</span>}

                  <DateSelector
                    handleDate={(date) => setStartDate(date)}
                    startDate={startDate}
                    now={nowDate}
                    bannedDateList={mapToDates(arrayAppoint)}
                  />
                  {error.startDate && <span className="text-red-500">{error.startDate}</span>}
                </div>
                <Button
                  type="submit"
                  onClick={onClick}
                  className="bg-accent flex-col absolute bottom-5 w-24 h-10 rounded-3xl right-5 justify-center items-center leading-10 text-white">
                  Update
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  className="bg-cancel flex-col absolute bottom-5 w-24 h-10 rounded-3xl left-5 justify-center items-center leading-10 text-white">
                  Remove
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
