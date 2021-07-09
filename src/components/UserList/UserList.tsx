import { ReactElement, useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import * as userListActions from "../../store/actions/userListActions";
import styles from "./UserList.module.scss";
import User from "./User/User";
import UserSearch from "./UserSearch/UserSearch";
import { useDocTitle } from "../../hooks/useDocTitle";

export default function UserList(): ReactElement {
  // REDUX STATE DATA
  const users: User[] = useSelector(
    (state: RootStateOrAny) => state.userListReducer.users
  );
  const usersError: string = useSelector(
    (state: RootStateOrAny) => state.userListReducer.usersError
  );
  const usersStatus: string = useSelector(
    (state: RootStateOrAny) => state.userListReducer.usersStatus
  );
  const viewMode: "grid" | "list" = useSelector(
    (state: RootStateOrAny) => state.userListReducer.viewMode
  );
  const latestSearch: string = useSelector(
    (state: RootStateOrAny) => state.userListReducer.latestSearch
  );

  const defaultPageTitle = "Most followed GitHub users";

  // Set document title to latest search if it exists in redux
  const [doctitle, setDocTitle] = useDocTitle(
    latestSearch ? `Search results for "${latestSearch}"` : defaultPageTitle
  );

  // REDUX DISPATCHES
  const dispatch: Dispatch<any> = useDispatch();

  // Initially fetch most followed users, set initial document title
  useEffect(() => {
    // Update only no users already in redux state
    if (users.length < 1) {
      setDocTitle(defaultPageTitle);
      dispatch(userListActions.fetchUsers("followers:>=0", "followers"));
    }
  }, []);

  // Fetch users, save redux searched string and localStorage latest only search if manually entered value
  const dispatchSearch = (
    searchValue: string,
    searchSort: string,
    includeSearchString?: boolean
  ) => {
    dispatch(userListActions.fetchUsers(searchValue, searchSort));

    if (includeSearchString) {
      dispatch(userListActions.setLatestSearch(searchValue));
      saveSearchToLocalStorage(searchValue);
      setDocTitle(`Search results for "${searchValue}"`);
    } else {
      dispatch(userListActions.setLatestSearch(""));
      setDocTitle(defaultPageTitle);
    }
  };

  const saveSearchToLocalStorage = (search: string) => {
    let recentSearches = [];
    if (localStorage.getItem("recentSearches") !== null) {
      recentSearches = JSON.parse(localStorage.getItem("recentSearches") || "");
    }
    if (!recentSearches.includes(search)) {
      recentSearches.unshift(search);
      if (recentSearches.length > 3) {
        recentSearches.pop();
      }
    }
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  };

  let listedUsers = null;
  if (usersStatus === "success" && users) {
    listedUsers = users.map((user: User) => {
      return <User key={user.id} user={user} />;
    });
  }

  return (
    <div className={styles.wrapper}>
      <UserSearch
        search={(
          searchValue: string,
          searchSort: string,
          includeSearchString: boolean = true
        ) => dispatchSearch(searchValue, searchSort, includeSearchString)}
        setViewMode={(viewMode: string) =>
          dispatch(userListActions.setViewMode(viewMode))
        }
        latestSearch={latestSearch}
        viewMode={viewMode}
      />
      <ul className={`${styles[viewMode]}`}>
        {usersStatus === "loading" && (
          <div className="message__neutral">LOADING...</div>
        )}
        {usersStatus === "failed" && (
          <div className="message__neutral">{usersError}</div>
        )}
        {usersStatus === "success" && users.length > 0 && <>{listedUsers}</>}
        {usersStatus === "success" && users.length === 0 && (
          <div className="message__neutral">No users found</div>
        )}
      </ul>
    </div>
  );
}
