import { ReactElement, useState } from "react";

import styles from "./UserSearch.module.scss";

interface Props {
  search: Function;
}

export default function UserSearch({ search }: Props): ReactElement {
  const [searchValue, setSearchValue] = useState("");
  const [searchedString, setSearchedString] = useState("");

  const searchUsers = (query: string) => {
    // Empty string searches most followed users
    if (query === "") {
      setSearchedString("");
      search("followers:>=0", "followers");
    } else {
      setSearchedString(query);
      search(query, "best_match");
    }
  };

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
        {searchValue !== "" && (
          <button
            className={styles.clear + " button button__withIcon"}
            onClick={() => setSearchValue("")}
          >
            <span className="material-icons">close</span>
          </button>
        )}
        <button
          className="button button__withIcon button__primary"
          onClick={() => searchUsers(searchValue)}
        >
          <span className="material-icons">search</span>
        </button>
      </div>
      {!searchedString && (
        <h3 className={styles.title}>Most popular GitHub users:</h3>
      )}
      {searchedString && (
        <h3 className={styles.title}>Search results for "{searchedString}":</h3>
      )}
      <button className="button">test</button>
    </>
  );
}
