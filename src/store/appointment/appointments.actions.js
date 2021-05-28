import { NEW, CANCELED } from "./appointment.types";

export const ADD = "ADD";
export const CANCEL = "CANCEL";
export const UPDATE = "UPDATE";

export const add = (workerId, Name, Surname, PhoneNumber, Date, RoomType) => ({
  type: ADD,
  data: {
    workerId,
    Name,
    Surname,
    PhoneNumber,
    Type: NEW,
    Date,
    RoomType
  }
});

export const updateAppointment = (id, workerId, PhoneNumber, Date, RoomType) => ({
  type: UPDATE,
  ID: id,
  data: {
    workerId,
    PhoneNumber,
    Date,
    RoomType
  }
});

export const cancelAppointment = (id) => ({
  type: CANCEL,
  ID: id
});
