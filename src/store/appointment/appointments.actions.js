export const ADD = "ADD";
export const REMOVE = "REMOVE";

export const add = (appointment) => ({
  type: ADD,
  data: appointment
});

export const remove = (appointment) => ({
  type: REMOVE,
  data: appointment
});
