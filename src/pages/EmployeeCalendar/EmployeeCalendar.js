import React, { useMemo, useState } from "react";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { useHistory, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import Workers from "../../store/employees";
import NotFound from "../NotFound";
import { mapToSpanEmployee, mapToDates, findWorkerId, compareDates } from "../../helper";
import { validateAppointment } from "../../validator";
import { add, cancelAppointment, updateAppointment } from "../../store/appointment";

import {
  BackButton,
  WeeklySchedule,
  Popup,
  DateSelector,
  Button,
  ComboBox
} from "../../components";

const EmployeeCalendar = () => {
  const now = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(now);
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

  const handeSelect = (event) => {
    setType(event.target.value);
    setFilteredSelect(Workers.filter((user) => user.type.includes(event.target.value)));
  };
  function setValues() {
    setName("");
    setSurname("");
    setPhoneNumber("");
    setStartDate(now);
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

  const dispatch = useDispatch();

  const Appointments = useSelector((state) => state.adder.appointments || []);

  const { id: idParam } = useParams();
  const id = Number(idParam);
  const handleCancel = () => {
    dispatch(cancelAppointment(appointmentId));
    togglePopup();
  };
  const history = useHistory();
  const worker = useMemo(() => Workers.find((w) => w.id === id), [id]);

  function findWorker(idW, workername) {
    const workEr = Workers.find((workeR) => workeR.id === idW || workeR.userName === workername);
    return workEr;
  }

  const onClickUpdate = () => {
    const foundWorker = findWorker(-1, workerName);
    if (foundWorker === undefined) return;
    const result = validateAppointment(phoneNumber, now, startDate);
    if (!result) return;
    dispatch(updateAppointment(appointmentId, foundWorker.id, phoneNumber, startDate, type));
    togglePopup();
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
    setType(worker.type);
    setStartDate(args.start.$d);
    if (event.target.textContent.includes("Free")) {
      setDisabled(true);
    } else {
      setCreate(false);
      setDisabledButton(true);
      const index = event.target.textContent.indexOf(" ");
      const Name = event.target.textContent.substring(0, index).trim();
      const Surname = event.target.textContent.substring(index).trim();
      console.log(Name, Surname);
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
        setPhoneNumber(app[0].PhoneNumber);
      } catch (err) {
        console.log(err);
      }
    }
    togglePopup();
  };
  const handleClick = () => {
    const result = validateAppointment(phoneNumber, now, startDate);
    if (!result) return;
    dispatch(add(id, name, surname, phoneNumber, startDate, type));
    togglePopup();
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
                  <input
                    disabled={isDisabledButton}
                    value={surname}
                    onChange={(event) => setSurname(event.target.value)}
                    className=" px-2 h-7 rounded-3xl bg-popup text-secondary border border-transparent outline-none focus:outline-none focus:border-accent"
                    placeholder="Surname"
                  />
                  <input
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary border border-transparent outline-none focus:outline-none focus:border-accent"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <p className="text-secondary">Worker Information</p>
                  <ComboBox
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary"
                    placeholder={Array.isArray(worker.type) ? "Type" : worker.type}
                    values={worker.type}
                    onChange={handeSelect}
                  />
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
                  <DateSelector
                    handleDisable={isDisabled}
                    startDate={startDate}
                    now={now}
                    bannedDateList={mapToDates(
                      Appointments,
                      findWorkerId(Workers, worker?.userName)
                    )}
                  />
                </div>
                {isCreate ? (
                  <Button
                    type="submit"
                    onClick={handleClick}
                    className="bg-accent flex-col absolute bottom-5 w-24 h-12 rounded-3xl right-5">
                    Create
                  </Button>
                ) : (
                  <>
                    <Button
                      type="submit"
                      onClick={onClickUpdate}
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
      <div className="absolute left-8 bottom-8">
        <div className="flex flex-row space-x-4 items-center mt-auto" style={{ width: "92.5rem" }}>
          <div>
            <BackButton onClick={handleBackward} disabled={Workers[0].id === id}>
              <IoArrowBack color="#e6e6e6" size="2em" />
            </BackButton>
          </div>
          <div className="w-40 flex justify-center">
            <span className="">{worker?.userName}</span>
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
