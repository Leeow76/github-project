import { ReactElement, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import * as usersPageActions from "../../store/actions/userPageActions";

export default function UserPage(): ReactElement {
  let { pathname } = useLocation();

  // Redux state data for sub-components
  const user: User = useSelector(
    (state: RootStateOrAny) => state.userPageReducer.userPageUser
  );

  // Redux dispatches
  const dispatch: Dispatch<any> = useDispatch();

  // Fetch user based on url path
  useEffect(() => {
    dispatch(usersPageActions.fetchUser(pathname.replace(/^\/+/, "")));
  }, [dispatch, pathname]);

  let userRepos = undefined;
  if (!user || !user.repos) {
    userRepos = <p>LOADING...</p>;
  } else if (user.repos.length === 0) {
    userRepos = <p>No repos to display</p>;
  } else if (user.repos.length > 0) {
    userRepos = user.repos.map((repo: any, index) => {
      return <p key={index}>{repo.name}</p>;
    });
  }

  let userOrgs = undefined;
  if (!user || !user.orgs) {
    userOrgs = <p>LOADING...</p>;
  } else if (user.orgs.length === 0) {
    userOrgs = <p>No repos to display</p>;
  } else if (user.orgs.length > 0) {
    userOrgs = user.orgs.map((org: any) => {
      return (
        <p>
          <img width="40" src={org.avatar_url} alt={org.login} />
          <a
            href={`https://github.com/${org.login}`}
            target="_blank"
            rel="noreferrer"
            key={org.id}
          >
            {org.login}
          </a>
        </p>
      );
    });
  }

  return (
    <>
      <Link to="/">Back</Link>
      {user && (
        <div>
          <br />
          <br />
          <a href={user.html_url} rel="noreferrer" target="_blank">
            {user.name ? user.name : user.login}
          </a>
          <img src={user.avatar_url} title={user.login} alt={user.login} />
          <p>{user.type}</p>
          {userRepos}
          {userOrgs}
        </div>
      )}
    </>
  );
}
