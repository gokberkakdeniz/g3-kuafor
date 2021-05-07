import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducer";
import preloadedState from "./state";

const store = createStore(rootReducer, preloadedState, composeWithDevTools());

export default store;
