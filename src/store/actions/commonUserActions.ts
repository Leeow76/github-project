import { Dispatch } from "redux";

import * as actionTypes from "../actionTypes";

// Add token if it exists in .env (local development personal access token to increase request limit to 5000)
export const addTokenIfExists = () => {
  if ("REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN" in process.env) {
    return "Token " + process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;
  } else {
    console.log(
      'Limited to 60 requests because no personal access token ("REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN") set in .env'
    );
  }
};

// Fetch 3 single user repos.
export const fetchUserRepos = (user: string, page: "userList" | "userPage") => async (dispatch: Dispatch<any>) => {
  let settings: any = {
    method: "GET",
    headers: {
      Authorization: addTokenIfExists(),
    },
  };
  try {
    const data = await (
      await fetch(
        `https://api.github.com/users/${user}/repos?per_page=3&page=1`,
        settings
      )
    ).json();
    if (data.message !== "Not Found") {
      // Different action for user page and user list.
      const dispatchType = page === "userList" ? actionTypes.FETCH_USERLIST_REPOS : page === "userPage" ? actionTypes.FETCH_USERPAGE_REPOS : null;
      dispatch({
        type: dispatchType,
        user: user,
        repos: data,
      });
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error)
  }
};