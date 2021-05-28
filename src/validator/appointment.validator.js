function validatePhoneNumber(phoneNumber) {
  if (phoneNumber === undefined) return false;
  const intValue = parseInt(phoneNumber, 10);
  const nanResult = intValue.isNaN;
  if (nanResult) return false;
  if (phoneNumber.length !== 10) return false;
  return true;
}

function validateDate(oldDate, selectedDate) {
  if (selectedDate === undefined) return false;
  const tempOld = new Date(oldDate);
  const tempNew = new Date(selectedDate);
  return tempOld.getTime() < tempNew.getTime();
}

export function validateAppointment(phoneNumber, oldDate, newDate) {
  return validatePhoneNumber(phoneNumber) && validateDate(oldDate, newDate);
}
