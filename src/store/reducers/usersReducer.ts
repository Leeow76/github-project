import { AnyAction } from "redux";

import * as actionTypes from "../actionTypes";

export interface UserState {
  users: User[];
  usersError: string;
  usersStatus: "idle" | "loading " | "success" | "failed";
}

const usersState: UserState = {
  users: [],
  usersError: "",
  usersStatus: "idle",
};

const usersReducer = (state = usersState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_LOADING:
      return {
        ...state,
        usersStatus: "loading",
      };
    case actionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        usersStatus: "success",
        users: action.users,
      };
    case actionTypes.FETCH_USERS_ERROR:
      return {
        ...state,
        usersError: action.error.message,
        usersStatus: "failed",
      };
  }
  return state;
};

export default usersReducer;
