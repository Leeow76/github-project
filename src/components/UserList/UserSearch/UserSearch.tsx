import { ReactElement, useState } from "react";

import styles from "./UserSearch.module.scss";

interface Props {
  search: Function;
  setViewMode: Function;
  viewMode: "grid" | "list";
}

export default function UserSearch({
  search,
  viewMode,
  setViewMode,
}: Props): ReactElement {
  const [searchValue, setSearchValue] = useState("");
  const [searchedString, setSearchedString] = useState("");

  const searchUsers = (searchValue: string) => {
    // Empty string searches for most followed users
    if (searchValue === "") {
      setSearchedString("");
      search("followers:>=0", "followers");
    } else {
      setSearchedString(searchValue);
      search(searchValue, "best_match");
    }
  };

  let clearButton = null;
  if (searchValue !== "") {
    clearButton = (
      <button
        className={`button button__withIcon button__transparent ${styles.clear}`}
        onClick={() => setSearchValue("")}
      >
        <span className="material-icons">close</span>
      </button>
    );
  }

  let searchTitle = null;
  if (searchedString) {
    searchTitle = (
      <h3 className={styles.title}>Search results for "{searchedString}"</h3>
    );
  } else {
    searchTitle = <h3 className={styles.title}>Most popular GitHub users</h3>;
  }

  let viewModes = null;
  let gridStyles = null;
  let listStyles = null;
  if (viewMode === "list") {
    gridStyles = `button ${styles.modeButton}`;
    listStyles = `button ${styles.modeButton} ${styles.modeButton__active}`;
  } else {
    gridStyles = `button ${styles.modeButton} ${styles.modeButton__active}`;
    listStyles = `button ${styles.modeButton}`;
  }
  viewModes = (
    <div className={styles.viewModes}>
      <button onClick={() => setViewMode("list")} className={listStyles}>
        <span className="material-icons-round">view_stream</span>
      </button>
      <button onClick={() => setViewMode("grid")} className={gridStyles}>
        <span className="material-icons-round">grid_view</span>
      </button>
    </div>
  );

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
          disabled={searchValue === searchedString}
          className="button button__withIcon button__primary"
          onClick={() => searchUsers(searchValue)}
        >
          <span className="material-icons">search</span>
        </button>
      </div>
      <div className={styles.toolbar}>
        {searchTitle}
        {viewModes}
      </div>
    </>
  );
}
