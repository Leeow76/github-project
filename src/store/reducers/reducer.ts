import { combineReducers } from "redux";
import userListReducer from "./userListReducer";
import userPageReducer from "./userPageReducer";

export default combineReducers({
  userListReducer: userListReducer,
  userPageReducer: userPageReducer,
});
