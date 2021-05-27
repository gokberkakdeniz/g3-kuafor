export function parseToFormat(date) {
  const temp = String(date).split("T");
  return temp[0];
}

export function parseToHour(date) {
  const temp = String(date).split("T");
  const hour = String(temp[1]).split("Z");
  const numbers = String(hour[0]).split(":");
  return `${numbers[0]}:${numbers[1]}`;
}
