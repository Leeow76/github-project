import { Dispatch } from "redux";

import * as actionTypes from "../actionTypes";

// User list status actions
const fetchUsersLoading = () => (dispatch: Dispatch<any>) => {
  dispatch({
    type: actionTypes.FETCH_USERS_LOADING,
  });
};
const fetchUsersSuccess = (users: any) => (dispatch: Dispatch<any>) => {
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
      await fetch("https://api.github.com/users?per_page=10&page=1", settings)
    ).json();
    if (data.message !== "Not Found") {
      dispatch(fetchUsersSuccess(data));
    } else {
      throw new Error("Could not fetch users!");
    }
  } catch (error) {
    dispatch(fetchUsersError(error));
  }
};
