/* eslint-disable prefer-const */
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

function mapWorkerToSpan(worker, bannedIds, type, date, isLaser, man, woman) {
  const found = bannedIds.find((id) => id === worker.id);
  if (found !== undefined) return null;
  if (isLaser > 0 && ["Laser", "Skin Care"].includes(type) && bannedIds.length > 0) return null;
  if (type === "Woman Hairdresser" && woman > 6) return null;
  if (type === "Man Hairdresser" && man > 5) return null;
  if (!Array.isArray(worker.type) && !worker.type.includes(type)) return null;
  const isHoverable = new Date() > new Date(date) ? "" : "hover:bg-gray-300";
  const ClassName = `text-black text-sm ${isHoverable}`;
  return (
    <>
      <span className={ClassName}>{worker.userName}</span>
      <br />
    </>
  );
}

function increaseLaser(laserSkin, type) {
  const val = ["Laser", "Skin Care"].includes(type) ? 1 : 0;
  const temp = laserSkin + val;
  return temp;
}

function giveNumber(val, wanted) {
  if (val === undefined) return 0;
  return val.includes(wanted) ? 1 : 0;
}

export function mapToSpan(args) {
  // eslint-disable-next-line prefer-const
  let laserSkin = 0;
  // eslint-disable-next-line prefer-const
  let bannedTimes = [];
  let man = 0;
  let woman = 0;
  const tempList = args.appointments || [];
  for (let i = 0; i < tempList.length; i += 1) {
    if (compareDates(tempList[i].Date, args.date)) {
      laserSkin = increaseLaser(laserSkin, tempList[i].RoomType);
      man += tempList[i].RoomType.includes("Man Hairdresser")
        ? 1 + giveNumber(tempList[i].Type, "NEW")
        : 0;
      woman += tempList[i].RoomType.includes("Woman Hairdresser")
        ? 1 + giveNumber(tempList[i].Type, "DONE")
        : 0;
      bannedTimes.push(tempList[i]);
    }
  }

  const bannedIds = bannedTimes.map((appointment) => appointment.workerId);
  return args.workers.map((worker) =>
    mapWorkerToSpan(worker, bannedIds, args.type, args.date, laserSkin, man, woman)
  );
}

export function mapToSpanEmployee(args) {
  const bannedAppointment = args.appointments.find(
    (appointment) =>
      compareDates(appointment.Date, args.date) &&
      appointment.workerId === args.workerId &&
      args.type.includes(appointment.RoomType)
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
            <br />
            {passed}
          </>
        ) : (
          ""
        )}
      </span>
      <br />
    </>
  );
}
