import { ReactElement, useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import * as userListPageActions from "../../store/actions/userListPageActions";
import styles from "./UserListPage.module.scss";
import UserList from "./UserList/UserList";
import ViewModes from "./ViewModes/ViewModes";
import UserSearch from "./UserSearch/UserSearch";
import { useDocTitle } from "../../hooks/useDocTitle";

export default function UserListPage(): ReactElement {
  // REDUX STATE DATA
  const users: User[] = useSelector(
    (state: RootStateOrAny) => state.userListPageReducer.users
  );
  const usersError: string = useSelector(
    (state: RootStateOrAny) => state.userListPageReducer.usersError
  );
  const usersStatus: string = useSelector(
    (state: RootStateOrAny) => state.userListPageReducer.usersStatus
  );
  const viewMode: "grid" | "list" = useSelector(
    (state: RootStateOrAny) => state.userListPageReducer.viewMode
  );
  const latestSearch: string = useSelector(
    (state: RootStateOrAny) => state.userListPageReducer.latestSearch
  );

  const defaultPageTitle = "Most followed GitHub users";
  const searchPageTitle = `Search results for "${latestSearch}"`;

  // Set document title to latest search if it exists in redux
  const [setDocTitle] = useDocTitle(
    latestSearch ? searchPageTitle : defaultPageTitle
  );

  // REDUX DISPATCHES
  const dispatch: Dispatch<any> = useDispatch();

  // Initially fetch most followed users, set initial document title
  useEffect(() => {
    // Update only no users already in redux state
    if (users.length < 1) {
      setDocTitle(defaultPageTitle);
      dispatch(userListPageActions.fetchUsers("followers:>=0", "followers"));
    }
  }, [dispatch, setDocTitle, users.length]);

  // Fetch users, save redux searched string and localStorage latest only search if manually entered value
  const dispatchSearch = (
    searchValue: string,
    searchSort: string,
    includeSearchString?: boolean
  ) => {
    dispatch(userListPageActions.fetchUsers(searchValue, searchSort));

    if (includeSearchString) {
      dispatch(userListPageActions.setLatestSearch(searchValue));
      saveSearchToLocalStorage(searchValue);
      setDocTitle(`Search results for "${searchValue}"`);
    } else {
      dispatch(userListPageActions.setLatestSearch(""));
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

  let searchTitle = null;
  if (latestSearch) {
    searchTitle = <h1 className={styles.title}>{searchPageTitle}</h1>;
  } else {
    searchTitle = <h1 className={styles.title}>{defaultPageTitle}</h1>;
  }

  return (
    <div className={styles.wrapper}>
      <UserSearch
        search={(
          searchValue: string,
          searchSort: string,
          includeSearchString: boolean = true
        ) => dispatchSearch(searchValue, searchSort, includeSearchString)}
        latestSearch={latestSearch}
      />
      <div className={styles.toolbar}>
        {searchTitle}
        <ViewModes
          viewMode={viewMode}
          setViewMode={(viewMode: string) =>
            dispatch(userListPageActions.setViewMode(viewMode))
          }
        />
      </div>

      <UserList
        users={users}
        usersStatus={usersStatus}
        usersError={usersError}
        viewMode={viewMode}
      />
    </div>
  );
}
