import { ReactElement, useState } from "react";

import RecentSearches from "./RecentSearches/RecentSearches";
import styles from "./UserSearch.module.scss";

interface Props {
  search: Function;
  latestSearch: string | "";
}

export default function UserSearch({
  search,
  latestSearch,
}: Props): ReactElement {
  const [searchValue, setSearchValue] = useState("");

  const searchUsers = (searchValue: string) => {
    // Empty string searches for most followed users
    if (searchValue.trim() === "") {
      search("followers:>=0", "followers", false);
    } else {
      search(searchValue, "best_match");
    }
  };

  let clearButton = null;
  if (searchValue !== "") {
    clearButton = (
      <button
        className={`button button_formButton button_transparent ${styles.clear}`}
        onClick={() => setSearchValue("")}
      >
        <span className="material-icons">close</span>
      </button>
    );
  }

  return (
    <>
      <div className={styles.field + " textField textField__withButton"}>
        <input
          className={
            searchValue !== "" ? styles.input__clearable : styles.input
          }
          type="text"
          placeholder="Search users from GitHub"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          onKeyDown={(e) => {
            if (e.code === "Enter" && searchValue) {
              e.preventDefault();
              searchUsers(searchValue);
            }
          }}
        />
        {clearButton}
        <button
          // Disabled if current text value same as latest search OR if no searches and no value in the field
          disabled={
            searchValue === latestSearch ||
            (latestSearch === "" && searchValue === "")
          }
          className="button button_formButton button_primary"
          onClick={() => searchUsers(searchValue)}
        >
          <span className="material-icons">search</span>
        </button>
      </div>

      <RecentSearches
        latestSearch={latestSearch}
        search={(searchValue: string) => searchUsers(searchValue)}
      />
    </>
  );
}
