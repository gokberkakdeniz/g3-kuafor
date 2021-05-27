import { NEW } from "./appointment.types";

export const ADD = "ADD";
export const REMOVE = "REMOVE";

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

export const remove = (appointment) => ({
  type: REMOVE,
  data: appointment
});
