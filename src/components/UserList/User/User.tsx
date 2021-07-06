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
  } else if (repos.length > 0) {
    userRepos = repos.map((repo, index) => {
      return (
        <p className={styles.item__repo + " textSmall"} key={index}>
          {repo["name"]}
        </p>
      );
    });
  }

  return (
    <li className={styles.item}>
      <span className={styles.item__image}>
        <img src={avatar_url} title={login} alt={login} />
      </span>
      <div className={styles.item__info}>
        <Link to={login}>{login}</Link>
        <p>{type}</p>
      </div>
      <div className={styles.item__repos}>
        <h3>User repositories</h3>
        {userRepos}
      </div>
    </li>
  );
}
