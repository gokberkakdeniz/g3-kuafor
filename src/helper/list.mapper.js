export function mapToDates(list, workerId) {
  const filteredWorkers = list.filter((appointment) => appointment.workerId === workerId);
  const dates = filteredWorkers.map((appointment) => new Date(appointment.Date));
  return dates === undefined ? [] : dates;
}
