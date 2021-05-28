import { ADD, CANCEL, UPDATE } from "./appointments.actions";

const initialState = {
  appointments: []
};

const appointmentReducer = (state = initialState, action) => {
  let listAppointments = state.appointments;
  if (listAppointments === undefined) listAppointments = [];
  switch (action.type) {
    case ADD:
      return {
        ...state,
        appointments: [...listAppointments, { id: listAppointments.length, ...action.data }]
      };
    case CANCEL:
      if (listAppointments.length === 1) {
        return {
          ...state,
          appointments: []
        };
      }
      return {
        ...state,
        appointments: [
          ...state.appointments.slice(0, action.ID),
          ...state.appointments.slice(action.ID + 1)
        ]
      };
    case UPDATE:
      return {
        ...state,
        appointments: [
          ...state.appointments.slice(0, action.ID),
          {
            ...state.appointments[action.ID],
            RoomType: action.data.RoomType,
            workerId: action.data.workerId,
            PhoneNumber: action.data.PhoneNumber,
            Date: action.data.Date
          },
          ...state.appointments.slice(action.ID + 1)
        ]
      };
    default:
      return state;
  }
};

export default appointmentReducer;
