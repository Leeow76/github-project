import { Dispatch } from "redux";

import * as actionTypes from "../actionTypes";

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

// Add token if it exists in .env (local development personal access token to increase request limit to 5000)
const addTokenIfExists = () => {
  if ("REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN" in process.env) {
    return "Token " + process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;
  } else {
    console.log(
      'Limited to 60 requests because no personal access token ("REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN") set in .env'
    );
  }
};

// User list actions
const searchUsersBaseUrl = "https://api.github.com/search/users?";

export const fetchUsers = () => async (dispatch: Dispatch<any>) => {
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
            q: "followers:>=0",
            s: "followers",
            type: "Users",
            per_page: "10",
            page: "1",
          }).toString(),
        settings
      )
    ).json();
    if (data.message !== "Not Found") {
      const users = data.items;
      dispatch(fetchUsersSuccess(users));
      // Fetch user repos
      users.forEach((user: User) => {
        dispatch(fetchUserRepos(user.login));
      });
    } else {
      throw new Error("Could not fetch users!");
    }
  } catch (error) {
    dispatch(fetchUsersError(error));
  }
};

const fetchUserRepos = (user: string) => async (dispatch: Dispatch<any>) => {
  let settings: any = {
    method: "GET",
    headers: {
      Authorization: addTokenIfExists(),
    },
  };
  try {
    const data = await (
      await fetch(
        `https://api.github.com/users/${user}/repos?per_page=3&page=99`,
        settings
      )
    ).json();
    if (data.message !== "Not Found") {
      dispatch({
        type: actionTypes.FETCH_USER_REPOS,
        user: user,
        repos: data,
      });
    } else {
      throw new Error("Could not fetch user!");
    }
  } catch (error) {
    dispatch(fetchUsersError(error));
  }
};
