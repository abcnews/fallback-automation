import { selectClipAction } from "./actions";

// Regular selectors
export const clipsSelector = state => state.clips;
export const clipSelector = (state, index) =>
  typeof index === "undefined" ? undefined : state.clips[index];
export const urlSelector = state => state.url;
export const showPreviewSelector = state => state.showPreview;
export const currentClipIndexSelector = state => state.currentClipIndex;
export const currentClipSelector = state =>
  clipSelector(state, currentClipIndexSelector(state));

// Reactors
export const currentClipReactor = ({ clips, currentClipIndex }) => {
  if (clips?.length) {
    if (
      typeof currentClipIndex !== "undefined" &&
      currentClipIndex >= clips.length
    ) {
      return selectClipAction(currentClipIndex - 1);
    }

    if (typeof currentClipIndex === "undefined") {
      return selectClipAction(0);
    }
  }

  if (!clips?.length && typeof currentClipIndex !== "undefined") {
    return selectClipAction();
  }

  return undefined;
};
