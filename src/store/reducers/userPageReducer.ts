import { AnyAction } from "redux";

import * as actionTypes from "../actionTypes";

export interface UserPageState {
  userPageUser: User | null;
  userError: string | null;
  userStatus: "idle" | "loading " | "success" | "failed";
}

const userPageState: UserPageState = {
  userPageUser: null,
  userError: null,
  userStatus: "idle"
};

const usersReducer = (state = userPageState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_LOADING:
      return {
        ...state,
        userError: null,
        userStatus: "loading",
      };

    case actionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        userStatus: "success",
        userPageUser: action.user,
      };
        
    case actionTypes.FETCH_USER_ERROR:
      return {
        ...state,
        userError: action.error.message,
        userStatus: "failed",
      };

    case actionTypes.FETCH_USERPAGE_REPOS:
      let fetchUserListReposUser = {...state.userPageUser};
        fetchUserListReposUser["repos"] = action.repos;
        return {
          ...state,
          userPageUser: fetchUserListReposUser,
        };
    case actionTypes.FETCH_USERPAGE_ORGS:
      let fetchUserListOrgsUser = {...state.userPageUser};
      fetchUserListOrgsUser["orgs"] = action.orgs;
        return {
          ...state,
          userPageUser: fetchUserListOrgsUser,
        };
  }
  return state;
};

export default usersReducer;
