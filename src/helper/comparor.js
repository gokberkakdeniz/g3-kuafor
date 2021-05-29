export function compareDates(src, dst) {
  const tempSrc = new Date(src);
  const tempDst = new Date(dst);
  const hours = tempSrc.getHours();
  const minutes = tempSrc.getMinutes();
  const month = tempSrc.getMonth();
  const day = tempSrc.getDay();
  return (
    tempDst.getMonth() === month &&
    tempDst.getDay() === day &&
    tempDst.getHours() === hours &&
    tempDst.getMinutes() === minutes
  );
}

export function checkAvailability(dateObj, list, nowDate) {
  if (dateObj.getTime() < nowDate.getTime()) return false;
  if (list === undefined) return true;
  if (list === []) return true;
  const found = list.find((obj) => compareDates(obj, dateObj));
  if (found === undefined) return true;
  return false;
}
