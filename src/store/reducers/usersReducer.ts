import * as actionTypes from "../actionTypes";

const usersState = {
  users: null,
  usersError: null,
  usersStatus: "idle",
};

const usersReducer = (state = usersState, action: any) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_LOADING:
      return {
        ...state,
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
  }
  return state;
};

export default usersReducer;
