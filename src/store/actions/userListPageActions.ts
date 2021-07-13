import { Dispatch } from "redux";

import * as actionTypes from "../actionTypes";
import { fetchUserRepos, addTokenIfExists } from './commonUserActions'

// User list status actions
const fetchUsersLoading = () => (dispatch: Dispatch<any>) => {
  dispatch({
    type: actionTypes.FETCH_USERS_LOADING,
  });
};
const fetchUsersSuccess = (users: User[]) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: users,
  });
};
const fetchUsersError = (error: string) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: actionTypes.FETCH_USERS_ERROR,
    error: error,
  });
};

const searchUsersBaseUrl = "https://api.github.com/search/users?";

// Fetch user list
export const fetchUsers =
  (query: string, sort: string) => async (dispatch: Dispatch<any>) => {
    dispatch(fetchUsersLoading());
    let settings: any = {
      method: "GET",
      headers: {
        Authorization: addTokenIfExists(),
      },
    };
    try {
      const data = await (
        await fetch(
          searchUsersBaseUrl +
            new URLSearchParams({
              q: query,
              sort: sort,
              type: "Users",
              per_page: "10",
              page: "1",
            }).toString(),
          settings
        )
      ).json();
      if (data.items.length > 0) {
        const users = data.items;
        // Fetch user repos
        dispatch(fetchUsersSuccess(users));
        users.forEach((user: User) => {
          dispatch(fetchUserRepos(user.login, "userList"));
        });
      } else {
        throw new Error("Could not find users");
      }
    } catch (error) {
      dispatch(fetchUsersError(error));
    }
  };

// Set user listing view mode
export const setViewMode = (viewMode: string) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: actionTypes.SET_VIEW_MODE,
    viewMode: viewMode,
  });
};

// Set last search value
export const setLatestSearch = (latestSearch: string) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: actionTypes.SET_SEARCH_VALUE,
    latestSearch: latestSearch,
  });
};