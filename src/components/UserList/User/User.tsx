import { ReactElement } from 'react'

interface Props {
  user: User
}

export default function User({user}: Props): ReactElement {
  return (
    <p>{`${user.login} - ${user.id}`}</p>
  )
}
