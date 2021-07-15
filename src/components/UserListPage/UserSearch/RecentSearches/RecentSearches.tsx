import { ReactElement, useEffect, useState } from "react";

import styles from "./RecentSearches.module.scss";

interface Props {
  search: Function;
  latestSearch: string | "";
}

export default function RecentSearches({
  search,
  latestSearch,
}: Props): ReactElement {
  const [recentSearches, setRecentSearches] = useState(
    localStorage.getItem("recentSearches")
  );

  // Update recent searches from localStorage after new redux latestSearch
  useEffect(() => {
    setRecentSearches(localStorage.getItem("recentSearches"));
  }, [latestSearch]);

  let recentSearchesHtml = null;
  let recentSearchesCount = null;
  if (recentSearches) {
    const parsedData = JSON.parse(recentSearches);
    recentSearchesCount = parsedData.length;
    const mappedSearches = parsedData.map(
      (searchValue: string, index: number) => {
        return (
          <span
            key={index}
            onClick={() => search(searchValue)}
            className={`${styles.recentSearch} textSmall`}
          >
            {searchValue}
          </span>
        );
      }
    );
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
  return <>{recentSearchesHtml}</>;
}
