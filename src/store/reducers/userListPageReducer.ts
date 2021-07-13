import { AnyAction } from "redux";

import * as actionTypes from "../actionTypes";

export interface UserListState {
  users: User[];
  usersError: string | null;
  usersStatus: "idle" | "loading " | "success" | "failed";
  viewMode: "list" | "grid";
  latestSearch: string;
}

const userListState: UserListState = {
  users: [],
  usersError: null,
  usersStatus: "idle",
  viewMode: "list",
  latestSearch: ""
};

const userListReducer = (state = userListState, action: AnyAction) => {
  switch (action.type) {

    case actionTypes.FETCH_USERS_LOADING:
      return {
        ...state,
        usersError: null,
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

    case actionTypes.FETCH_USERLIST_REPOS:
      let fetchUserListReposUsers = [...state.users];
      const targetUser = fetchUserListReposUsers.find(
        (user) => user.login === action.user
        );
        if (targetUser) {
          targetUser["repos"] = action.repos;
        }
        return {
          ...state,
          users: fetchUserListReposUsers,
        };

    case actionTypes.SET_VIEW_MODE:
      return {
        ...state,
        viewMode: action.viewMode
      };
    case actionTypes.SET_SEARCH_VALUE:
      return {
        ...state,
        latestSearch: action.latestSearch
      };

  }
  return state;
};

export default userListReducer;
