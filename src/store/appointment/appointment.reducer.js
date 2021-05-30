import { ADD, CANCEL, UPDATE } from "./appointments.actions";

const initialState = {
  appointments: []
};

function findIndex(index, list) {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === index) {
      return i;
    }
  }
  return -1;
}

function findEmptyIndex(length, list) {
  let i = length + 1;
  while (list[i] !== undefined) {
    i += 1;
  }
  return i;
}

const appointmentReducer = (state = initialState, action) => {
  let listAppointments = state.appointments;
  let index = 0;
  let empty = 0;
  if (listAppointments === undefined) listAppointments = [];
  switch (action.type) {
    case ADD:
      empty = findEmptyIndex(listAppointments.length, listAppointments);
      return {
        ...state,
        appointments: [...listAppointments, { id: empty, ...action.data }]
      };
    case CANCEL:
      if (listAppointments.length === 1) {
        return {
          ...state,
          appointments: []
        };
      }
      index = findIndex(action.ID, listAppointments);
      if (index < 0) return { ...state };
      return {
        ...state,
        appointments: [...listAppointments.slice(0, index), ...listAppointments.slice(index + 1)]
      };
    case UPDATE:
      index = findIndex(action.ID, listAppointments);
      if (index < 0) return { ...state };
      return {
        ...state,
        appointments: [
          ...listAppointments.slice(0, index),
          {
            ...listAppointments[index],
            RoomType: action.data.RoomType,
            workerId: action.data.workerId,
            PhoneNumber: action.data.PhoneNumber,
            Date: action.data.Date
          },
          ...listAppointments.slice(index + 1)
        ]
      };
    default:
      return state;
  }
};

export default appointmentReducer;
