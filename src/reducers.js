import {
  ADD_SELECTOR,
  REMOVE_SELECTOR,
  SET_SELECTOR_NAME,
  SET_SELECTOR_SELECTOR,
  SET_SELECTOR_SHOW_PREVIEW,
  SET_SELECTOR_BROWSER_WIDTH
} from "./actions";

const urlReducer = (state, action) => {
  switch (action.type) {
    case "setUrl":
      return action.url;
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

const selectorReducer = (state = { name: "", showPreview: false }, action) => {
  switch (action.type) {
    case SET_SELECTOR_NAME:
      return { ...state, name: action.name };
    case SET_SELECTOR_SELECTOR:
      return { ...state, selector: action.selector };
    case SET_SELECTOR_SHOW_PREVIEW:
      return { ...state, showPreview: action.showPreview };
    case SET_SELECTOR_BROWSER_WIDTH:
      return { ...state, browserWidth: action.browserWidth };
    default:
      return state;
  }
};

const selectorsReducer = (state = [], action) => {
  // Add/Remove actions
  switch (action.type) {
    case ADD_SELECTOR:
      return [...state, selectorReducer(undefined, action)];
    case REMOVE_SELECTOR:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
  }

  // Change actions
  let changed = false;
  const newState = state.map((item, index) => {
    if (index !== action.index) return item;
    const newItem = selectorReducer(item, action);
    if (newItem !== item) {
      changed = true;
    }
    return newItem;
  });
  return changed ? newState : state;
};

export const main = (state = {}, action) => ({
  url: urlReducer(state.url, action),
  selectors: selectorsReducer(state.selectors, action)
});
