import { combineReducers } from "redux";

import { counterReducer } from "./counter";
import { appointmentReducer } from "./appointment";
import { searchReducer } from "./searchword";

const rootReducer = combineReducers({
  counter: counterReducer,
  adder: appointmentReducer,
  searchKey: searchReducer
});

export default rootReducer;
