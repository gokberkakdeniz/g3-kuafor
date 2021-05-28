export function mapToDates(list) {
  const dates = list.map((appointment) => new Date(appointment.Date));
  return dates === undefined ? [] : dates;
}
