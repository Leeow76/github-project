import { AnyAction } from "redux";

import * as actionTypes from "../actionTypes";

export interface UserState {
  users: User[];
  usersError: string;
  usersStatus: "idle" | "loading " | "success" | "failed";
  viewMode: "list" | "grid";
}

const usersState: UserState = {
  users: [],
  usersError: "",
  usersStatus: "idle",
  viewMode: "list"
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
    case actionTypes.FETCH_USER_REPOS:
      let fetchUserReposUsers = [...state.users];
      const targetUser = fetchUserReposUsers.find(
        (user) => user.login === action.user
        );
        if (targetUser) {
          targetUser["repos"] = action.repos;
        }
        return {
          ...state,
          users: fetchUserReposUsers,
        };
    case actionTypes.SET_VIEW_MODE:
      return {
        ...state,
        viewMode: action.viewMode
      };
  }
  return state;
};

export default usersReducer;
