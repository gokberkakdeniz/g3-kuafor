function validatePhoneNumber(phoneNumber) {
  if (phoneNumber === undefined) return false;
  const intValue = parseInt(phoneNumber, 10);
  const nanResult = intValue.isNaN;
  if (nanResult) return false;
  if (phoneNumber.length !== 10) return false;
  return true;
}

export function validateDate(oldDate, selectedDate) {
  if (!selectedDate) return false;
  const tempOld = new Date(oldDate);
  const tempNew = new Date(selectedDate);
  return tempOld.getTime() < tempNew.getTime();
}

export function isNumeric(value) {
  return /^\d+$/.test(value);
}
