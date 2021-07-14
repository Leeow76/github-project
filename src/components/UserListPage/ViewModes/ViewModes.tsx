import { ReactElement } from "react";

import styles from "./ViewModes.module.scss";

interface Props {
  viewMode: "gridMode" | "listMode";
  setViewMode: Function;
}

export default function ViewModes({
  viewMode,
  setViewMode,
}: Props): ReactElement {
  let gridStyles = "modeButton_gridMode ";
  let listStyles = "modeButton_listMode ";
  const defaultButtonStyles = `button ${styles.modeButton}`;
  if (viewMode === "listMode") {
    gridStyles += defaultButtonStyles;
    listStyles += `${defaultButtonStyles} ${styles.modeButton__active}`;
  } else {
    gridStyles += `${defaultButtonStyles} ${styles.modeButton__active}`;
    listStyles += defaultButtonStyles;
  }
  const viewModes = (
    <div className={styles.viewModes}>
      <button
        onClick={() =>
          viewMode === "gridMode" ? setViewMode("listMode") : null
        }
        className={listStyles}
      >
        <span className="material-icons-round">view_stream</span>
      </button>
      <button
        onClick={() =>
          viewMode === "listMode" ? setViewMode("gridMode") : null
        }
        className={gridStyles}
      >
        <span className="material-icons-round">grid_view</span>
      </button>
    </div>
  );
  return <>{viewModes}</>;
}
