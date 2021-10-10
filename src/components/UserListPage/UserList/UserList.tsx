import { ReactElement } from "react";

import User from "./User/User";
import styles from "./UserList.module.scss";

interface Props {
  users: User[];
  usersStatus: string;
  usersError: string | null;
  viewMode: string;
}

export default function UserList({
  users,
  usersStatus,
  usersError,
  viewMode,
}: Props): ReactElement {
  let listedUsers = null;
  if (usersStatus === "success" && users) {
    listedUsers = users.map((user: User) => {
      return <User key={user.id} user={user} />;
    });
  }
  return (
    <ul className={`${styles[viewMode]} ${styles.list}`}>
      {usersStatus === "success" && users.length > 0 && <>{listedUsers}</>}
      {usersStatus === "success" && users.length === 0 && (
        <div className="message__neutral">No users found</div>
      )}
      {usersStatus === "loading" && (
        <div className="message__neutral">LOADING...</div>
      )}
      {usersStatus === "failed" && (
        <div className="message__neutral">{usersError}</div>
      )}
    </ul>
  );
}
