import { ReactElement, useEffect } from 'react'
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";

import * as userActions from '../../store/actions/usersActions'
import User from './User/User'

export default function UserList(): ReactElement {
  // Redux state data for subcomponents
  const users: any = useSelector(
    (state: any) => state.usersReducer.users
  );
  // Redux dispatches
  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
      dispatch(userActions.fetchUsers());
  }, [dispatch]);

  let listedUsers = null;
  if (users !== null) {
    listedUsers = users.map((user: User, index: number) => {
      return <User key={index} user={user} />
    })
  }
  return (
    <ul>
      {listedUsers}
    </ul>
  )
}
