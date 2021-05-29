import { useSelector } from "react-redux";
import { compareDates } from "./comparor";

export function mapToDates(list, workerId) {
  const filteredWorkers = list.filter((appointment) => appointment.workerId === workerId);
  const dates = filteredWorkers.map((appointment) => new Date(appointment.Date));
  return dates === undefined ? [] : dates;
}

function findWorker(workers, id) {
  const found = workers.find((worker) => worker.id === id);
  return found;
}

function mapWorkerToSpan(worker, bannedIds, type) {
  const found = bannedIds.find((id) => id === worker.id);
  if (found !== undefined) return null;
  if (!type.includes(worker.type)) return null;
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
