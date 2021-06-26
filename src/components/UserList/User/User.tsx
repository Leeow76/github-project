import { ReactElement } from "react";

interface Props {
  user: User;
}

export default function User({ user }: Props): ReactElement {
  const { id, login } = user;
  return <p>{`${login} - ${id}`}</p>;
}
