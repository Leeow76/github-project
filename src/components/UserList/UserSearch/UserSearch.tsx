import { ReactElement, useState, useEffect } from "react";

import styles from "./UserSearch.module.scss";

interface Props {
  search: Function;
  setViewMode: Function;
  latestSearch: string | "";
  viewMode: "grid" | "list";
}

export default function UserSearch({
  search,
  viewMode,
  latestSearch,
  setViewMode,
}: Props): ReactElement {
  const [searchValue, setSearchValue] = useState("");
  const [recentSearches, setRecentSearches] = useState(
    localStorage.getItem("recentSearches")
  );

  // Update recent searches from localStorage after new search
  useEffect(() => {
    setRecentSearches(localStorage.getItem("recentSearches"));
  }, [latestSearch]);

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

  let searchTitle = null;
  if (latestSearch) {
    searchTitle = (
      <h1 className={styles.title}>Search results for "{latestSearch}"</h1>
    );
  } else {
    searchTitle = <h1 className={styles.title}>Most popular GitHub users</h1>;
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

  let recentSearchesHtml = null;
  let recentSearchesCount = null;
  if (recentSearches) {
    const parsedData = JSON.parse(localStorage.getItem("recentSearches") || "");
    recentSearchesCount = parsedData.length;
    const mappedSearches = parsedData.map((search: string) => {
      return (
        <span
          onClick={() => searchUsers(search)}
          className={`${styles.recentSearch} textSmall`}
        >
          {search}
        </span>
      );
    });
    recentSearchesHtml = (
      <div className={styles.recentSearches}>
        <h4>
          {recentSearchesCount === 1
            ? "Last search"
            : `Last ${recentSearchesCount} searches`}
        </h4>
        {mappedSearches}
      </div>
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
      {recentSearchesHtml}
      <div className={styles.toolbar}>
        {searchTitle}
        {viewModes}
      </div>
    </>
  );
}
