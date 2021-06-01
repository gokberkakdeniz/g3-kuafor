import React, { useEffect, useMemo, useState } from "react";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { useHistory, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import Workers from "../../store/employees";
import NotFound from "../NotFound";
import { mapToSpanEmployee, mapToDates, findWorkerId, compareDates } from "../../helper";
import { isNumeric, validateDate } from "../../validator";
import { add, cancelAppointment, updateAppointment } from "../../store/appointment";

import {
  BackButton,
  WeeklySchedule,
  Popup,
  DateSelector,
  Button,
  ComboBox
} from "../../components";

const nameErrorMessage = "Name must be at least 2 characters.";
const surnameErrorMessage = "Surname must be at least 2 characters.";
const phoneNumberErrorMessage = "Phone number must be 10 digit number.";
const typeErrorMessage = "Type must be selected";
const workerErrorMessage = "Worker must be selected";
const startDateErrorMessage = "Date cannot be in the past.";

const EmployeeCalendar = () => {
  const now = new Date();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: idParam } = useParams();
  const Appointments = useSelector((state) => state.adder.appointments || []);
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("");
  const [appointmentId, setId] = useState(0);
  const [filteredUser, setFilteredSelect] = useState([]);
  const [isDisabled, setDisabled] = useState(false);
  const [isDisabledButton, setDisabledButton] = useState(false);
  const [isCreate, setCreate] = useState(true);
  const [error, setError] = useState({
    name: undefined,
    surname: undefined,
    phoneNumber: undefined,
    type: undefined,
    workerName: undefined,
    startDate: undefined
  });
  const id = Number(idParam);

  const handeSelect = (event) => {
    setType(event.target.value);
    setFilteredSelect(Workers.filter((user) => user.type.includes(event.target.value)));
  };
  function setValues() {
    setName("");
    setSurname("");
    setPhoneNumber("");
    setStartDate(null);
    setDisabled(false);
    setDisabledButton(false);
    setCreate(true);
  }

  const togglePopup = () => {
    if (isOpen) {
      setValues();
    }
    setIsOpen(!isOpen);
  };

  const handleCancel = () => {
    if (window.confirm("Do you really want to remove?")) {
      dispatch(cancelAppointment(appointmentId));
      togglePopup();
    }
  };
  const worker = useMemo(() => Workers.find((w) => w.id === id), [id]);

  function findWorker(idW, workername) {
    const workEr = Workers.find((workeR) => workeR.id === idW || workeR.userName === workername);
    return workEr;
  }

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

  const showAllErrors = () => {
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
  };

  const onClickUpdate = () => {
    const hasError = Object.values(error).some((e) => !!e || e === undefined);

    if (hasError) {
      showAllErrors();
    } else {
      const foundWorker = findWorker(-1, workerName);
      if (foundWorker === undefined) return;
      dispatch(updateAppointment(appointmentId, foundWorker.id, phoneNumber, startDate, type));
      window.alert("Appointment is updated successfully");
      togglePopup();
    }
  };
  const handleForward = () => {
    history.push(`/employees/${id + 1}`);
  };
  const handleBackward = () => {
    history.push(`/employees/${id - 1}`);
  };

  const handleSlotClick = (event, args) => {
    if (event.target.textContent.includes("-") || event.target.textContent.includes("Passed"))
      return;
    setWorkerName(worker?.userName);
    setType(Array.isArray(worker.type) ? "Type" : worker.type);
    setStartDate(args.start.$d);
    if (event.target.textContent.includes("Free")) {
      setDisabled(true);
    } else {
      setCreate(false);
      setDisabledButton(true);
      const index = event.target.textContent.indexOf(" ");
      const Name = event.target.textContent.substring(0, index).trim();
      const Surname = event.target.textContent.substring(index).trim();

      setName(Name);
      setSurname(Surname);
      try {
        const app = Appointments.filter(
          (appo) =>
            appo.workerId === id &&
            appo.Name.trim() === Name &&
            appo.Surname.trim() === Surname &&
            compareDates(appo.Date, args.start.$d)
        );
        setId(app[0].id);
        setType(app[0].RoomType);
        setPhoneNumber(app[0].PhoneNumber);
      } catch (err) {
        console.log(err);
      }
    }
    togglePopup();
  };
  const handleClick = () => {
    const hasError = Object.values(error).some((e) => !!e || e === undefined);

    if (hasError) {
      showAllErrors();
    } else {
      if (type.includes("Type")) return;
      dispatch(add(id, name, surname, phoneNumber, startDate, type));
      window.alert("Appointment is created successfully");
      togglePopup();
    }
  };

  const renderSlot = (args) => {
    return mapToSpanEmployee({
      date: args.start,
      workerId: worker?.id,
      appointments: Appointments,
      type: worker.type
    });
  };
  const handleWorkerSelect = (event) => {
    setWorkerName(event.target.value);
  };

  return worker ? (
    <div className="p-4">
      <div>
        {isOpen && (
          <Popup
            content={
              <>
                <div className="grid grid-cols-1 gap-2">
                  <p className="text-secondary">Appointment Information</p>
                  <input
                    disabled={isDisabledButton}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary border border-transparent outline-none focus:outline-none focus:border-accent"
                    placeholder="Name"
                  />
                  {error.name && <span className="text-red-500">{error.name}</span>}

                  <input
                    disabled={isDisabledButton}
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
                  />
                  {error.phoneNumber && <span className="text-red-500">{error.phoneNumber}</span>}
                </div>
                <div className="grid grid-cols-1 gap-2 pt-4">
                  <p className="text-secondary">Worker Information</p>
                  <ComboBox
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary"
                    placeholder={type}
                    values={worker.type}
                    onChange={handeSelect}
                  />
                  {error.type && <span className="text-red-500">{error.type}</span>}

                  <ComboBox
                    className={clsx(
                      "px-2 h-7 rounded-3xl bg-popup",
                      filteredUser.length === 0 ? "text-gray-400" : "text-secondary"
                    )}
                    disabled={isDisabled}
                    placeholder={workerName}
                    value={workerName}
                    values={filteredUser.map((user) => user.userName)}
                    onChange={handleWorkerSelect}
                  />
                  {error.workerName && <span className="text-red-500">{error.workerName}</span>}

                  <DateSelector
                    handleDisable={isDisabled}
                    startDate={startDate}
                    now={now}
                    bannedDateList={mapToDates(
                      Appointments,
                      findWorkerId(Workers, worker?.userName)
                    )}
                  />
                  {error.startDate && <span className="text-red-500">{error.startDate}</span>}
                </div>
                {isCreate ? (
                  <Button
                    type="submit"
                    onClick={handleClick}
                    className="bg-accent flex-col absolute bottom-5 w-24 h-10 rounded-3xl right-5 justify-center items-center leading-10 text-white">
                    Create
                  </Button>
                ) : (
                  <>
                    <Button
                      type="submit"
                      onClick={onClickUpdate}
                      className="bg-accent flex-col absolute bottom-5 w-24 h-10 rounded-3xl right-5 justify-center items-center leading-10 text-white">
                      Update
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancel}
                      className="bg-accent flex-col absolute bottom-5 w-24 h-10 rounded-3xl right-5 justify-center items-center leading-10 text-white">
                      Remove
                    </Button>
                  </>
                )}
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </div>
      <div className="ml-auto" style={{ display: "inline-block" }}>
        <Link to="/employees">
          <BackButton>
            <IoArrowBack color="#e6e6e6" size="2em" />
          </BackButton>
        </Link>
      </div>
      <div className="text-center text-2xl font-bold mb-4">{`${worker.userName}'s Schedule`}</div>
      <WeeklySchedule onClick={handleSlotClick} renderer={renderSlot} />
      <div className="fixed left-8 bottom-8">
        <div className="flex flex-row space-x-4 items-center mt-auto" style={{ width: "92.5rem" }}>
          <div>
            <BackButton onClick={handleBackward} disabled={Workers[0].id === id}>
              <IoArrowBack color="#e6e6e6" size="2em" />
            </BackButton>
          </div>
          <div className="w-40 flex justify-center">
            <span className="text-white">{worker?.userName}</span>
          </div>
          <div>
            <BackButton onClick={handleForward} disabled={Workers[Workers.length - 1].id === id}>
              <IoArrowForward color="#e6e6e6" size="2em" />
            </BackButton>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default EmployeeCalendar;
