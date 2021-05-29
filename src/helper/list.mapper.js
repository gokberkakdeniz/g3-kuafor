import { compareDates } from "./comparor";

export function mapToDates(list, workerId) {
  const filteredWorkers = list.filter((appointment) => appointment.workerId === workerId);
  const dates = filteredWorkers.map((appointment) => new Date(appointment.Date));
  return dates === undefined ? [] : dates;
}

export function findWorkerId(list, workerName) {
  const found = list.find((worker) => worker.userName === workerName);
  if (found === undefined) return -1;
  return found.id;
}

function findWorker(workers, id) {
  const found = workers.find((worker) => worker.id === id);
  return found;
}

function mapWorkerToSpan(worker, bannedIds, type) {
  const found = bannedIds.find((id) => id === worker.id);
  if (found !== undefined) return null;
  if (!worker.type.includes(type)) return null;
  return (
    <>
      <span className="text-black text-sm">{worker.userName}</span>
      <br />
    </>
  );
}

export function mapToSpan(args) {
  const bannedTimes = args.appointments.filter((appointment) =>
    compareDates(appointment.Date, args.date)
  );
  const bannedIds = bannedTimes.map((appointment) => appointment.workerId);
  return args.workers.map((worker) => mapWorkerToSpan(worker, bannedIds, args.type));
}

export function mapToSpanEmployee(args) {
  const bannedAppointment = args.appointments.find(
    (appointment) =>
      compareDates(appointment.Date, args.date) &&
      appointment.workerId === args.workerId &&
      appointment.RoomType === args.type
  );
  let passed;
  if (new Date().getTime() > args.date) passed = "Passed";
  if (bannedAppointment === undefined)
    return (
      <>
        <span className="text-black text-sm">{passed || "Free"}</span>
        <br />
      </>
    );
  return (
    <>
      <span className="text-black text-sm">
        {`${bannedAppointment.Name} ${bannedAppointment.Surname}`}
        {passed ? (
          <>
            <br /> {passed}
          </>
        ) : (
          ""
        )}
      </span>
      <br />
    </>
  );
}
