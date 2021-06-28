import { ReactElement } from "react";

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
      return <p key={index}>{repo["name"]}</p>;
    });
  }

  return (
    <li>
      <a target="_blank" rel="noreferrer" href={html_url}>
        <img
          width="100px"
          height="auto"
          src={avatar_url}
          title={login}
          alt={login}
        />
      </a>
      <div>
        <a target="_blank" rel="noreferrer" href={html_url}>
          {login}
        </a>
        <p>{type}</p>
      </div>
      <div>
        <h3>User repos</h3>
        {userRepos}
      </div>
    </li>
  );
}
