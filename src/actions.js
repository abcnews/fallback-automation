export const ADD_CLIP = "ADD_CLIP";
export const addClipAction = () => ({ type: ADD_CLIP });

export const REMOVE_CLIP = "REMOVE_CLIP";
export const removeClipAction = index => ({ type: REMOVE_CLIP, index });

export const SET_CLIP_NAME = "SET_CLIP_NAME";
export const setClipNameAction = (name, index) => ({
  type: SET_CLIP_NAME,
  name,
  index
});

export const SET_CLIP_SELECTOR = "SET_CLIP_SELECTOR";
export const setClipSelectorAction = (selector, index) => ({
  type: SET_CLIP_SELECTOR,
  selector,
  index
});

export const SET_CLIP_BROWSER_WIDTH = "SET_CLIP_BROWSER_WIDTH";
export const setClipBrowserWidthAction = (browserWidth, index) => ({
  type: SET_CLIP_BROWSER_WIDTH,
  browserWidth,
  index
});

export const SHOW_PREVIEW = "SHOW_PREVIEW";
export const showPreviewAction = show => ({ type: SHOW_PREVIEW, show });

export const SET_SELECTED_CLIP = "SET_SELECTED_CLIP";
export const selectClipAction = index => ({ type: SET_SELECTED_CLIP, index });

export const SET_URL = "SET_URL";
export const setUrlAction = url => ({ type: SET_URL, url });
