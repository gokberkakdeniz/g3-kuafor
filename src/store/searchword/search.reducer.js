import { SET_WORD } from "./search.actions";

const searchReducer = (state = "", action) => {
  switch (action.type) {
    case SET_WORD:
      return action.data;
    default:
      return state;
  }
};

export default searchReducer;
