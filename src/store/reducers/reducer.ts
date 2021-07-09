import { combineReducers } from "redux";
import userListPageReducer from "./userListPageReducer";
import userPageReducer from "./userPageReducer";

export default combineReducers({
  userListPageReducer: userListPageReducer,
  userPageReducer: userPageReducer,
});
