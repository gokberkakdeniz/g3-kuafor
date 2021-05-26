import Appointments from "../appointments";
import { ADD, REMOVE } from "./appointments.actions";

const initialState = {
  workerId: 0,
  date: new Date(),
  type: "",
  userId: 0
};

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      console.log(action.data);
      return { ...action.data };
    case REMOVE:
      return {};
    default:
      return state;
  }
};

export default appointmentReducer;
