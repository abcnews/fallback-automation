import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { ThemeProvider } from "@hackclub/design-system";
import {
  StateProvider,
  Reducer,
  makeReducer,
  consoleLoggerMiddleware,
  makeStorageMiddleware
} from "./state";
import { main } from "./reducers";
import { getInitialState, saveState } from "./utils";

const PROJECT_NAME = "fallback-automation";
const root = document.querySelector(`[data-${PROJECT_NAME}-root]`);

const reducer = makeReducer(main);
reducer.use(consoleLoggerMiddleware);
reducer.use(makeStorageMiddleware(saveState));

function init() {
  render(
    <StateProvider initialState={getInitialState()} reducer={reducer}>
      <ThemeProvider>
        <App projectName={PROJECT_NAME} />
      </ThemeProvider>
    </StateProvider>,
    root
  );
}

init();

if (module.hot) {
  module.hot.accept("./components/App", () => {
    try {
      init();
    } catch (err) {
      import("./components/ErrorBox").then(exports => {
        const ErrorBox = exports.default;
        render(<ErrorBox error={err} />, root);
      });
    }
  });
}

if (process.env.NODE_ENV === "development") {
  console.debug(`[${PROJECT_NAME}] public path: ${__webpack_public_path__}`);
}
