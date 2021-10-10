import { combineReducers } from "redux";
// import userListPageReducer from "./userListPageReducer";
import userListReducer from "../../components/UserListPage/UserListSlice";
import userPageReducer from "./userPageReducer";

export default combineReducers({
  userListPageReducer: userListReducer,
  userPageReducer: userPageReducer,
});
