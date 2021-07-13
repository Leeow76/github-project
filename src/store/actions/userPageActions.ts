import { Dispatch } from "redux";

import * as actionTypes from "../actionTypes";
import { fetchUserRepos, addTokenIfExists } from './commonUserActions';

// User page status actions
const fetchUserLoading = () => (dispatch: Dispatch<any>) => {
  dispatch({
    type: actionTypes.FETCH_USER_LOADING,
  });
};
const fetchUserSuccess = (user: User[]) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: actionTypes.FETCH_USER_SUCCESS,
    user: user,
  });
};
const fetchUserError = (error: string) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: actionTypes.FETCH_USER_ERROR,
    error: error,
  });
};

// Fetch user for user page
export const fetchUser = (user: string) => async (dispatch: Dispatch<any>) => {
  dispatch(fetchUserLoading());
  let settings: any = {
    method: "GET",
    headers: {
      Authorization: addTokenIfExists(),
    },
  };
  try {
    const data = await (
      await fetch(
        `https://api.github.com/users/${user}`,
        settings
      )
    ).json();
    if (data.message !== "Not Found") {
      dispatch(fetchUserSuccess(data));
      dispatch(fetchUserRepos(user, "userPage"));
      dispatch(fetchUserOrgs(user));
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error);
    dispatch(fetchUserError(error));
  }
};

// Fetch 3 single user organizations.
const fetchUserOrgs = (user: string) => async (dispatch: Dispatch<any>) => {
  let settings: any = {
    method: "GET",
    headers: {
      Authorization: addTokenIfExists(),
    },
  };
  try {
    const data = await (
      await fetch(
        `https://api.github.com/users/${user}/orgs`,
        settings
      )
    ).json();
    if (data.message !== "Not Found") {
      // Different action for user page and user list.
      dispatch({
        type: actionTypes.FETCH_USERPAGE_ORGS,
        user: user,
        orgs: data,
      });
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error)
  }
};
