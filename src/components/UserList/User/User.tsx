import { ReactElement } from "react";

interface Props {
  user: User;
}

export default function User({ user }: Props): ReactElement {
  const { login, html_url } = user;
  return (
    <p>
      <a target="_blank" rel="noreferrer" href={html_url}>
        {login}
      </a>
    </p>
  );
}
