import { AnyAction } from "redux";

import * as actionTypes from "../actionTypes";

export interface UserPageState {
  userPageUser: User | null;
}

const userPageState: UserPageState = {
  userPageUser: null,
};

const usersReducer = (state = userPageState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return {
        ...state,
        userPageUser: action.user,
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
