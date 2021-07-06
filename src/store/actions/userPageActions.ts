import { Dispatch } from "redux";

import * as actionTypes from "../actionTypes";
import { fetchUserRepos, addTokenIfExists } from './commonUserActions';

// Fetch user for user page
export const fetchUser = (user: string) => async (dispatch: Dispatch<any>) => {
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
      dispatch({
        type: actionTypes.FETCH_USER,
        user: data,
      });
      dispatch(fetchUserRepos(user, "userPage"));
      dispatch(fetchUserOrgs(user));
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionTypes.FETCH_USER,
      user: null,
    })
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
