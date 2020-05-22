import React, { createContext, useContext, useReducer } from "react";
const StateContext = createContext();
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);

export const makeReducer = (reducer = state => state) => {
  let go = reducer;

  const start = (state, action) => go(state, action);

  start.use = fn => {
    const next = go;
    go = (state, action) => fn(state, action, next);
  };

  return start;
};

export const consoleLoggerMiddleware = (state, action, next) => {
  console.group("Dispatch");
  console.log("state", state);
  console.log("action", action);
  const nextState = next(state, action);
  console.log("nextState", nextState);
  console.groupEnd("Dispatch");
  return nextState;
};

export const makeStorageMiddleware = saveState => (state, action, next) => {
  const nextState = next(state, action);
  saveState(nextState);
  return nextState;
};
