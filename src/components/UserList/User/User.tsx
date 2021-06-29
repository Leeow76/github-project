import { ReactElement } from "react";

import styles from "./User.module.scss";

interface Props {
  user: User;
}

export default function User({ user }: Props): ReactElement {
  // Props
  const { login, html_url, avatar_url, type, repos } = user;

  let userRepos = undefined;

  if (!repos) {
    userRepos = <p>LOADING...</p>;
  } else if (repos.length === 0) {
    userRepos = <p>No repos to display</p>;
  } else if (repos.length > 0) {
    userRepos = repos.map((repo, index) => {
      return (
        <p className="text-small" key={index}>
          {repo["name"]}
        </p>
      );
    });
  }

  return (
    <li className={styles.User}>
      <a
        className={styles.User_image}
        target="_blank"
        rel="noreferrer"
        href={html_url}
      >
        <img src={avatar_url} title={login} alt={login} />
      </a>
      <div className={styles.User_info}>
        <a target="_blank" rel="noreferrer" href={html_url}>
          {login}
        </a>
        <p>{type}</p>
      </div>
      <div className={styles.User_repos}>
        <h3>User repos</h3>
        {userRepos}
      </div>
    </li>
  );
}
