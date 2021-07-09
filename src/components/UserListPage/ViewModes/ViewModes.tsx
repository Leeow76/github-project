import React, { ReactElement } from "react";

import styles from "./ViewModes.module.scss";

interface Props {
  viewMode: "grid" | "list";
  setViewMode: Function;
}

export default function ViewModes({
  viewMode,
  setViewMode,
}: Props): ReactElement {
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
  return <div>{viewModes}</div>;
}
