import React, { useMemo, useState } from "react";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { useHistory, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Workers from "../../store/employees";
import NotFound from "../NotFound";
import { mapToSpanEmployee, mapToDates, findWorkerId } from "../../helper";
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
  const [child, setChild] = useState();
  const [isDisabled, setDisabled] = useState(false);
  const [isDisabledButton, setDisabledButton] = useState(false);
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

  const updateButton = (
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
  );

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
    setStartDate(args.start.$d);
    console.log(args.start.$d);
    setType(worker.type);
    if (event.target.textContent.includes("Free")) {
      setDisabled(true);
      setChild(createButton);
    } else {
      setDisabledButton(true);
      const Name = event.target.textContent.split(" ")[0];
      const Surname = event.target.textContent.split(" ")[1];
      setName(Name);
      setSurname(Surname);
      const app = Appointments.find(
        (appo) => appo.Name === Name && appo.Surname === Surname && appo.Date === args.start.$d
      );
      setId(app.id);
      setPhoneNumber(app.PhoneNumber);
      setChild(updateButton);
    }
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
  const handleClick = () => {
    console.log(phoneNumber, "zaaaButton");
    const result = validateAppointment(phoneNumber, now, startDate);
    if (!result) return;
    dispatch(add(id, name, surname, phoneNumber, startDate, type));
    togglePopup();
  };
  console.log(phoneNumber, "zaaaBody");
  const createButton = (
    <Button
      type="submit"
      onClick={() => handleClick()}
      className="bg-accent flex-col absolute bottom-5 w-24 h-12 rounded-3xl right-5">
      Create
    </Button>
  );
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
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary"
                    placeholder="Name"
                  />
                  <input
                    disabled={isDisabledButton}
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
                    placeholder={Array.isArray(worker.type) ? "Type" : worker.type}
                    values={worker.type}
                    onChange={handeSelect}
                  />
                  <ComboBox
                    className="px-2 h-7 rounded-3xl bg-popup text-secondary"
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
                {child}
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
