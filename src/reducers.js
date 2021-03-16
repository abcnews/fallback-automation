import {
  ADD_CLIP,
  REMOVE_CLIP,
  SET_CLIP_NAME,
  SET_CLIP_SELECTOR,
  SET_CLIP_BROWSER_WIDTH,
  SET_SELECTED_CLIP,
  SET_URL,
  SHOW_PREVIEW
} from "./actions";

const urlReducer = (state, action) => {
  switch (action.type) {
    case SET_URL:
      return action.url;
    default:
      return state;
  }
};

const showPreviewReducer = (state = false, action) => {
  switch (action.type) {
    case SHOW_PREVIEW:
      return action.show;
    default:
      return state;
  }
};

const currentClipIndexReducer = (state = undefined, action) => {
  switch (action.type) {
    case SET_SELECTED_CLIP:
      return action.index;
    default:
      return state;
  }
};

// const selectorsReducer = (state, action) => {
//   return {
//     ...state,
//     [action.id]: selectorReducer(state[action.id], action)
//   };
// };

const clipReducer = (state = { name: "" }, action) => {
  switch (action.type) {
    case SET_CLIP_NAME:
      return { ...state, name: action.name };
    case SET_CLIP_SELECTOR:
      return { ...state, selector: action.selector };
    case SET_CLIP_BROWSER_WIDTH:
      return { ...state, browserWidth: action.browserWidth };
    default:
      return state;
  }
};

const clipsReducer = (state = [], action) => {
  // Add/Remove actions
  switch (action.type) {
    case ADD_CLIP:
      return [...state, clipReducer(undefined, action)];
    case REMOVE_CLIP:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
  }

  // Change actions
  let changed = false;
  const newState = state.map((item, index) => {
    if (index !== action.index) return item;
    const newItem = clipReducer(item, action);
    if (newItem !== item) {
      changed = true;
    }
    return newItem;
  });
  return changed ? newState : state;
};

export const main = (state = {}, action) => ({
  url: urlReducer(state.url, action),
  clips: clipsReducer(state.clips, action),
  showPreview: showPreviewReducer(state.showPreview, action),
  currentClipIndex: currentClipIndexReducer(state.currentClipIndex, action)
});
