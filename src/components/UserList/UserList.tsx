import { ReactElement, useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import * as usersActions from "../../store/actions/usersActions";
import styles from "./UserList.module.scss";
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
  // Fetch most followed users
  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    dispatch(usersActions.fetchUsers("followers:>=0", "followers"));
  }, [dispatch]);

  let listedUsers = null;
  if (usersStatus === "success") {
    listedUsers = users.map((user: User, index: number) => {
      return <User key={index} user={user} />;
    });
  }

  return (
    <ul className={styles.UserList}>
      {usersStatus === "loading" && <p>LOADING...</p>}
      {usersStatus === "failed" && <p>{usersError}</p>}
      {usersStatus === "success" && <>{listedUsers}</>}
    </ul>
  );
}
