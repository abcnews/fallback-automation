import React from "react";
import styles from "./styles.scss";
import clsx from "clsx";

import { useSelector, useAction } from "@abcnews/tiny-ducks";
import { currentClipIndexSelector, currentClipSelector } from "../../selectors";
import {
  setClipBrowserWidthAction,
  setClipNameAction,
  setClipSelectorAction
} from "../../actions";

const EditClip = () => {
  // Selectors
  const currentClipIndex = useSelector(currentClipIndexSelector);
  if (typeof currentClipIndex === "undefined")
    return <p>Select a clip to edit.</p>;
  const { name, selector, browserWidth } = useSelector(currentClipSelector);

  // Actions
  const setClipName = useAction(setClipNameAction);
  const setClipSelector = useAction(setClipSelectorAction);
  const setClipBrowserWidth = useAction(setClipBrowserWidthAction);

  return (
    <div className={styles.root}>
      <div className={styles.field}>
        <label for="name" className={styles.label}>
          Clip name
        </label>
        <input
          type="text"
          placeholder={`Clip ${currentClipIndex + 1}`}
          value={name || ""}
          onChange={({ target: { value } }) =>
            setClipName(value, currentClipIndex)
          }
        />
      </div>
      <div className={styles.field}>
        <label for="name" className={styles.label}>
          CSS selector
        </label>
        <input
          type="text"
          placeholder={`#clip-this`}
          value={selector || ""}
          onChange={({ target: { value } }) =>
            setClipSelector(value, currentClipIndex)
          }
        />
      </div>
      <div className={styles.field}>
        <label for="name" className={styles.label}>
          Browser width
        </label>
        <input
          type="number"
          placeholder={`1200`}
          value={browserWidth || ""}
          onChange={({ target: { value } }) =>
            setClipBrowserWidth(value, currentClipIndex)
          }
        />
      </div>
    </div>
  );
};

export default EditClip;
