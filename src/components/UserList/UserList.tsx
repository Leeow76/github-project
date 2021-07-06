import { ReactElement, useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import * as userListActions from "../../store/actions/userListActions";
import styles from "./UserList.module.scss";
import User from "./User/User";
import UserSearch from "./UserSearch/UserSearch";

export default function UserList(): ReactElement {
  // Redux state data for sub-components
  const users: User[] = useSelector(
    (state: RootStateOrAny) => state.userListReducer.users
  );
  const usersError: string = useSelector(
    (state: RootStateOrAny) => state.userListReducer.usersError
  );
  const usersStatus: string = useSelector(
    (state: RootStateOrAny) => state.userListReducer.usersStatus
  );
  const viewMode: "grid" | "list" = useSelector(
    (state: RootStateOrAny) => state.userListReducer.viewMode
  );

  // Redux dispatches
  const dispatch: Dispatch<any> = useDispatch();
  // Fetch most followed users
  useEffect(() => {
    // Update only no users already in redux state
    if (users.length < 1) {
      dispatch(userListActions.fetchUsers("followers:>=0", "followers"));
    }
  }, []);

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
          dispatch(userListActions.fetchUsers(searchValue, searchSort))
        }
        setViewMode={(viewMode: string) =>
          dispatch(userListActions.setViewMode(viewMode))
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
