import React, { ReactElement, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import * as usersPageActions from "../../store/actions/userPageActions";
import styles from "./UserPage.module.scss";
import { useDocTitle } from "../../hooks/useDocTitle";

export default function UserPage(): ReactElement {
  const [setDocTitle] = useDocTitle();
  // REDUX STATE DATA
  const user: User = useSelector(
    (state: RootStateOrAny) => state.userPageReducer.userPageUser
  );
  const userError: string = useSelector(
    (state: RootStateOrAny) => state.userPageReducer.userError
  );
  const userStatus: string = useSelector(
    (state: RootStateOrAny) => state.userPageReducer.userStatus
  );

  // REDUX DISPATCHES
  const dispatch: Dispatch<any> = useDispatch();

  // Fetch user based on url path
  const { pathname } = useLocation();
  const formattedPathname = pathname.replace(/^\/+/, "");
  useEffect(() => {
    dispatch(usersPageActions.fetchUser(formattedPathname));
    setDocTitle(`User "${formattedPathname}"`);
  }, [dispatch, formattedPathname, setDocTitle]);

  let userRepos = undefined;
  if (!user || !user.repos) {
    userRepos = <p>LOADING...</p>;
  } else if (user.repos.length === 0) {
    userRepos = <p>No repos to display</p>;
  } else if (user.repos.length > 0) {
    userRepos = user.repos.map((repo: any) => {
      return (
        <p className={`${styles.repo} textSmall`} key={repo.id}>
          {repo.name}
        </p>
      );
    });
  }

  let userOrgs = undefined;
  if (!user || !user.orgs) {
    userOrgs = <p>LOADING...</p>;
  } else if (user.orgs.length === 0) {
    userOrgs = <p>No organizations to display</p>;
  } else if (user.orgs.length > 0) {
    userOrgs = user.orgs.map((org: any) => {
      return (
        <a
          href={`https://github.com/${org.login}`}
          target="_blank"
          rel="noreferrer"
          key={org.id}
          className={`${styles.org} textSmall`}
        >
          <img src={org.avatar_url} alt={org.login} />
          {org.login}
        </a>
      );
    });
  }

  return (
    <>
      <Link
        to="/"
        className={`button button_secondary button_iconAndText ${styles.back}`}
      >
        <span className="material-icons-round">chevron_left</span>
        <span>Back</span>
      </Link>

      {userStatus === "loading" && (
        <div className="message__neutral">LOADING...</div>
      )}
      {userStatus === "failed" && (
        <div className="message__neutral">{userError}</div>
      )}
      {userStatus === "success" && (
        <>
          <h1 className={styles.title}>{user.login}</h1>
          <div className={styles.user}>
            <img
              className={styles.image}
              src={user.avatar_url}
              title={user.login}
              alt={user.login}
            />
            <div className={styles.info}>
              <h2 className={styles.name}>
                <a href={user.html_url} rel="noreferrer" target="_blank">
                  {user.name ? user.name : user.login}
                </a>
              </h2>
              <p>{user.type}</p>
              <div className={styles.repos}>
                <h3>User repositories</h3>
                {userRepos}
              </div>
              <div className={styles.orgs}>
                <h3>User organizations</h3>
                <div className={styles.orgList}>{userOrgs}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
