import { ReactElement, useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import * as userActions from "../../store/actions/usersActions";
import User from "./User/User";

export default function UserList(): ReactElement {
  // Redux state data for subcomponents
  const users: User[] = useSelector(
    (state: RootStateOrAny) => state.usersReducer.users
  );
  const usersError: string = useSelector(
    (state: RootStateOrAny) => state.usersReducer.usersError
  );
  const usersStatus: string = useSelector(
    (state: RootStateOrAny) => state.usersReducer.usersStatus
  );

  // Redux dispatches
  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    dispatch(userActions.fetchUsers());
  }, [dispatch]);

  let listedUsers = null;
  if (usersStatus === "success") {
    listedUsers = users.map((user: User, index: number) => {
      return <User key={index} user={user} />;
    });
  }

  return (
    <ul>
      {usersStatus === "loading" && <p>LOADING...</p>}
      {usersStatus === "failed" && <p>{usersError}</p>}
      {usersStatus === "success" && <>{listedUsers}</>}
    </ul>
  );
}
