import { combineReducers } from "redux";

import { counterReducer } from "./counter";
import { appointmentReducer } from "./appointment";

const rootReducer = combineReducers({
  counter: counterReducer,
  adder: appointmentReducer
});

export default rootReducer;
