import { apiEndpoint } from "./constants";
import { encode, decode } from "@abcnews/base-36-props";
import { main } from "./reducers";
export const getInitialState = () => {
  try {
    return main(
      decode(new URL(window.location.href).searchParams.get("state")),
      {}
    );
  } catch (e) {
    return main(undefined, {});
  }
};

export const getImageUrl = (target, selector, options = {}) => {
  const url = new URL(window.location.origin);
  url.pathname = apiEndpoint;
  url.searchParams.append("url", target);
  url.searchParams.append("selector", selector);
  ["width"].forEach(option => {
    if (options.width) {
      url.searchParams.append("width", options.width);
    }
  });
  return url.toString();
};

export const downloadAll = (url, selectors) => {
  const link = document.createElement("a");
  link.style.display = "none";
  document.body.appendChild(link);
  selectors
    .map(s => [getImageUrl(url, s.selector), s.name])
    .forEach(([url, name], i) => {
      link.setAttribute("href", url);
      link.setAttribute("download", `${name}.png`);
      link.click();
    });
  document.body.removeChild(link);
};

export const saveState = ({ url, selectors }) => {
  const filteredState = {
    url,
    selectors: selectors.map(({ name, selector, browserWidth }) => ({
      name,
      selector,
      browserWidth
    }))
  };

  history.replaceState(null, null, `?state=${encode(filteredState)}`);
};
