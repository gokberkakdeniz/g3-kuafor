import Appointments from "../appointments";
import { ADD, REMOVE } from "./appointments.actions";

const initialState = {
  appointments: []
};

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        appointments: [...state.appointments, { id: state.appointments.length, ...action.data }]
      };
    case REMOVE:
      return {}; // TODO add remove function add
    default:
      return state;
  }
};

export default appointmentReducer;
