import * as actionTypes from "../actionTypes";

const dropdownState = {
  users: null,
};

const usersReducer = (
  state = dropdownState,
  action: any
) => {
  switch (action.type) {
    case actionTypes.GET_USER_LIST:
      return {
        users: action.users,
      };
  }
  return state;
};

export default usersReducer;
