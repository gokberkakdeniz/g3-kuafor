import Appointments from "../appointments";
import { ADD, REMOVE } from "./appointments.actions";

const appointmentReducer = (state = Appointments, action) => {
  console.log(action.data);
  switch (action.type) {
    case ADD:
      return state.push(action.data);
    case REMOVE:
      return state.reduce(action.data);
    default:
      return state;
  }
};

export default appointmentReducer;
