import { ReactElement, useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import * as usersActions from "../../store/actions/usersActions";
import styles from "./UserList.module.scss";
import User from "./User/User";
import UserSearch from "./UserSearch/UserSearch";

export default function UserList(): ReactElement {
  // Redux state data for sub-components
  const users: User[] = useSelector(
    (state: RootStateOrAny) => state.usersReducer.users
  );
  const usersError: string = useSelector(
    (state: RootStateOrAny) => state.usersReducer.usersError
  );
  const usersStatus: string = useSelector(
    (state: RootStateOrAny) => state.usersReducer.usersStatus
  );
  const viewMode: "grid" | "list" = useSelector(
    (state: RootStateOrAny) => state.usersReducer.viewMode
  );

  // Redux dispatches
  const dispatch: Dispatch<any> = useDispatch();
  // Fetch most followed users
  useEffect(() => {
    dispatch(usersActions.fetchUsers("followers:>=0", "followers"));
  }, [dispatch]);

  let listedUsers = null;
  if (usersStatus === "success" && users) {
    listedUsers = users.map((user: User, index: number) => {
      return <User key={index} user={user} />;
    });
  }

  return (
    <div className={styles.wrapper}>
      <UserSearch
        search={(searchValue: string, searchSort: string) =>
          dispatch(usersActions.fetchUsers(searchValue, searchSort))
        }
        setViewMode={(viewMode: string) =>
          dispatch(usersActions.setViewMode(viewMode))
        }
        viewMode={viewMode}
      />
      <ul className={`${styles[viewMode]}`}>
        {usersStatus === "loading" && (
          <div className="message__neutral">LOADING...</div>
        )}
        {usersStatus === "failed" && (
          <div className="message__neutral">{usersError}</div>
        )}
        {usersStatus === "success" && users.length > 0 && <>{listedUsers}</>}
        {usersStatus === "success" && users.length === 0 && (
          <div className="message__neutral">No users found</div>
        )}
      </ul>
    </div>
  );
}
