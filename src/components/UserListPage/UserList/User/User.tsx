import { ReactElement } from "react";
import { Link } from "react-router-dom";

import styles from "./User.module.scss";

interface Props {
  user: User;
}

export default function User({ user }: Props): ReactElement {
  // Props
  const { login, avatar_url, type, repos } = user;

  let userRepos = undefined;

  if (!repos) {
    userRepos = <p>LOADING...</p>;
  } else if (repos.length === 0) {
    userRepos = <p>No repos to display</p>;
  } else {
    userRepos = repos.map((repo, index) => {
      return (
        <span className={styles.itemRepo + " textSmall"} key={index}>
          {repo["name"]}
        </span>
      );
    });
  }

  return (
    <li className={styles.item}>
      <span className={styles.itemImage}>
        <Link to={login}>
          <img src={avatar_url} title={login} alt={login} />
        </Link>
      </span>
      <div className={styles.itemInfo}>
        <h3>
          <Link to={login}>{login}</Link>
        </h3>
        <p>{type}</p>
      </div>
      <div className={styles.itemRepos}>
        <h3>User repositories</h3>
        {userRepos}
      </div>
    </li>
  );
}
