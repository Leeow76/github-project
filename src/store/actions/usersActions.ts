import { Dispatch } from "redux";

import * as actionTypes from "../actionTypes";
const fetchUsersSuccess = (users: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: actionTypes.GET_USER_LIST,
    users: users,
  });
};

export const fetchUsers = () => async (dispatch: Dispatch<any>) => {
  try {
    const data = await (
      await fetch(
        "https://api.github.com/users?q=per_page=10"
        )
        ).json();
    if (data) {
      dispatch(fetchUsersSuccess(data));
    } else {
      throw new Error("Could not fetch to-do items!");
    }
  } catch (error) {
    console.log(error)
  }
};