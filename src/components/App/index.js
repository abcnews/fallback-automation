import React, { useState } from "react";
import Page from "../Page";
import Row from "../Row";
import Col from "../Col";
import Modal from "../Modal";
import EditClip from "../EditClip";
import logo from "./drop-area.svg";
import clsx from "clsx";
import styles from "./styles.scss";
import { useSelector, useAction } from "@abcnews/tiny-ducks";

import { downloadAll, getImageUrl } from "../../utils";
import {
  clipsSelector,
  currentClipIndexSelector,
  currentClipSelector,
  showPreviewSelector,
  urlSelector
} from "../../selectors";
import {
  addClipAction,
  removeClipAction,
  selectClipAction,
  setUrlAction,
  showPreviewAction
} from "../../actions";

export default props => {
  // State
  const url = useSelector(urlSelector);
  const clips = useSelector(clipsSelector);
  const currentClipIndex = useSelector(currentClipIndexSelector);
  const currentClip = useSelector(currentClipSelector);
  const shouldShowPreview = useSelector(showPreviewSelector);

  // Actions
  const setSelectedClip = useAction(selectClipAction);
  const setUrl = useAction(setUrlAction);
  const dispatchAddClip = useAction(addClipAction);
  const addClip = () => {
    dispatchAddClip();
    setSelectedClip(clips.length);
  };
  const showPreview = useAction(showPreviewAction);
  const removeClip = useAction(removeClipAction);

  return (
    <>
      <div className={styles.header}>
        <Page>
          <Row>
            <Col>
              <img
                src={logo}
                width="40"
                height="40"
                alt="A pixelated illustration showing a dashed square with an arrow pointing at the centre from bottom right corner"
              />
              <p>
                Take clippings from a website by specifying CSS selectors for
                the areas you want to clip.
              </p>
            </Col>
          </Row>

          <Row>
            <Col width={10}>
              <input
                className={styles.urlInput}
                placeholder="https://www.example.com/page-to-clip"
                type="text"
                value={url || ""}
                onChange={({ target: { value } }) => setUrl(value)}
              />
            </Col>
            <Col>
              <button
                onClick={e => {
                  e.preventDefault();
                  downloadAll(url, clips);
                }}
              >
                Save all
              </button>
            </Col>
          </Row>
        </Page>
      </div>
      <div>
        <Page>
          {clips && clips.length > 0 ? (
            <Row>
              <Col width={2}>
                <h2>Clips</h2>
                <ul className={styles.clipList}>
                  {clips.map((d, i) => (
                    <li
                      key={i}
                      className={clsx(
                        styles.clipListItem,
                        i === currentClipIndex && styles.clipIsSelected
                      )}
                      onClick={() => setSelectedClip(i)}
                    >
                      {d.name.length ? d.name : `Clip ${i + 1}`}
                    </li>
                  ))}
                </ul>
                <button onClick={addClip}>Add clip</button>
              </Col>

              <Col width={7}>
                <h2>Clip {currentClipIndex + 1} settings</h2>
                <EditClip />
                {shouldShowPreview && currentClip.selector ? (
                  <>
                    <h2>Clip preview</h2>
                    <img
                      src={getImageUrl(url, currentClip.selector, {
                        width: currentClip.browserWidth
                      })}
                      style={{ maxWidth: "100%" }}
                    />
                  </>
                ) : null}
              </Col>
              <Col width={2}>
                <h2>Actions</h2>
                {currentClip?.selector ? (
                  <button
                    className={styles.actionButton}
                    onClick={() => showPreview(!shouldShowPreview)}
                  >
                    {shouldShowPreview ? "Hide" : "Show"} Clip
                  </button>
                ) : null}
                <button
                  className={styles.actionButton}
                  onClick={() => removeClip(currentClipIndex)}
                >
                  Delete
                </button>
              </Col>
            </Row>
          ) : (
            <Row>
              <p> To get started, create a clip. </p>
              <button onClick={addClip}>Create a clip</button>
            </Row>
          )}
        </Page>
      </div>
    </>
  );
};
