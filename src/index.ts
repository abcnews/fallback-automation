import App from "./components/App.svelte";
// import { saveState } from "./utils";

const PROJECT_NAME = "fallback-automation";
const ROOT_SELECTOR = `[data-${PROJECT_NAME}-root]`;

function init() {
  new App({
    target: document.querySelector(ROOT_SELECTOR)
  });
}

init();
